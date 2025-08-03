import { Timestamp } from 'firebase/firestore';

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
