import { Timestamp } from 'firebase/firestore';

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
