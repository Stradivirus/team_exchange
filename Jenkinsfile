pipeline {
  // Jenkins 메인 서버(Built-In Node)에서 실행하도록 지정
  agent { label 'master' }

  stages {
    stage('Checkout') {
      steps {
        // 이모지 제거
        echo 'Checking out the master branch...'
        checkout([$class: 'GitSCM', branches: [[name: '*/master']],
          userRemoteConfigs: [[url: 'https://github.com/Stradivirus/team_exchange', credentialsId: 'git']]
        ])
      }
    }

    stage('Build frontend (cache stage)') {
      steps {
        // 이모지 제거
        echo 'Building cached frontend build stage...'
        sh '''
          cd frontend
          # 프론트 빌드 스테이지만 먼저 캐시
          docker build --target build -t frontend-build-cache .
        '''
      }
    }

    stage('Build images (full)') {
      steps {
        // 이모지 제거
        echo 'Building full Docker images...'
        sh '''
          # compose로 전체 이미지 빌드 (frontend, backend 포함)
          docker compose -f docker-compose.yml build --pull
        '''
      }
    }

    stage('Deploy to STAGING') {
      when { branch 'master' }
      steps {
        // 이모지 제거
        echo 'Deploying to STAGING environment...'
        sh '''
          docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml up -d
        '''
      }
    }
  }

  post {
    failure {
      // 이모지 제거
      echo 'Failed. Check the logs.'
      // sh 단계가 컨텍스트 안에서 실행되도록 node 블록으로 감싸기
      node('master') {
        sh '''
          set +e
          docker compose -f docker-compose.yml logs --no-color |
          tail -n 200 || true
        '''
      }
    }
    success {
      // 이모지 제거
      echo 'Successfully deployed!'
    }
  }
}