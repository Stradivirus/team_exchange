# ---------- Build stage ----------
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /workspace

# ✅ Gradle 캐시 볼륨 지정 (Jenkins에서도 캐시 재사용 가능)
VOLUME ["/root/.gradle"]

# ✅ Gradle wrapper & 설정 파일 복사 (캐시 hit을 위해 소스보다 먼저)
COPY backend/gradlew backend/settings.gradle backend/build.gradle ./
COPY backend/gradle ./gradle

# ✅ CRLF 제거 + 실행 권한
RUN sed -i 's/\r$//' gradlew && chmod +x gradlew

# ✅ 의존성만 먼저 다운로드 (Gradle 캐시에 저장됨)
RUN ./gradlew dependencies --no-daemon || return 0

# ✅ 소스 복사 (이후 변경돼도 위 캐시는 유지)
COPY backend/src ./src

# ✅ 테스트는 스킵하고 빌드만 수행
RUN ./gradlew clean bootJar -x test --no-daemon

# ---------- Runtime ----------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# 빌드 결과만 복사
COPY --from=build /workspace/build/libs/*.jar app.jar

# 프로파일 설정
ENV SPRING_PROFILES_ACTIVE=prod
EXPOSE 8080

# 실행
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]