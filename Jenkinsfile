pipeline {
    agent { node { label 'built-in' } }

    triggers {
        pollSCM('H/15 * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/Stradivirus/team_exchange',
                    credentialsId: 'git'
            }
        }

        stage('Detect Changes') {
            steps {
                script {
                    def changedFiles = sh(
                        script: 'git diff --name-only HEAD~1 HEAD || echo "all"',
                        returnStdout: true
                    ).trim()

                    echo "Changed files: ${changedFiles}"

                    env.FRONTEND_CHANGED = changedFiles.contains('frontend/') ? 'true' : 'false'
                    // backend 변경 감지 로직 활성화
                    env.BACKEND_CHANGED = changedFiles.contains('backend/') ? 'true' : 'false'
                    
                    env.FULL_REBUILD = changedFiles.contains('docker-compose') ? 'true' : 'false'

                    echo "Frontend changed: ${env.FRONTEND_CHANGED}"
                    echo "Backend changed: ${env.BACKEND_CHANGED}"
                    echo "Full rebuild needed: ${env.FULL_REBUILD}"
                }
            }
        }

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
                            docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml build frontend
                            # --no-deps 옵션을 제거하여 의존성 있는 서비스도 함께 실행하도록 수정
                            docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml up -d frontend
                        '''
                    }
                }

                // backend 배포 스테이지 활성화
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
                            docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml build backend
                            # --no-deps 옵션을 제거하여 일관성 유지
                            docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml up -d backend
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Deployment process finished. Current status:'
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

