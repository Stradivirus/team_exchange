pipeline {
  agent any

  stages {
    stage('Build frontend (cache stage)') {
      steps {
        echo '🧱 Building cached frontend build stage...'
        sh '''
          cd frontend
          # 👉 프론트 빌드 스테이지만 먼저 캐시
          docker build --target build -t frontend-build-cache .
        '''
      }
    }

    stage('Build images (full)') {
      steps {
        echo '🛠 Building full Docker images...'
        sh '''
          # compose로 전체 이미지 빌드 (frontend, backend 포함)
          docker compose -f docker-compose.yml build --pull
        '''
      }
    }

    stage('Deploy to STAGING') {
      when { branch 'master' }
      steps {
        echo '🚀 Deploying to STAGING environment...'
        sh '''
          docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml up -d
        '''
      }
    }
  }

  post {
    failure {
      echo '❌ 실패. 로그를 확인하세요.'
      sh '''
        set +e
        docker compose -f docker-compose.yml logs --no-color | tail -n 200 || true
      '''
    }
    success {
      echo '✅ 성공적으로 배포되었습니다!'
    }
  }
}
