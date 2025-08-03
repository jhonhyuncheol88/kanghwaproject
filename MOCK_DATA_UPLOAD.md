# 목업 데이터 Firestore 업로드 가이드

이 가이드에서는 `src/data/` 폴더의 목업 데이터들을 Firebase Firestore에 업로드하는 방법을 설명합니다.

## 📁 업로드되는 데이터

### 1. 워케이션 데이터 (`workcationData.ts`)
- **컬렉션**: `workcation-cafes`
- **데이터**: 카페 정보 (3개)
- **컬렉션**: `workcation-accommodations` 
- **데이터**: 숙박 정보 (현재 빈 배열)
- **컬렉션**: `workcation-courses`
- **데이터**: 코스 정보 (현재 빈 배열)

### 2. 섬생활 데이터 (`islandLifeData.ts`)
- **컬렉션**: `island-life-properties`
- **데이터**: 부동산 정보 (3개)

### 3. 크리에이터 데이터 (`creatorsData.ts`)
- **컬렉션**: `creators-legacy`
- **데이터**: 크리에이터 정보 (3개)

## 🚀 업로드 실행 방법

### 1. 의존성 설치
```bash
npm install
```

### 2. Firebase 설정 확인
`src/services/firebase.ts` 파일에서 Firebase 설정이 올바르게 되어 있는지 확인하세요.

### 3. 데이터 업로드 실행
```bash
npm run upload-mock-data
```

## 📊 업로드 결과 확인

업로드가 완료되면 다음과 같은 정보가 콘솔에 출력됩니다:

```
🚀 목업 데이터 업로드 시작...
워케이션 카페 데이터 업로드 시작...
카페 "조용한 해변 앞 카페, "오션브리즈"" 업로드 완료
카페 "숲 속의 작업실, "그린로그"" 업로드 완료
카페 "레트로 감성, "강화 다방"" 업로드 완료
워케이션 카페 데이터 업로드 완료!
...
✅ 모든 목업 데이터 업로드 완료!

📊 업로드된 데이터 확인:
workcation-cafes 컬렉션 데이터 확인 중...
총 3개의 문서가 있습니다.
...
```

## 🔧 코드 구조

### DataUploadService 클래스
- `src/services/dataUploadService.ts`에 위치
- BaseFirestoreService를 상속받아 각 데이터 타입별로 서비스 클래스 생성
- 에러 처리 및 로깅 기능 포함

### 업로드 스크립트
- `src/scripts/uploadMockData.ts`에 위치
- 모든 데이터를 순차적으로 업로드
- 업로드 후 데이터 확인 기능

## ⚠️ 주의사항

1. **중복 업로드 방지**: 같은 데이터를 여러 번 업로드하면 중복 문서가 생성됩니다.
2. **Firebase 권한**: Firestore 쓰기 권한이 필요합니다.
3. **네트워크 연결**: 인터넷 연결이 필요합니다.

## 🛠️ 문제 해결

### 업로드 실패 시
1. Firebase 설정 확인
2. 네트워크 연결 확인
3. Firebase 콘솔에서 권한 설정 확인

### 데이터 확인
```javascript
// 브라우저 콘솔에서 실행
import DataUploadService from './src/services/dataUploadService';
const service = new DataUploadService();
await service.checkCollectionData('workcation-cafes');
```

## 📝 추가 데이터 업로드

새로운 목업 데이터를 추가하려면:

1. `src/data/` 폴더에 새 데이터 파일 생성
2. `DataUploadService` 클래스에 새로운 업로드 메서드 추가
3. `uploadAllData()` 메서드에 새 메서드 호출 추가

이렇게 하면 모든 목업 데이터가 Firestore에 안전하게 업로드됩니다! 