# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# 패키지 먼저 복사 → 캐시 최적화
COPY frontend/package*.json ./
RUN npm ci

# ✅ .env 파일 복사
COPY frontend/.env .env

# 소스 복사 후 빌드
COPY ./frontend .

# ✅ VITE용 환경변수 확인 로그 (디버깅용)
RUN cat .env

# ✅ 빌드 시 VITE가 .env 자동 인식
RUN npm run build

# ---------- Runtime (Nginx) ----------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# ✅ 빌드 결과 복사
COPY --from=build /app/dist ./

# ✅ Nginx 설정 복사 (새로운 경로로 수정)
COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://127.0.0.1/ || exit 1