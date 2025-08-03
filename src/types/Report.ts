import { Timestamp } from 'firebase/firestore';

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
