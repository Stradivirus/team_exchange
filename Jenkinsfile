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

                    // 변경 감지 경로를 새로운 폴더 구조에 맞게 수정
                    env.FRONTEND_CHANGED = changedFiles.contains('frontend/') || changedFiles.contains('docker/frontend/') ? 'true' : 'false'
                    env.BACKEND_CHANGED = changedFiles.contains('backend/') || changedFiles.contains('docker/backend/') ? 'true' : 'false'
                    
                    // docker-compose 파일 변경 감지 경로 수정
                    env.FULL_REBUILD = changedFiles.contains('docker/docker-compose') ? 'true' : 'false'

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
                        // docker-compose 파일 경로 수정
                        sh '''
                            docker compose -p app-staging -f docker/docker-compose.yml -f docker/docker-compose.staging.yml build frontend
                            docker compose -p app-staging -f docker/docker-compose.yml -f docker/docker-compose.staging.yml up -d frontend
                        '''
                    }
                }

                stage('Deploy Backend') {
                    when {
                        anyOf {
                            environment name: 'BACKEND_CHANGED', value: 'true'
                            environment name: 'FULL_REBUILD', value: 'true'
                        }
                    }
                    steps {
                        echo 'Rebuilding and Deploying Backend...'
                        // docker-compose 파일 경로 수정
                        sh '''
                            docker compose -p app-staging -f docker/docker-compose.yml -f docker/docker-compose.staging.yml build backend
                            docker compose -p app-staging -f docker/docker-compose.yml -f docker/docker-compose.staging.yml up -d backend
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Deployment process finished. Current status:'
            // docker-compose 파일 경로 수정
            sh 'docker compose -p app-staging -f docker/docker-compose.yml -f docker/docker-compose.staging.yml ps'
        }
        failure {
            echo 'Deployment failed. Showing last 200 lines of logs.'
            // docker-compose 파일 경로 수정
            sh 'docker compose -p app-staging -f docker/docker-compose.yml -f docker/docker-compose.staging.yml logs --no-color | tail -n 200 || true'
        }
        success {
            echo 'Deployment successful.'
        }
    }
}
