import { Timestamp } from 'firebase/firestore';

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
