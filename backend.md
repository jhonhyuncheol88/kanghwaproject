강화섬살이 - 백엔드 통합 설계 문서 (v2.0)1. 개요 (Overview)본 문서는 '강화섬살이' 프로젝트의 백엔드 시스템 설계를 상세하게 정의합니다. 데이터베이스로 Google Firebase의 Firestore를 사용하며, 모든 데이터 구조는 TypeScript 인터페이스를 통해 명확하게 정의하여 데이터의 안정성과 개발 효율성을 확보하는 것을 목표로 합니다.최종 버전 주요 변경점: '강화의 크리에이터' 기능 추가, 커뮤니티 기능(대댓글, 신고, 차단, 좋아요) 고도화.2. 기술 스택 (Tech Stack)데이터베이스: Firebase (Firestore)실시간 동기화를 지원하는 NoSQL 문서 기반 데이터베이스.서버리스 환경: FirebaseCloud Storage for Firebase: 이미지 등 미디어 파일 저장.Firebase Authentication: 사용자 인증 및 관리.언어: TypeScript데이터 모델의 타입을 명확하게 정의하여 오류를 방지하고 코드의 가독성을 높임.3. 데이터베이스 스키마 (Firestore Collection & Document)Firestore는 컬렉션(Collection)과 문서(Document)의 계층 구조를 가집니다. 본 프로젝트에서는 핵심 정보들을 각각의 최상위 컬렉션으로 관리합니다.가. activities 컬렉션설명: 전시, 공연, 축제, 체험 등 강화도의 모든 문화 활동 정보를 저장합니다.경로: activities/{activityId}TypeScript 인터페이스 (Activity.ts):import { Timestamp, GeoPoint } from 'firebase/firestore';

export interface Activity {
  id: string; // Firestore 문서 ID
  title: string; // 활동 제목
  category: 'exhibition' | 'performance' | 'festival' | 'experience';
  description: string; // 상세 설명 (HTML 또는 Markdown)
  mainImage: string; // 대표 이미지 URL (Firebase Storage)
  images?: string[]; // 추가 이미지 URL 목록
  tags?: string[]; // 관련 태그 (예: ['#전시', '#가족체험'])
  dateInfo: {
    type: 'period' | 'specific';
    startDate: Timestamp;
    endDate?: Timestamp;
  };
  location: {
    name: string; // 장소 이름
    address: string; // 주소
    geoPoint: GeoPoint; // 지도 표시를 위한 위경도
  };
  organizer: string; // 주최자
  contact?: string; // 문의처
  createdAt: Timestamp; // 등록일
  authorId: string; // 정보 등록자 ID (관리자 또는 제보자)
}
나. properties 컬렉션설명: 빈집, 농막, 토지 등 소규모 부동산 정보를 저장합니다.경로: properties/{propertyId}TypeScript 인터페이스 (Property.ts):import { Timestamp, GeoPoint } from 'firebase/firestore';

export interface Property {
  id: string; // Firestore 문서 ID
  title: string; // 매물 제목
  propertyType: 'empty-house' | 'farm-hut' | 'land';
  dealType: 'sale' | 'rent';
  description: string;
  mainImage: string;
  images?: string[];
  tags?: string[];
  price: number; // 가격 (숫자, 만원 단위)
  area: {
    land: number; // 대지 면적 (평)
    building?: number; // 건물 면적 (평)
  };
  location: {
    address: string;
    geoPoint: GeoPoint;
  };
  contact: string;
  createdAt: Timestamp;
  authorId: string;
}
다. creators 컬렉션설명: '강화의 크리에이터' 메뉴를 위한 데이터 컬렉션입니다. 인스타그램, 유튜브 등 다양한 플랫폼에서 활동하는 크리에이터 정보를 큐레이션하여 저장합니다.경로: creators/{creatorId}TypeScript 인터페이스 (Creator.ts):import { Timestamp } from 'firebase/firestore';

export interface Creator {
  id: string; // Firestore 문서 ID
  creatorName: string; // 크리에이터/채널명
  handle: string; // 계정 핸들 (예: '@ganghwa.vibe')
  platform: 'instagram' | 'youtube';
  profileUrl: string; // 채널 URL
  description: string; // 운영자가 작성하는 한 줄 소개
  thumbnailUrl: string; // 프로필 이미지 URL
  categories: string[]; // '풍경/여행', '맛집/카페', '귀촌/일상' 등
  createdAt: Timestamp;
  authorId: string; // 정보 등록자 ID
}
라. users 컬렉션설명: 커뮤니티 기능 활성화를 위한 사용자 정보 컬렉션입니다.경로: users/{userId}TypeScript 인터페이스 (User.ts):import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string; // Firebase Authentication UID
  email: string;
  displayName: string; // 닉네임
  photoURL?: string; // 프로필 이미지 URL
  bio?: string; // 자기소개
  interests?: string[]; // 관심분야
  createdAt: Timestamp;
}
하위 컬렉션: blockedUsers설명: 해당 사용자가 차단한 다른 사용자 목록입니다.경로: users/{userId}/blockedUsers/{blockedUserId}데이터: { blockedAt: Timestamp }마. posts 컬렉션 (게시판)설명: 사용자들이 자유롭게 글을 작성하는 커뮤니티 게시판 컬렉션입니다.경로: posts/{postId}TypeScript 인터페이스 (Post.ts):import { Timestamp } from 'firebase/firestore';

export interface Post {
  id: string; // Firestore 문서 ID
  title: string; // 게시글 제목
  content: string; // 내용 (HTML 또는 Markdown)
  category: string; // '자유게시판', '질문답변', '프로젝트모집' 등
  tags?: string[];
  authorId: string; // 작성자 ID (users 컬렉션의 uid 참조)
  authorDisplayName: string; // 작성자 닉네임
  authorPhotoURL?: string; // 작성자 프로필 이미지 URL
  commentCount: number;
  likeCount: number;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
바. posts의 하위 컬렉션1. 댓글 컬렉션 (comments)설명: 각 게시글에 종속되는 댓글 정보를 관리하며, 대댓글 기능을 지원합니다.경로: posts/{postId}/comments/{commentId}TypeScript 인터페이스 (Comment.ts):import { Timestamp } from 'firebase/firestore';

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorDisplayName: string;
  authorPhotoURL?: string;
  createdAt: Timestamp;
  parentId?: string | null; // 대댓글인 경우 부모 댓글의 ID
  replyCount: number; // 대댓글 수
  likeCount: number; // 좋아요 수
}
댓글의 하위 컬렉션: likes경로: posts/{postId}/comments/{commentId}/likes/{userId}2. 좋아요 컬렉션 (likes)설명: 각 게시글에 대한 '좋아요' 정보를 관리합니다.경로: posts/{postId}/likes/{userId}사. reports 컬렉션 (신고)설명: 부적절한 콘텐츠 신고 정보를 저장하여 관리자가 검토할 수 있습니다.경로: reports/{reportId}TypeScript 인터페이스 (Report.ts):import { Timestamp } from 'firebase/firestore';

export interface Report {
  id: string;
  reporterId: string; // 신고자 ID
  targetType: 'post' | 'comment'; // 신고 대상 타입
  targetId: string; // 신고된 콘텐츠 ID
  targetPath: string; // 신고된 콘텐츠의 전체 경로
  targetAuthorId: string; // 신고된 콘텐츠 작성자 ID
  reason: string; // 신고 사유
  createdAt: Timestamp;
  status: 'pending' | 'resolved'; // 처리 상태
}
4. 데이터 관리 및 보안 규칙 (Security Rules)activities, properties, creatorsread: 모든 사용자가 읽을 수 있습니다.create, update, delete: 인증된 관리자만 가능합니다.usersread: 모든 사용자가 다른 사용자의 기본 정보를 읽을 수 있습니다.update, delete: 사용자는 자신의 문서(request.auth.uid == userId)만 수정/삭제할 수 있습니다.users/{userId}/blockedUserscreate, delete: 해당 사용자 자신만 문서를 생성/삭제할 수 있습니다.postsread: 모든 사용자가 읽을 수 있습니다.create: 인증된 사용자(request.auth != null)만 생성할 수 있습니다.update, delete: 게시글의 작성자(resource.data.authorId == request.auth.uid)만 수정/삭제할 수 있습니다.posts/{postId}/comments 및 posts/{postId}/comments/{commentId}/likesread: 모든 사용자가 읽을 수 있습니다.create: 인증된 사용자만 생성할 수 있습니다.update, delete: 댓글/좋아요의 작성자만 수정/삭제할 수 있습니다.reportsread, update, delete: 관리자만 가능합니다.create: 인증된 사용자만 생성할 수 있습니다.