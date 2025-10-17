pipeline {
  // 👇 Jenkins 메인 서버(Built-In Node)에서 실행하도록 변경
  agent { label 'master' }

  stages {
    stage('Checkout') {
      steps {
        echo '🔄 Checking out the master branch...'
        checkout([$class: 'GitSCM', branches: [[name: '*/master']],
          userRemoteConfigs: [[url: 'https://github.com/Stradivirus/team_exchange', credentialsId: 'git']]
        ])
      }
    }

    stage('Build frontend (cache stage)') {
      steps {
        echo '🧱 Building cached frontend build stage...' [cite: 2]
        sh '''
          cd frontend
          # 👉 프론트 빌드 스테이지만 먼저 캐시
          docker build --target build -t frontend-build-cache . [cite: 2]
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
        echo '🚀 Deploying to STAGING environment...' [cite: 4]
        sh '''
          docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml up -d [cite: 4]
        '''
      }
    }
  }

  post {
    failure {
      echo '❌ 실패. 로그를 확인하세요.' [cite: 5]
      // 👇 sh 단계가 컨텍스트 안에서 실행되도록 node 블록 추가
      node('master') {
        sh '''
          set +e
          docker compose -f docker-compose.yml logs --no-color |
          tail -n 200 || true 
        '''
      }
    }
    success {
      echo '✅ 성공적으로 배포되었습니다!' [cite: 7]
    }
  }
}