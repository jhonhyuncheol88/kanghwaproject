# Firebase 설정 가이드

## 1. Firestore 규칙 업데이트

### Firebase 콘솔에서 규칙 업데이트:
1. [Firebase 콘솔](https://console.firebase.google.com/)에 접속
2. 프로젝트 선택: `kanghwaproject-87cf2`
3. 왼쪽 메뉴에서 **Firestore Database** 클릭
4. **규칙** 탭 클릭
5. `firestore.rules` 파일의 내용을 복사하여 붙여넣기
6. **게시** 버튼 클릭

## 2. 컬렉션 구조 확인

### 수동으로 컬렉션 생성 (선택사항):
Firebase 콘솔에서 다음 컬렉션들을 생성할 수 있습니다:

1. **activities** - 문화/행사 정보
2. **properties** - 부동산 정보  
3. **creators** - 크리에이터 정보
4. **posts** - 커뮤니티 게시글
5. **users** - 사용자 정보
6. **reports** - 신고 내역

### 자동 생성:
더미 데이터가 추가되면 자동으로 컬렉션이 생성됩니다.

## 3. 현재 상태 확인

### 더미 데이터 추가 확인:
1. 브라우저에서 `http://localhost:3000` 접속
2. 개발자 도구 콘솔에서 다음 메시지 확인:
   - "Activity dummy data added successfully!"
   - "Property dummy data added successfully!"
   - "Creator dummy data added successfully!"

### Firestore 콘솔에서 확인:
1. Firebase 콘솔 > Firestore Database > 데이터 탭
2. 다음 컬렉션들이 생성되었는지 확인:
   - `activities`
   - `properties` 
   - `creators`

## 4. 보안 규칙 설명

### 현재 규칙:
- **읽기**: 모든 컬렉션에 대해 공개 읽기 허용
- **쓰기**: 모든 쓰기 작업 차단 (관리자만 가능)
- **reports**: 완전 차단 (관리자만 접근)

### 향후 계획:
1. **로그인 기능 추가 시**: 사용자별 쓰기 권한 설정
2. **관리자 기능**: reports 컬렉션 접근 권한 설정
3. **실시간 업데이트**: Firestore 실시간 리스너 구현

## 5. 문제 해결

### 일반적인 문제:
1. **규칙 오류**: Firebase 콘솔에서 규칙 문법 확인
2. **데이터 로딩 실패**: 네트워크 연결 및 Firebase 설정 확인
3. **권한 오류**: 보안 규칙 확인 및 수정

### 디버깅:
- 브라우저 개발자 도구 콘솔에서 오류 메시지 확인
- Firebase 콘솔 > Firestore Database > 사용량 탭에서 요청 확인 