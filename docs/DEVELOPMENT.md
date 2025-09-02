# AIxStartup - Development Documentation

## 1. 프로젝트 구조

```
AIxStartup/
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/      # 재사용 가능한 컴포넌트
│   │   │   ├── ui/         # UI 기본 컴포넌트
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── Header.tsx
│   │   │   └── DashboardCards.tsx
│   │   ├── pages/          # 페이지 컴포넌트
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Partners.tsx
│   │   │   ├── Transactions.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── utils/          # 유틸리티 함수
│   │   ├── types/          # TypeScript 타입 정의
│   │   ├── App.tsx         # 메인 앱 컴포넌트
│   │   └── main.tsx        # 앱 진입점
│   ├── public/             # 정적 파일
│   ├── package.json        # 프론트엔드 의존성
│   └── vite.config.ts      # Vite 설정
├── backend/                # Node.js 백엔드
│   ├── src/
│   │   ├── controllers/    # 컨트롤러
│   │   ├── models/         # Sequelize 모델
│   │   ├── routes/         # API 라우트
│   │   ├── middleware/     # 미들웨어
│   │   ├── services/       # 비즈니스 로직
│   │   ├── config/         # 설정 파일
│   │   ├── types/          # TypeScript 타입
│   │   └── server.ts       # 서버 진입점
│   ├── package.json        # 백엔드 의존성
│   └── tsconfig.json       # TypeScript 설정
├── docs/                   # 문서
│   ├── PRD.md             # 제품 요구사항 문서
│   ├── DEVELOPMENT.md     # 개발 문서
│   └── API.md             # API 문서
├── scripts/               # 배포 및 유틸리티 스크립트
├── e2e/                  # E2E 테스트
├── package.json          # 루트 의존성
└── README.md             # 프로젝트 개요
```

## 2. 기술 스택

### 2.1 프론트엔드
```json
{
  "react": "^18.2.0",
  "typescript": "^5.3.2",
  "tailwindcss": "^3.3.0",
  "react-router-dom": "^6.8.0",
  "react-query": "^3.39.0",
  "lucide-react": "^0.263.1",
  "vite": "^5.4.19",
  "@vitejs/plugin-react": "^4.2.0"
}
```

### 2.2 백엔드
```json
{
  "express": "^4.21.2",
  "typescript": "^5.9.2",
  "sequelize": "^6.35.0",
  "pg": "^8.11.3",
  "redis": "^4.6.10",
  "jsonwebtoken": "^9.0.2",
  "passport": "^0.7.0",
  "bcryptjs": "^2.4.3"
}
```

## 3. 개발 환경 설정

### 3.1 필수 요구사항
- **Node.js**: 18.0.0 이상
- **npm**: 9.0.0 이상
- **Git**: 2.30.0 이상

### 3.2 환경 변수 설정

#### 프론트엔드 (.env)
```env
VITE_API_URL=http://localhost:4000
VITE_APP_TITLE=AIxStartup
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_KAKAO_CLIENT_ID=your_kakao_client_id
VITE_NAVER_CLIENT_ID=your_naver_client_id
```

#### 백엔드 (.env)
```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://username:password@localhost:5432/aixstartup
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret
```

## 4. 개발 가이드라인

### 4.1 코드 스타일

#### TypeScript
```typescript
// 인터페이스 정의
interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
}

// 함수 타입 정의
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// 컴포넌트 Props
interface ComponentProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

#### React 컴포넌트
```typescript
// 함수형 컴포넌트
const MyComponent: React.FC<ComponentProps> = ({ 
  children, 
  className = '', 
  onClick 
}) => {
  const [state, setState] = useState<StateType>(initialState);

  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <div className={`base-class ${className}`} onClick={handleClick}>
      {children}
    </div>
  );
};

export default MyComponent;
```

### 4.2 네이밍 컨벤션

#### 파일명
- **컴포넌트**: PascalCase (예: `Dashboard.tsx`)
- **유틸리티**: camelCase (예: `apiUtils.ts`)
- **상수**: UPPER_SNAKE_CASE (예: `API_ENDPOINTS.ts`)

#### 변수명
- **일반 변수**: camelCase (예: `userName`)
- **상수**: UPPER_SNAKE_CASE (예: `API_BASE_URL`)
- **인터페이스**: PascalCase (예: `UserProfile`)

### 4.3 폴더 구조 규칙

```
components/
├── ui/           # 기본 UI 컴포넌트
├── forms/        # 폼 관련 컴포넌트
├── layout/       # 레이아웃 컴포넌트
└── features/     # 기능별 컴포넌트

pages/
├── auth/         # 인증 관련 페이지
├── dashboard/    # 대시보드 관련 페이지
└── admin/        # 관리자 페이지
```

## 5. API 설계

### 5.1 RESTful API 규칙

#### 엔드포인트 구조
```
GET    /api/v1/users          # 사용자 목록 조회
GET    /api/v1/users/:id      # 특정 사용자 조회
POST   /api/v1/users          # 사용자 생성
PUT    /api/v1/users/:id      # 사용자 수정
DELETE /api/v1/users/:id      # 사용자 삭제
```

#### 응답 형식
```typescript
// 성공 응답
{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User created successfully"
}

// 에러 응답
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format"
  }
}
```

### 5.2 인증 및 권한

#### JWT 토큰 구조
```typescript
interface JWTPayload {
  userId: string;
  email: string;
  role: 'admin' | 'user';
  iat: number;
  exp: number;
}
```

#### 권한 미들웨어
```typescript
// 관리자 권한 확인
const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'Admin access required'
    });
  }
  next();
};
```

## 6. 데이터베이스 설계

### 6.1 ERD (Entity Relationship Diagram)

```sql
-- 사용자 테이블
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 파트너 테이블
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 거래 테이블
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id),
  amount DECIMAL(15,2) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'revenue' | 'expense'
  status VARCHAR(50) DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6.2 Sequelize 모델

```typescript
// User 모델
@Table({
  tableName: 'users',
  timestamps: true
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.BOOLEAN)
  isAdmin!: boolean;
}
```

## 7. 테스트 전략

### 7.1 테스트 피라미드

```
    E2E Tests (Playwright)
        /     \
       /       \
   Integration Tests
      /     \
     /       \
  Unit Tests (Jest)
```

### 7.2 테스트 작성 가이드

#### 단위 테스트
```typescript
// utils/currency.test.ts
describe('formatCurrency', () => {
  it('should format Korean Won correctly', () => {
    const result = formatCurrency(1000000);
    expect(result).toBe('₩1,000,000');
  });

  it('should handle zero amount', () => {
    const result = formatCurrency(0);
    expect(result).toBe('₩0');
  });
});
```

#### 컴포넌트 테스트
```typescript
// components/DashboardCards.test.tsx
import { render, screen } from '@testing-library/react';
import DashboardCards from './DashboardCards';

describe('DashboardCards', () => {
  it('should render all metric cards', () => {
    render(<DashboardCards />);
    
    expect(screen.getByText('총 매출')).toBeInTheDocument();
    expect(screen.getByText('총 지출')).toBeInTheDocument();
    expect(screen.getByText('순이익')).toBeInTheDocument();
    expect(screen.getByText('거래처 수')).toBeInTheDocument();
  });
});
```

## 8. 배포 프로세스

### 8.1 CI/CD 파이프라인

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          script: |
            cd /var/www/aixstartup
            git pull origin main
            npm ci
            npm run build
            pm2 restart aixstartup
```

### 8.2 환경별 설정

#### 개발 환경
```bash
# 로컬 개발 서버 실행
npm run dev:frontend  # http://localhost:3001
npm run dev:backend   # http://localhost:4000
```

#### 스테이징 환경
```bash
# 스테이징 배포
npm run deploy:staging
```

#### 프로덕션 환경
```bash
# 프로덕션 배포
npm run deploy:production
```

## 9. 모니터링 및 로깅

### 9.1 로깅 전략

```typescript
// utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### 9.2 성능 모니터링

```typescript
// middleware/performance.ts
import { Request, Response, NextFunction } from 'express';

export const performanceMonitor = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('API Performance', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
  });
  
  next();
};
```

## 10. 보안 가이드라인

### 10.1 입력 검증

```typescript
// middleware/validation.ts
import { body, validationResult } from 'express-validator';

export const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('name').trim().isLength({ min: 2, max: 50 }),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];
```

### 10.2 CORS 설정

```typescript
// config/cors.ts
import cors from 'cors';

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

export const corsMiddleware = cors(corsOptions);
```

## 11. 트러블슈팅

### 11.1 일반적인 문제 해결

#### 포트 충돌
```bash
# 포트 사용 중인 프로세스 확인
netstat -ano | findstr :3001
netstat -ano | findstr :4000

# 프로세스 종료
taskkill /F /PID <process_id>
```

#### 의존성 문제
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript 컴파일 에러
```bash
# 타입 체크
npm run type-check

# 빌드 에러 확인
npm run build
```

### 11.2 디버깅 가이드

#### 프론트엔드 디버깅
```typescript
// 개발자 도구에서 디버깅
console.log('Debug info:', { data, state });
debugger; // 브레이크포인트
```

#### 백엔드 디버깅
```typescript
// 로깅을 통한 디버깅
logger.debug('Request data:', req.body);
logger.error('Error occurred:', error);
```

---

**문서 버전**: 1.0  
**작성일**: 2025-08-28  
**작성자**: AIxStartup 개발팀  
**최종 업데이트**: 2025-08-28


