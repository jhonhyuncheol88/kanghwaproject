import BaseFirestoreService from './baseFirestoreService.ts';
import { auth } from './firebase.ts'; // 인증 상태 확인을 위해 auth 임포트
import { Post } from '../types/Post.ts';
import { Comment } from '../types/Comment.ts';
import { Report } from '../types/Report.ts';
import { Timestamp } from 'firebase/firestore';

class PostService extends BaseFirestoreService<Post> {
  constructor() {
    super('posts');
  }

  /**
   * 새 게시글을 추가합니다. (인증된 사용자만 가능)
   * @param {Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'commentCount' | 'likeCount' | 'authorId' | 'authorDisplayName' | 'authorPhotoURL'>} data
   * @returns {Promise<string>}
   */
  async addPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'commentCount' | 'likeCount' | 'authorId' | 'authorDisplayName' | 'authorPhotoURL'>): Promise<string> {
    if (!auth.currentUser) {
      throw new Error("로그인된 사용자만 게시글을 작성할 수 있습니다.");
    }
    const newPost: Post = {
      ...data,
      id: '', // Firestore에서 자동 생성되므로 임시 값
      authorId: auth.currentUser.uid,
      authorDisplayName: auth.currentUser.displayName || auth.currentUser.email || '익명',
      authorPhotoURL: auth.currentUser.photoURL || null,
      createdAt: Timestamp.now(),
      commentCount: 0,
      likeCount: 0,
    };
    return await this.add(newPost);
  }

  // TODO: 게시글 수정, 삭제, 좋아요, 신고 등 추가
}

class CommentService extends BaseFirestoreService<Comment> {
  constructor(postId: string) {
    super(`posts/${postId}/comments`);
  }

  /**
   * 새 댓글을 추가합니다. (인증된 사용자만 가능)
   * @param {Omit<Comment, 'id' | 'createdAt' | 'replyCount' | 'likeCount' | 'authorId' | 'authorDisplayName' | 'authorPhotoURL'>} data
   * @returns {Promise<string>}
   */
  async addComment(data: Omit<Comment, 'id' | 'createdAt' | 'replyCount' | 'likeCount' | 'authorId' | 'authorDisplayName' | 'authorPhotoURL'>): Promise<string> {
    if (!auth.currentUser) {
      throw new Error("로그인된 사용자만 댓글을 작성할 수 있습니다.");
    }
    const newComment: Comment = {
      ...data,
      id: '', // Firestore에서 자동 생성되므로 임시 값
      authorId: auth.currentUser.uid,
      authorDisplayName: auth.currentUser.displayName || auth.currentUser.email || '익명',
      authorPhotoURL: auth.currentUser.photoURL || null,
      createdAt: Timestamp.now(),
      replyCount: 0,
      likeCount: 0,
    };
    return await this.add(newComment);
  }

  // TODO: 댓글 수정, 삭제, 좋아요 등 추가
}

class ReportService extends BaseFirestoreService<Report> {
  constructor() {
    super('reports');
  }

  /**
   * 콘텐츠를 신고합니다. (인증된 사용자만 가능)
   * @param {Omit<Report, 'id' | 'createdAt' | 'status' | 'reporterId'>} data
   * @returns {Promise<string>}
   */
  async addReport(data: Omit<Report, 'id' | 'createdAt' | 'status' | 'reporterId'>): Promise<string> {
    if (!auth.currentUser) {
      throw new Error("로그인된 사용자만 신고할 수 있습니다.");
    }
    const newReport: Report = {
      ...data,
      id: '', // Firestore에서 자동 생성되므로 임시 값
      reporterId: auth.currentUser.uid,
      createdAt: Timestamp.now(),
      status: 'pending',
    };
    return await this.add(newReport);
  }
}

export const postService = new PostService();
export const commentService = (postId: string) => new CommentService(postId);
export const reportService = new ReportService();
