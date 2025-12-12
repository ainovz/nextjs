# Next.js 프로젝트 컨텍스트

## 프로젝트 개요
이 프로젝트는 Next.js 16의 App Router를 사용하는 모던 웹 애플리케이션입니다.

## 기술 스택

### 핵심 프레임워크
- **Next.js 16.0.10**: React 기반 풀스택 프레임워크, App Router 사용
- **React 19.2.1**: UI 라이브러리 (Server Components 지원)
- **TypeScript 5**: 정적 타입 체크

### 스타일링
- **Tailwind CSS 4**: 유틸리티 우선 CSS 프레임워크
- **PostCSS**: CSS 전처리기

### 개발 도구
- **ESLint 9**: 코드 품질 및 일관성 검사
- **eslint-config-next**: Next.js 최적화된 ESLint 설정

## 프로젝트 구조

```
nextjs/
├── app/                    # Next.js App Router 디렉토리
│   ├── api/               # API Route Handlers
│   │   ├── hello/         # GET /api/hello
│   │   ├── status/        # GET /api/status
│   │   └── users/         # RESTful user endpoints
│   ├── api-test/          # API 테스트 페이지 (/api-test)
│   ├── favicon.ico        # 파비콘
│   ├── globals.css        # 글로벌 스타일
│   ├── layout.tsx         # 루트 레이아웃 (메타데이터, 폰트 설정)
│   └── page.tsx           # 홈페이지 (/)
├── types/                 # 공유 타입 정의 (최소한만 유지)
│   └── api.ts             # 공통 API 타입 (예: User)
├── public/                # 정적 파일 (이미지, 아이콘)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── eslint.config.mjs      # ESLint 설정
├── next.config.ts         # Next.js 설정
├── postcss.config.mjs     # PostCSS 설정
├── tsconfig.json          # TypeScript 설정
├── package.json           # 의존성 및 스크립트
└── README.md              # 프로젝트 문서
```

## 주요 설정

### TypeScript 설정 (`tsconfig.json`)
- **Strict 모드**: 활성화됨
- **경로 별칭**: `@/*`는 프로젝트 루트를 가리킴
- **JSX**: `react-jsx` (React 17+ 자동 변환)
- **모듈 해석**: `bundler` 방식

### Next.js 설정 (`next.config.ts`)
- 기본 설정으로 시작 (필요에 따라 확장 가능)

### 폰트
- **Geist Sans**: 주 폰트 (`--font-geist-sans`)
- **Geist Mono**: 모노스페이스 폰트 (`--font-geist-mono`)

## 개발 워크플로우

### 스크립트
```bash
pnpm run dev      # 개발 서버 실행 (http://localhost:3000)
pnpm run build    # 프로덕션 빌드
pnpm run start    # 프로덕션 서버 실행
pnpm run lint     # ESLint 검사
```

### 개발 서버
- 기본 포트: 3000
- Hot Module Replacement (HMR) 지원
- Fast Refresh로 즉각적인 피드백

## 아키텍처 패턴

### App Router (Next.js 13+)
- 파일 시스템 기반 라우팅
- 기본적으로 Server Components 사용
- Client Components는 `'use client'` 지시어로 명시

### Server Components vs Client Components
- **Server Components** (기본): 데이터 페칭, 백엔드 리소스 접근
- **Client Components**: 상호작용, 브라우저 API, React hooks

### 라우팅
- `app/page.tsx`: `/` 경로
- `app/about/page.tsx`: `/about` 경로
- `app/layout.tsx`: 공통 레이아웃
- `app/api/hello/route.ts`: `/api/hello` API 엔드포인트

### API 개발
- **Route Handlers**: `app/api/` 디렉토리에 `route.ts` 파일로 작성
- **HTTP 메서드**: GET, POST, PUT, DELETE 함수로 export
- **단순함 유지**: 브라우저 기본 `fetch` 사용, 불필요한 래퍼 제거
- **타입 관리**: 공통 타입만 `types/` 디렉토리, 나머지는 인라인 정의
- **예시**:
  ```typescript
  // API 호출
  const response = await fetch('/api/users');
  const data = await response.json();
  ```

## 스타일링 접근법

### Tailwind CSS
- 유틸리티 클래스 우선
- 다크 모드: `dark:` prefix 사용
- 반응형: `sm:`, `md:`, `lg:` breakpoints

### 글로벌 스타일
- `app/globals.css`: Tailwind 디렉티브 및 커스텀 스타일

## 성능 최적화

### 이미지
- `next/image` 컴포넌트로 자동 최적화
- WebP 자동 변환
- 지연 로딩 기본 지원 (`priority` prop으로 제어)

### 번들
- 자동 코드 분할
- Server Components로 클라이언트 JS 번들 크기 감소

## 배포

### Vercel (권장)
- Git 연동 시 자동 배포
- Preview 배포 지원
- Edge Functions 사용 가능

### 기타 플랫폼
- Docker 컨테이너로 배포 가능
- Node.js 서버 필요 (Server-Side Rendering)

## 확장 가능성

### 추가 고려사항
- **상태 관리**: Zustand
- **데이터 페칭**: React Query (TanStack Query), SWR
- **데이터베이스**: Prisma + PostgreSQL, Supabase
- **테스팅**: Jest

## 참고 자료
- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [TypeScript 문서](https://www.typescriptlang.org/docs)


