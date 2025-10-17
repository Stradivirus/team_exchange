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

                    def rebuildFrontend = false
                    def rebuildBackend = false

                    // docker/ 폴더가 변경되면 frontend와 backend 모두 재빌드
                    if (changedFiles.contains('docker/')) {
                        echo "Docker folder changed, triggering full rebuild."
                        rebuildFrontend = true
                        rebuildBackend = true
                    } else {
                        // frontend/ 폴더가 변경되면 frontend만 재빌드
                        if (changedFiles.contains('frontend/')) {
                            echo "Frontend folder changed, triggering frontend rebuild."
                            rebuildFrontend = true
                        }
                        // backend/ 폴더가 변경되면 backend만 재빌드
                        if (changedFiles.contains('backend/')) {
                            echo "Backend folder changed, triggering backend rebuild."
                            rebuildBackend = true
                        }
                    }

                    env.FRONTEND_CHANGED = rebuildFrontend.toString()
                    env.BACKEND_CHANGED = rebuildBackend.toString()

                    echo "Frontend rebuild needed: ${env.FRONTEND_CHANGED}"
                    echo "Backend rebuild needed: ${env.BACKEND_CHANGED}"
                }
            }
        }

        stage('Deploy Services') {
            parallel {
                stage('Deploy Frontend') {
                    when {
                        // FRONTEND_CHANGED가 'true'일 때만 실행
                        environment name: 'FRONTEND_CHANGED', value: 'true'
                    }
                    steps {
                        echo 'Rebuilding and Deploying Frontend...'
                        sh '''
                            docker compose -p app-staging -f docker/docker-compose.yml -f docker/docker-compose.staging.yml build frontend
                            docker compose -p app-staging -f docker/docker-compose.yml -f docker/docker-compose.staging.yml up -d frontend
                        '''
                    }
                }

                stage('Deploy Backend') {
                    when {
                        // BACKEND_CHANGED가 'true'일 때만 실행
                        environment name: 'BACKEND_CHANGED', value: 'true'
                    }
                    steps {
                        echo 'Rebuilding and Deploying Backend...'
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
            sh 'docker compose -p app-staging -f docker/docker-compose.yml -f docker/docker-compose.staging.yml ps'
        }
        failure {
            echo 'Deployment failed. Showing last 200 lines of logs.'
            sh 'docker compose -p app-staging -f docker/docker-compose.yml -f docker/docker-compose.staging.yml logs --no-color | tail -n 200 || true'
        }
        success {
            echo 'Deployment successful.'
        }
    }
}

