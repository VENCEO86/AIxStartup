# AIxStartup - 스타트업 매출계산기 플랫폼

![AIxStartup Logo](https://img.shields.io/badge/AIxStartup-Platform-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0+-336791?style=for-the-badge&logo=postgresql)

## 📋 프로젝트 개요

AIxStartup은 스타트업, 프리랜서, 소규모 기업을 위한 종합적인 매출/지출 관리 플랫폼입니다. 직관적인 대시보드와 강력한 분석 도구를 통해 비즈니스 성과를 실시간으로 추적하고 관리할 수 있습니다.

### 🚀 주요 기능

- **📊 실시간 대시보드**: 매출/지출 현황을 한눈에 확인
- **🤝 파트너 관리**: 거래처 정보를 체계적으로 관리
- **💰 거래 내역**: 모든 거래를 추적하고 분석
- **📈 리포트 생성**: 월별/연간 리포트 자동 생성
- **🔐 보안 인증**: JWT 기반 인증 및 소셜 로그인
- **📱 반응형 디자인**: 모바일, 태블릿, 데스크톱 지원

### 🛠 기술 스택

#### Frontend
- **React 18** - 사용자 인터페이스
- **TypeScript** - 타입 안전성
- **TailwindCSS** - 스타일링
- **Vite** - 빌드 도구
- **React Router** - 라우팅
- **Lucide React** - 아이콘
- **Chart.js** - 데이터 시각화

#### Backend
- **Node.js** - 서버 런타임
- **Express.js** - 웹 프레임워크
- **TypeScript** - 타입 안전성
- **PostgreSQL** - 메인 데이터베이스
- **Redis** - 캐싱 및 세션
- **Sequelize** - ORM
- **JWT** - 인증
- **bcryptjs** - 비밀번호 해싱

#### DevOps
- **Vercel** - 프론트엔드 배포
- **Render** - 백엔드 배포
- **PostgreSQL** - 클라우드 데이터베이스
- **Redis Cloud** - 클라우드 캐싱

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 18.0+
- npm 9.0+
- PostgreSQL 15.0+
- Redis 7.0+

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/aixstartup.git
cd aixstartup
```

### 2. 환경 변수 설정

#### Frontend 설정
```bash
cd frontend
cp env.example .env.local
# .env.local 파일을 편집하여 필요한 값들을 설정
```

#### Backend 설정
```bash
cd backend
cp env.example .env
# .env 파일을 편집하여 필요한 값들을 설정
```

### 3. 의존성 설치

```bash
# 루트 디렉토리에서
npm install

# 또는 개별 설치
cd frontend && npm install
cd backend && npm install
```

### 4. 데이터베이스 설정

```bash
# PostgreSQL 데이터베이스 생성
createdb aixstartup_db

# 마이그레이션 실행
cd backend
npm run migrate:dev
```

### 5. 개발 서버 실행

```bash
# 루트 디렉토리에서 (모든 서비스 동시 실행)
npm run dev

# 또는 개별 실행
# Frontend (포트 3000)
cd frontend && npm run dev

# Backend (포트 5000)
cd backend && npm run dev
```

## 📁 프로젝트 구조

```
aixstartup/
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/      # 재사용 가능한 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── hooks/          # 커스텀 훅
│   │   ├── utils/          # 유틸리티 함수
│   │   └── types/          # TypeScript 타입 정의
│   ├── public/             # 정적 파일
│   └── package.json
├── backend/                 # Node.js 백엔드
│   ├── src/
│   │   ├── controllers/    # 라우트 컨트롤러
│   │   ├── models/         # 데이터베이스 모델
│   │   ├── routes/         # API 라우트
│   │   ├── middleware/     # 미들웨어
│   │   ├── services/       # 비즈니스 로직
│   │   └── utils/          # 유틸리티 함수
│   ├── migrations/         # 데이터베이스 마이그레이션
│   └── package.json
├── shared/                  # 공유 타입 및 유틸리티
├── docs/                    # 문서
├── scripts/                 # 배포 및 유틸리티 스크립트
└── README.md
```

## 🔧 개발 가이드

### 코드 스타일

- **TypeScript**: 엄격한 타입 체크 사용
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅
- **Husky**: Git 훅을 통한 자동 검사

### API 문서

API 문서는 Swagger를 통해 제공됩니다:

- 개발 환경: `http://localhost:5000/api-docs`
- 프로덕션 환경: `https://your-api-domain.com/api-docs`

### 테스트

```bash
# 전체 테스트 실행
npm test

# 프론트엔드 테스트
cd frontend && npm test

# 백엔드 테스트
cd backend && npm test

# 테스트 커버리지
npm run test:coverage
```

## 🚀 배포

### 자동 배포

```bash
# 개발 빌드
./scripts/deploy.sh development

# 프로덕션 배포
./scripts/deploy.sh production
```

### 수동 배포

#### Frontend (Vercel)

1. Vercel CLI 설치
```bash
npm install -g vercel
```

2. 배포
```bash
cd frontend
vercel --prod
```

#### Backend (Render)

1. Render 대시보드에서 새 Web Service 생성
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 자동 배포 활성화

### 환경 변수

#### Frontend (.env.local)
```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_KAKAO_CLIENT_ID=your_kakao_client_id
VITE_NAVER_CLIENT_ID=your_naver_client_id
```

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
DB_URL=postgresql://user:password@host:port/database
REDIS_URL=redis://user:password@host:port
JWT_SECRET=your_super_secret_jwt_key
```

## 🔐 인증 시스템

### 지원하는 로그인 방식

- **이메일/비밀번호**: 전통적인 로그인
- **Google OAuth**: Google 계정으로 로그인
- **Kakao OAuth**: 카카오 계정으로 로그인
- **Naver OAuth**: 네이버 계정으로 로그인

### 보안 기능

- JWT 토큰 기반 인증
- 비밀번호 bcrypt 해싱
- Rate limiting
- CORS 설정
- Helmet.js 보안 헤더

## 📊 데이터베이스 스키마

### 주요 테이블

- **users**: 사용자 정보
- **companies**: 회사 정보
- **partners**: 파트너/거래처 정보
- **transactions**: 거래 내역
- **analytics**: 분석 데이터

### 마이그레이션

```bash
# 마이그레이션 생성
npm run migrate:create -- --name migration_name

# 마이그레이션 실행
npm run migrate:dev

# 마이그레이션 되돌리기
npm run migrate:undo
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 개발 환경 설정

```bash
# 개발 브랜치 생성
git checkout -b feature/your-feature-name

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 테스트 실행
npm test

# 코드 포맷팅
npm run format

# 린트 검사
npm run lint
```

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 지원

- **이메일**: support@aixstartup.com
- **문서**: [docs.aixstartup.com](https://docs.aixstartup.com)
- **이슈**: [GitHub Issues](https://github.com/your-username/aixstartup/issues)

## 🙏 감사의 말

- [React](https://reactjs.org/) - 사용자 인터페이스 라이브러리
- [TailwindCSS](https://tailwindcss.com/) - CSS 프레임워크
- [Vercel](https://vercel.com/) - 프론트엔드 호스팅
- [Render](https://render.com/) - 백엔드 호스팅

---

**AIxStartup** - 스타트업의 성공을 위한 최고의 파트너 🚀
