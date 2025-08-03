# Firebase 보안 규칙 설정 가이드

## 현재 문제
더미 데이터를 추가할 때 "Missing or insufficient permissions" 오류가 발생합니다.

## 해결 방법

### 1. 개발 환경용 임시 규칙 (권장)

Firebase 콘솔에서 다음 규칙으로 설정:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 개발 환경에서는 모든 접근 허용
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 2. 프로덕션용 보안 규칙 (나중에 사용)

개발이 완료된 후 다음 규칙으로 변경:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 읽기 전용 규칙
    match /activities/{activityId} {
      allow read: if true;
      allow write: if false;
    }
    
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if false;
    }
    
    match /creators/{creatorId} {
      allow read: if true;
      allow write: if false;
    }
    
    match /posts/{postId} {
      allow read: if true;
      allow write: if false;
    }
    
    match /users/{userId} {
      allow read: if true;
      allow write: if false;
    }
    
    match /reports/{reportId} {
      allow read, write: if false;
    }
  }
}
```

## 설정 단계

### 1단계: Firebase 콘솔 접속
1. [Firebase 콘솔](https://console.firebase.google.com/) 접속
2. 프로젝트 선택: `kanghwaproject-87cf2`

### 2단계: Firestore 규칙 설정
1. 왼쪽 메뉴에서 **Firestore Database** 클릭
2. **규칙** 탭 클릭
3. 위의 개발 환경용 임시 규칙을 복사하여 붙여넣기
4. **게시** 버튼 클릭

### 3단계: 더미 데이터 추가
1. `src/App.tsx`에서 `addAllDummyData()` 주석 해제
2. 브라우저에서 `http://localhost:3000` 새로고침
3. 개발자 도구 콘솔에서 성공 메시지 확인

### 4단계: 프로덕션 준비 (나중에)
1. 더미 데이터 추가 완료 후
2. 프로덕션용 보안 규칙으로 변경
3. `addAllDummyData()` 다시 주석 처리

## 주의사항

⚠️ **개발 환경용 임시 규칙은 보안상 위험할 수 있습니다.**
- 로컬 개발 환경에서만 사용
- 프로덕션 배포 전에 반드시 보안 규칙 변경
- 실제 사용자 데이터가 있는 경우 사용 금지

## 확인 방법

### 더미 데이터 추가 확인:
```javascript
// 브라우저 콘솔에서 실행
import { activityService, propertyService, creatorService } from './src/services';

// 각 서비스에서 데이터 가져오기
const activities = await activityService.getAllActivities();
const properties = await propertyService.getAllProperties();
const creators = await creatorService.getAllCreators();

console.log('Activities:', activities.length);
console.log('Properties:', properties.length);
console.log('Creators:', creators.length);
```

### Firebase 콘솔에서 확인:
1. Firestore Database > 데이터 탭
2. 다음 컬렉션들이 생성되었는지 확인:
   - `activities`
   - `properties`
   - `creators` 