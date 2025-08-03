# Firebase 서비스 사용 가이드

## 개요
각 컬렉션에 맞는 Firebase CRUD 서비스들이 구현되어 있습니다. 현재는 로그인 기능이 없으므로 읽기 전용으로 설정되어 있습니다.

## 서비스 목록

### 1. 📁 ActivityService (`activityService`)
**컬렉션**: `activities`
**목적**: 강화도의 문화/행사 정보 관리

```typescript
import { activityService } from '../services';

// 모든 활동 데이터 가져오기
const activities = await activityService.getAllActivities();

// 특정 카테고리와 태그로 필터링
const workcationCafes = await activityService.getActivitiesByCategoryAndTag('experience', '#워케이션카페');
```

### 2. 📁 PropertyService (`propertyService`)
**컬렉션**: `properties`
**목적**: 빈집, 농막 등 부동산 정보 관리

```typescript
import { propertyService } from '../services';

// 모든 부동산 데이터 가져오기
const properties = await propertyService.getAllProperties();
```

### 3. 📁 CreatorService (`creatorService`)
**컬렉션**: `creators`
**목적**: 강화도 관련 크리에이터 정보 관리

```typescript
import { creatorService } from '../services';

// 모든 크리에이터 데이터 가져오기
const creators = await creatorService.getAllCreators();
```

### 4. 📁 UserService (`userService`)
**컬렉션**: `users`
**목적**: 사용자 정보 관리

```typescript
import { userService } from '../services';

// 모든 사용자 데이터 가져오기
const users = await userService.getAllUsers();

// 특정 사용자 정보 가져오기
const user = await userService.getUserById('userId');

// 차단한 사용자 목록 가져오기
const blockedUsers = await userService.getBlockedUsers('userId');
```

### 5. 📁 PostService (`postService`)
**컬렉션**: `posts`
**목적**: 커뮤니티 게시글 관리

```typescript
import { postService } from '../services';

// 모든 게시글 가져오기
const posts = await postService.getAllPosts();

// 특정 게시글 가져오기
const post = await postService.getPostById('postId');
```

### 6. 📁 CommentService (`commentService`)
**컬렉션**: `posts/{postId}/comments`
**목적**: 게시글 댓글 관리

```typescript
import { commentService } from '../services';

// 특정 게시글의 모든 댓글 가져오기
const commentServiceInstance = commentService('postId');
const comments = await commentServiceInstance.getAllComments();
```

### 7. 📁 ReportService (`reportService`)
**컬렉션**: `reports`
**목적**: 신고 내역 관리 (관리자만 접근)

```typescript
import { reportService } from '../services';

// 현재 비활성화 - 관리자만 접근 가능
// const reports = await reportService.getAllReports(); // 오류 발생
```

## 현재 상태

### ✅ 읽기 가능한 서비스들:
- `activityService` - 활동 데이터 읽기
- `propertyService` - 부동산 데이터 읽기
- `creatorService` - 크리에이터 데이터 읽기
- `userService` - 사용자 데이터 읽기
- `postService` - 게시글 읽기
- `commentService` - 댓글 읽기

### ❌ 쓰기 비활성화된 서비스들:
- 모든 서비스의 쓰기 작업 (추가, 수정, 삭제)
- `reportService` - 완전 비활성화 (관리자만 접근)

## 사용 예시

### 홈페이지에서 콘텐츠 가져오기:
```typescript
import { activityService, propertyService } from '../services';

const HomePage = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      const [activities, properties] = await Promise.all([
        activityService.getAllActivities(),
        propertyService.getAllProperties()
      ]);
      
      setContents([...activities, ...properties]);
    };

    fetchContents();
  }, []);

  return (
    <div>
      {contents.map(item => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  );
};
```

### 워케이션 카페 필터링:
```typescript
import { activityService } from '../services';

const WorkcationPage = () => {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchCafes = async () => {
      const workcationCafes = await activityService.getActivitiesByCategoryAndTag(
        'experience', 
        '#워케이션카페'
      );
      setCafes(workcationCafes);
    };

    fetchCafes();
  }, []);

  return (
    <div>
      {cafes.map(cafe => (
        <CafeCard key={cafe.id} cafe={cafe} />
      ))}
    </div>
  );
};
```

## 향후 계획

### 로그인 기능 추가 시:
1. **사용자 인증**: Firebase Auth 연동
2. **쓰기 권한**: 로그인된 사용자만 쓰기 가능
3. **개인화**: 사용자별 데이터 접근 제어

### 관리자 기능 추가 시:
1. **관리자 권한**: 특정 사용자에게 관리자 권한 부여
2. **신고 관리**: reports 컬렉션 접근 권한
3. **콘텐츠 관리**: 모든 데이터 수정/삭제 권한

## 오류 처리

### 일반적인 오류:
```typescript
try {
  const data = await activityService.getAllActivities();
  // 성공 처리
} catch (error) {
  console.error('데이터 로딩 실패:', error);
  // 오류 처리 (로딩 상태, 오류 메시지 등)
}
```

### 권한 오류:
```typescript
try {
  await postService.addPost(postData); // 오류 발생
} catch (error) {
  if (error.message.includes('로그인 기능이 필요합니다')) {
    // 로그인 안내
  }
}
``` 