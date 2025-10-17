# 📘 Team_Exchange_Rate

**MBC컴_팀프로젝트 : RPA를 활용한 환율변동 추이 분석 시스템**  
Oracle Cloud 환경에서 Frontend–Backend–CI/CD 파이프라인을 통합하여 환율 및 주요 원자재 데이터를 자동 수집·분석·시각화하는 시스템입니다.

---

## 📌 프로젝트 개요

본 프로젝트는 환율과 주요 원자재의 변동 데이터를 통합 관리하고, RPA를 통해 자동 수집된 데이터가 저장된 DB와의 통신을 통해 시각화된 대시보드를 통해 분석 결과를 제공하는 것을 목표로 합니다.

---

## 🧭 주요 목표

- 환율 및 원자재 데이터의 **자동 수집 및 정제**
- 주요 지표의 **시각화 및 추이 분석**
- **Oracle Cloud + Jenkins** 기반 **CI/CD 자동 배포**
- 모던하고 직관적인 **웹 대시보드 구현**

---

## 🏗️ 시스템 구성

| 구성 요소 | 설명 |
|------------|------|
| **Frontend** | React (Vite + TypeScript + SCSS) 기반 UI. 최신 환율·원자재 데이터를 시각화하여 사용자에게 제공 |
| **Backend** | Spring Boot 기반 API 서버. RPA로 수집된 데이터를 PostgreSQL/MongoDB에 저장 및 제공 |
| **CI/CD** | Jenkins + Docker를 이용하여 자동 빌드 및 Oracle Cloud 배포 파이프라인 구현 |
| **Scheduler** | Cron Job 및 RPA 스크립트를 통해 데이터 자동 업데이트 - 별도 관리|
| **Database** | PostgreSQL (정형데이터), MongoDB (비정형데이터) – 별도 관리 리포지토리 |

---

## 💡 주요 기능

| 기능 | 설명 |
|------|------|
| **📊 대시보드 시각화** | 환율, 원자재 가격, 변동률, 상관관계 등을 직관적으로 표시 |
| **📈 통계 분석 및 인사이트 제공** | 환율과 원자재 가격 간의 상관계수 및 추세 분석 자료 제공 |
| **🔄 자동 배포 (CI/CD)** | Jenkins Pipeline을 이용해 코드 변경 시 자동 빌드 및 클라우드 반영 |
| **⚙️ 실시간 데이터 연동** | Backend–DB–Frontend 간 최신 데이터가 자동으로 반영되도록 구성 |

---

## ⚙️ 기술 스택

| 구분 | 사용 기술 |
|------|------------|
| **Frontend** | Vite, React, TypeScript, SCSS, Axios, Redux Toolkit |
| **Backend** | Java, Spring Boot, Lombok, JPA, Gradle |
| **Database** | PostgreSQL, MongoDB |
| **CI/CD & Infra** | Jenkins, Docker, Oracle Cloud Infrastructure |
| **RPA / 데이터 수집** | Python, Cron |

---

## 🧩 폴더 구조
```
Team_Exchange_Rate/
├── frontend/ # React + Vite 프론트엔드 코드
│ ├── src/
│ ├── public/
│ └── vite.config.ts
│
├── backend/ # Spring Boot 백엔드 코드
│ ├── src/main/java/com/mbccurrency/
│ ├── src/main/resources/
│ └── build.gradle
│
└── README.md
```

---

## 🚀 CI/CD 파이프라인 개요

1. **GitHub 커밋 발생**
2. **Jenkins Webhook 트리거**
3. **Docker 기반 빌드 및 테스트 실행**
4. **Oracle Cloud 자동 배포**
   - Frontend & Backend 컨테이너 실행 후 서비스 자동 재시작

---

## 🎨 화면 설계 방향

- **모던하고 미니멀한 UI/UX**
- **보라색 톤의 프리미엄 컬러 팔레트**
- **데이터 중심의 깔끔한 레이아웃**
- **차트 중심의 시각적 정보 전달 (Chart.js / Recharts 등 활용)**

---

## 📈 향후 개선 방향
- 대시보드 사용자 맞춤형 위젯 기능  
