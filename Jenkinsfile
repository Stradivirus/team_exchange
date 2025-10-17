pipeline {
    // Jenkins 메인 노드(Built-In Node)에서 실행되도록 지정합니다.
    // '노드 관리'에서 Built-In Node의 레이블이 'master'로 설정되어 있는지 확인하세요.
    agent { node { label 'built-in' } }

    // triggers 블록은 주기적으로 Git 변경을 감지(Polling)할 때 사용합니다.
    // GitHub Webhook을 사용하시려면 파이프라인 설정에서
    // "GitHub hook trigger for GITScm polling"을 체크하는 것이 맞습니다.
    triggers {
        pollSCM('H/15 * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                // GitSCM 대신 더 명시적인 git 명령어를 사용합니다.
                git branch: 'master',
                    url: 'https://github.com/Stradivirus/team_exchange',
                    credentialsId: 'git'
            }
        }

        // 이 단계에서 어떤 파일이 변경되었는지 감지하고 환경 변수를 설정합니다.
        stage('Detect Changes') {
            steps {
                script {
                    // 마지막 커밋과 현재 커밋 사이의 변경된 파일 목록을 가져옵니다.
                    def changedFiles = sh(
                        script: 'git diff --name-only HEAD~1 HEAD || echo "all"',
                        returnStdout: true
                    ).trim()

                    echo "Changed files: ${changedFiles}"

                    // 각 서비스 디렉토리의 변경 여부를 확인합니다. (디렉토리 구조에 맞게 수정 필요)
                    env.FRONTEND_CHANGED = changedFiles.contains('frontend/') ? 'true' : 'false'
                    // backend 디렉토리가 있다면 아래 주석을 해제하세요.
                    // env.BACKEND_CHANGED = changedFiles.contains('backend/') ? 'true' : 'false'
                    
                    // docker-compose 파일이 변경되면 전체를 재빌드하도록 설정합니다.
                    env.FULL_REBUILD = changedFiles.contains('docker-compose') ? 'true' : 'false'

                    echo "Frontend changed: ${env.FRONTEND_CHANGED}"
                    // echo "Backend changed: ${env.BACKEND_CHANGED}"
                    echo "Full rebuild needed: ${env.FULL_REBUILD}"
                }
            }
        }

        // 'Deploy Services' 단계에서 변경이 감지된 서비스만 병렬로 배포합니다.
        stage('Deploy Services') {
            parallel {
                stage('Deploy Frontend') {
                    when {
                        anyOf {
                            environment name: 'FRONTEND_CHANGED', value: 'true'
                            environment name: 'FULL_REBUILD', value: 'true'
                        }
                    }
                    steps {
                        echo 'Rebuilding and Deploying Frontend...'
                        sh '''
                            # frontend 서비스만 다시 빌드하고, 의존성 없이 재시작합니다.
                            docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml build frontend
                            docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml up -d --no-deps frontend
                        '''
                    }
                }

                // backend 서비스가 있다면 아래 stage 블록의 주석을 해제하여 사용하세요.
                /*
                stage('Deploy Backend') {
                    when {
                        anyOf {
                            environment name: 'BACKEND_CHANGED', value: 'true'
                            environment name: 'FULL_REBUILD', value: 'true'
                        }
                    }
                    steps {
                        echo 'Rebuilding and Deploying Backend...'
                        sh '''
                            # backend 서비스만 다시 빌드하고, 의존성 없이 재시작합니다.
                            docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml build backend
                            docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml up -d --no-deps backend
                        '''
                    }
                }
                */
            }
        }
    }

    // 파이프라인 실행 후 항상 또는 실패/성공 시에만 실행될 작업을 정의합니다.
    post {
        always {
            echo 'Deployment process finished. Current status:'
            // -p 옵션으로 프로젝트 이름을 지정해야 정확한 컨테이너 목록을 볼 수 있습니다.
            sh 'docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml ps'
        }
        failure {
            echo 'Deployment failed. Showing last 200 lines of logs.'
            sh 'docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml logs --no-color | tail -n 200 || true'
        }
        success {
            echo 'Deployment successful.'
        }
    }
}
