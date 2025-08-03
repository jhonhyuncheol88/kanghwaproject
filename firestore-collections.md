# Firebase Firestore 컬렉션 구조 설계

## 개요
'강화도 라이프' 프로젝트의 Firestore 데이터베이스 구조입니다. 데이터는 목적에 따라 명확하게 분리된 최상위 컬렉션들로 구성됩니다.

## 컬렉션 구조

### 📁 Root
```
/
├── 📁 users/{userId}
│   └── 📁 blockedUsers/{blockedUserId}
├── 📁 posts/{postId}
│   ├── 📁 comments/{commentId}
│   │   └── 📁 likes/{userId}
│   └── 📁 likes/{userId}
├── 📁 activities/{activityId}
├── 📁 properties/{propertyId}
├── 📁 creators/{creatorId}
└── 📁 reports/{reportId}
```

## 컬렉션 상세 설명

### 1. 📁 users/{userId}
**설명**: 사용자 정보를 저장하는 최상위 컬렉션
**경로**: `/users/{userId}`

#### 하위 컬렉션:
- **📁 blockedUsers/{blockedUserId}**
  - 설명: 특정 사용자가 차단한 다른 사용자 목록
  - 경로: `/users/{userId}/blockedUsers/{blockedUserId}`

### 2. 📁 posts/{postId}
**설명**: 커뮤니티 게시글을 저장하는 최상위 컬렉션
**경로**: `/posts/{postId}`

#### 하위 컬렉션:
- **📁 comments/{commentId}**
  - 설명: 각 게시글에 달린 댓글들 (대댓글 지원)
  - 경로: `/posts/{postId}/comments/{commentId}`
  
  - **📁 likes/{userId}**
    - 설명: 각 댓글에 대한 '좋아요' 정보
    - 경로: `/posts/{postId}/comments/{commentId}/likes/{userId}`

- **📁 likes/{userId}**
  - 설명: 각 게시글에 대한 '좋아요' 정보
  - 경로: `/posts/{postId}/likes/{userId}`

### 3. 📁 activities/{activityId}
**설명**: 강화도의 문화/행사 정보를 저장하는 최상위 컬렉션
**경로**: `/activities/{activityId}`

### 4. 📁 properties/{propertyId}
**설명**: 빈집, 농막 등 부동산 정보를 저장하는 최상위 컬렉션
**경로**: `/properties/{propertyId}`

### 5. 📁 creators/{creatorId}
**설명**: 강화도 관련 인스타그램, 유튜브 크리에이터 정보를 저장하는 최상위 컬렉션
**경로**: `/creators/{creatorId}`

### 6. 📁 reports/{reportId}
**설명**: 부적절한 콘텐츠 신고 내역을 저장하는 최상위 컬렉션 (관리자만 접근)
**경로**: `/reports/{reportId}`

## 경로 표기법 설명
- `/` : 데이터베이스의 최상위(Root)를 의미
- `{collectionName}` : 컬렉션의 이름을 나타냄
- `{documentId}` : 각 문서(Document)의 고유 ID를 나타냄 (예: {userId}, {postId})

## 데이터 접근 권한 (현재)
- **읽기**: 모든 컬렉션에 대해 공개 읽기 허용
- **쓰기**: 현재 모든 쓰기 작업 차단 (관리자만 가능하도록 설정 예정)
- **reports**: 관리자만 접근 가능 (현재 완전 차단)

## 향후 계획
1. **로그인 기능 추가 시**: 사용자별 쓰기 권한 설정
2. **관리자 기능**: reports 컬렉션 접근 권한 설정
3. **실시간 업데이트**: Firestore 실시간 리스너 구현 