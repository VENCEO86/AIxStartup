# AIxStartup - API Documentation

## 1. API 개요

### 1.1 기본 정보
- **Base URL**: `http://localhost:4000` (개발) / `https://api.aixstartup.com` (프로덕션)
- **API 버전**: v1
- **인증 방식**: JWT Bearer Token
- **응답 형식**: JSON

### 1.2 공통 응답 형식

#### 성공 응답
```json
{
  "success": true,
  "data": {
    // 응답 데이터
  },
  "message": "Operation completed successfully"
}
```

#### 에러 응답
```json
{
  "success": false,
  "error": "Error message",
  "details": {
    // 상세 에러 정보 (선택사항)
  }
}
```

### 1.3 HTTP 상태 코드
- `200` - 성공
- `201` - 생성됨
- `400` - 잘못된 요청
- `401` - 인증 실패
- `403` - 권한 없음
- `404` - 리소스 없음
- `500` - 서버 오류

## 2. 인증 API

### 2.1 로그인

#### POST /api/auth/login
사용자 로그인

**요청 본문:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "isAdmin": false
    },
    "tokens": {
      "accessToken": "jwt_token_here",
      "refreshToken": "refresh_token_here"
    }
  },
  "message": "Login successful"
}
```

### 2.2 회원가입

#### POST /api/auth/register
새 사용자 등록

**요청 본문:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User",
  "confirmPassword": "password123"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "newuser@example.com",
      "name": "New User",
      "isAdmin": false
    }
  },
  "message": "User registered successfully"
}
```

### 2.3 토큰 갱신

#### POST /api/auth/refresh
액세스 토큰 갱신

**요청 헤더:**
```
Authorization: Bearer <refresh_token>
```

**응답:**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_token_here"
  },
  "message": "Token refreshed successfully"
}
```

### 2.4 로그아웃

#### POST /api/auth/logout
사용자 로그아웃

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**응답:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## 3. 사용자 API

### 3.1 사용자 프로필 조회

#### GET /api/users/profile
현재 로그인한 사용자의 프로필 조회

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "isAdmin": false,
    "createdAt": "2025-08-28T10:00:00Z",
    "updatedAt": "2025-08-28T10:00:00Z"
  }
}
```

### 3.2 사용자 프로필 수정

#### PUT /api/users/profile
사용자 프로필 정보 수정

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**요청 본문:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "updated@example.com",
    "name": "Updated Name",
    "isAdmin": false,
    "updatedAt": "2025-08-28T10:30:00Z"
  },
  "message": "Profile updated successfully"
}
```

## 4. 대시보드 API

### 4.1 대시보드 통계

#### GET /api/dashboard/stats
대시보드 메트릭 데이터 조회

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**응답:**
```json
{
  "success": true,
  "data": {
    "revenue": {
      "total": 1250000,
      "change": 15.3,
      "trend": "up"
    },
    "expense": {
      "total": 850000,
      "change": -8.2,
      "trend": "down"
    },
    "profit": {
      "total": 400000,
      "change": 23.1,
      "trend": "up"
    },
    "partners": {
      "total": 24,
      "change": 2,
      "trend": "up"
    }
  }
}
```

### 4.2 월별 트렌드

#### GET /api/dashboard/trends
월별 매출/지출 트렌드 조회

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**쿼리 파라미터:**
- `year`: 연도 (기본값: 현재 연도)
- `months`: 조회할 월 수 (기본값: 6)

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "month": "2025-01",
      "revenue": 100000,
      "expense": 80000,
      "profit": 20000
    },
    {
      "month": "2025-02",
      "revenue": 120000,
      "expense": 90000,
      "profit": 30000
    }
  ]
}
```

### 4.3 최근 활동

#### GET /api/dashboard/activities
최근 활동 내역 조회

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**쿼리 파라미터:**
- `limit`: 조회할 활동 수 (기본값: 10)

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "transaction_completed",
      "title": "새 거래 완료",
      "description": "Alpha Co와의 계약이 체결되었습니다",
      "timestamp": "2025-08-28T08:00:00Z",
      "metadata": {
        "amount": 500000,
        "partnerName": "Alpha Co"
      }
    }
  ]
}
```

## 5. 파트너 API

### 5.1 파트너 목록 조회

#### GET /api/partners
파트너 목록 조회

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**쿼리 파라미터:**
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 20)
- `search`: 검색어
- `status`: 상태 필터 (active, inactive, all)

**응답:**
```json
{
  "success": true,
  "data": {
    "partners": [
      {
        "id": "uuid",
        "name": "Alpha Co",
        "email": "contact@alpha.com",
        "phone": "+82-2-1234-5678",
        "address": "서울시 강남구",
        "status": "active",
        "createdAt": "2025-08-28T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 24,
      "totalPages": 2
    }
  }
}
```

### 5.2 파트너 상세 조회

#### GET /api/partners/:id
특정 파트너 상세 정보 조회

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Alpha Co",
    "email": "contact@alpha.com",
    "phone": "+82-2-1234-5678",
    "address": "서울시 강남구",
    "status": "active",
    "transactions": [
      {
        "id": "uuid",
        "amount": 500000,
        "type": "revenue",
        "status": "completed",
        "createdAt": "2025-08-28T10:00:00Z"
      }
    ],
    "createdAt": "2025-08-28T10:00:00Z",
    "updatedAt": "2025-08-28T10:00:00Z"
  }
}
```

### 5.3 파트너 생성

#### POST /api/partners
새 파트너 등록

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**요청 본문:**
```json
{
  "name": "New Partner Co",
  "email": "contact@newpartner.com",
  "phone": "+82-2-9876-5432",
  "address": "서울시 서초구"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "New Partner Co",
    "email": "contact@newpartner.com",
    "phone": "+82-2-9876-5432",
    "address": "서울시 서초구",
    "status": "active",
    "createdAt": "2025-08-28T10:00:00Z"
  },
  "message": "Partner created successfully"
}
```

### 5.4 파트너 수정

#### PUT /api/partners/:id
파트너 정보 수정

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**요청 본문:**
```json
{
  "name": "Updated Partner Co",
  "email": "updated@partner.com",
  "phone": "+82-2-1111-2222",
  "address": "서울시 마포구"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Updated Partner Co",
    "email": "updated@partner.com",
    "phone": "+82-2-1111-2222",
    "address": "서울시 마포구",
    "status": "active",
    "updatedAt": "2025-08-28T10:30:00Z"
  },
  "message": "Partner updated successfully"
}
```

### 5.5 파트너 삭제

#### DELETE /api/partners/:id
파트너 삭제

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**응답:**
```json
{
  "success": true,
  "message": "Partner deleted successfully"
}
```

## 6. 거래 내역 API

### 6.1 거래 목록 조회

#### GET /api/transactions
거래 내역 목록 조회

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**쿼리 파라미터:**
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 20)
- `type`: 거래 유형 (revenue, expense, all)
- `status`: 상태 필터 (pending, completed, cancelled)
- `startDate`: 시작 날짜 (YYYY-MM-DD)
- `endDate`: 종료 날짜 (YYYY-MM-DD)
- `partnerId`: 파트너 ID

**응답:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid",
        "partnerId": "uuid",
        "partnerName": "Alpha Co",
        "amount": 500000,
        "type": "revenue",
        "status": "completed",
        "description": "서비스 계약",
        "createdAt": "2025-08-28T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "totalPages": 8
    }
  }
}
```

### 6.2 거래 상세 조회

#### GET /api/transactions/:id
특정 거래 상세 정보 조회

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "partnerId": "uuid",
    "partnerName": "Alpha Co",
    "amount": 500000,
    "type": "revenue",
    "status": "completed",
    "description": "서비스 계약",
    "metadata": {
      "contractNumber": "CTR-2025-001",
      "serviceType": "웹 개발",
      "duration": "3개월"
    },
    "createdAt": "2025-08-28T10:00:00Z",
    "updatedAt": "2025-08-28T10:00:00Z"
  }
}
```

### 6.3 거래 생성

#### POST /api/transactions
새 거래 등록

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**요청 본문:**
```json
{
  "partnerId": "uuid",
  "amount": 300000,
  "type": "revenue",
  "description": "새로운 서비스 계약",
  "metadata": {
    "contractNumber": "CTR-2025-002",
    "serviceType": "앱 개발"
  }
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "partnerId": "uuid",
    "partnerName": "Beta Ltd",
    "amount": 300000,
    "type": "revenue",
    "status": "pending",
    "description": "새로운 서비스 계약",
    "createdAt": "2025-08-28T10:00:00Z"
  },
  "message": "Transaction created successfully"
}
```

### 6.4 거래 상태 변경

#### PATCH /api/transactions/:id/status
거래 상태 변경

**요청 헤더:**
```
Authorization: Bearer <access_token>
```

**요청 본문:**
```json
{
  "status": "completed"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "completed",
    "updatedAt": "2025-08-28T10:30:00Z"
  },
  "message": "Transaction status updated successfully"
}
```

## 7. 시스템 API

### 7.1 헬스 체크

#### GET /health
서버 상태 확인

**응답:**
```json
{
  "ok": true,
  "ts": 1756347775155,
  "version": "1.0.0",
  "environment": "development"
}
```

### 7.2 API 테스트

#### GET /api/test
API 연결 테스트

**응답:**
```json
{
  "message": "API OK",
  "at": "2025-08-28T02:23:47.203Z"
}
```

## 8. 에러 코드

### 8.1 공통 에러 코드
- `AUTH_001` - 인증 토큰이 없습니다
- `AUTH_002` - 토큰이 만료되었습니다
- `AUTH_003` - 잘못된 토큰입니다
- `AUTH_004` - 권한이 없습니다
- `VAL_001` - 필수 필드가 누락되었습니다
- `VAL_002` - 잘못된 이메일 형식입니다
- `VAL_003` - 비밀번호가 너무 짧습니다
- `DB_001` - 데이터베이스 연결 오류
- `DB_002` - 데이터를 찾을 수 없습니다
- `SYS_001` - 내부 서버 오류

### 8.2 에러 응답 예시
```json
{
  "success": false,
  "error": "Validation failed",
  "code": "VAL_001",
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

## 9. 인증 및 권한

### 9.1 JWT 토큰 사용법

#### 요청 헤더에 토큰 포함
```
Authorization: Bearer <your_jwt_token>
```

#### 토큰 구조
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "role": "admin",
  "iat": 1756347775,
  "exp": 1756434175
}
```

### 9.2 권한 레벨
- **admin**: 모든 기능 접근 가능
- **user**: 기본 기능만 접근 가능

## 10. 요청 제한 (Rate Limiting)

### 10.1 제한 정책
- **일반 API**: 1000 requests/hour
- **인증 API**: 100 requests/hour
- **파일 업로드**: 50 requests/hour

### 10.2 제한 초과 응답
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "retryAfter": 3600
}
```

---

**문서 버전**: 1.0  
**작성일**: 2025-08-28  
**작성자**: AIxStartup 개발팀  
**최종 업데이트**: 2025-08-28


