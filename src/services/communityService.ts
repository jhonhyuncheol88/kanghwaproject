import BaseFirestoreService from './baseFirestoreService';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Report } from '../types/Report';

class PostService extends BaseFirestoreService<Post> {
  constructor() {
    super('posts');
  }

  /**
   * 모든 게시글을 가져옵니다. (읽기 전용)
   * @returns {Promise<Post[]>}
   */
  async getAllPosts(): Promise<Post[]> {
    return await this.getAll() as Post[];
  }

  /**
   * 특정 게시글을 가져옵니다. (읽기 전용)
   * @param {string} postId
   * @returns {Promise<Post | undefined>}
   */
  async getPostById(postId: string): Promise<Post | undefined> {
    return await this.getById(postId);
  }

  /**
   * 게시글을 추가합니다.
   * @param {Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'commentCount' | 'likeCount' | 'authorId' | 'authorDisplayName' | 'authorPhotoURL'>} data
   * @returns {Promise<string>}
   */
  async addPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'commentCount' | 'likeCount' | 'authorId' | 'authorDisplayName' | 'authorPhotoURL'>): Promise<string> {
    const { Timestamp } = await import('firebase/firestore');
    
    const newPost: Post = {
      ...data,
      id: '', // Firestore에서 자동 생성
      authorId: 'anonymous',
      authorDisplayName: '익명 사용자',
      authorPhotoURL: undefined,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      commentCount: 0,
      likeCount: 0,
    };
    
    return await this.add(newPost);
  }

  /**
   * 게시글을 수정합니다.
   * @param {string} postId
   * @param {Partial<Post>} data
   * @returns {Promise<void>}
   */
  async updatePost(postId: string, data: Partial<Post>): Promise<void> {
    const { Timestamp } = await import('firebase/firestore');
    
    const updateData = {
      ...data,
      updatedAt: Timestamp.now(),
    };
    
    await this.update(postId, updateData);
  }

  /**
   * 게시글을 삭제합니다.
   * @param {string} postId
   * @returns {Promise<void>}
   */
  async deletePost(postId: string): Promise<void> {
    await this.delete(postId);
  }
}

class CommentService extends BaseFirestoreService<Comment> {
  constructor(postId: string) {
    super(`posts/${postId}/comments`);
  }

  /**
   * 특정 게시글의 모든 댓글을 가져옵니다. (읽기 전용)
   * @returns {Promise<Comment[]>}
   */
  async getAllComments(): Promise<Comment[]> {
    return await this.getAll() as Comment[];
  }

  /**
   * 댓글을 추가합니다.
   * @param {Omit<Comment, 'id' | 'createdAt' | 'replyCount' | 'likeCount' | 'authorId' | 'authorDisplayName' | 'authorPhotoURL'>} data
   * @returns {Promise<string>}
   */
  async addComment(data: Omit<Comment, 'id' | 'createdAt' | 'replyCount' | 'likeCount' | 'authorId' | 'authorDisplayName' | 'authorPhotoURL'>): Promise<string> {
    const { Timestamp } = await import('firebase/firestore');
    
    const newComment: Comment = {
      ...data,
      id: '', // Firestore에서 자동 생성
      authorId: 'anonymous',
      authorDisplayName: '익명 사용자',
      authorPhotoURL: undefined,
      createdAt: Timestamp.now(),
      replyCount: 0,
      likeCount: 0,
    };
    
    return await this.add(newComment);
  }

  /**
   * 댓글을 수정합니다.
   * @param {string} commentId
   * @param {Partial<Comment>} data
   * @returns {Promise<void>}
   */
  async updateComment(commentId: string, data: Partial<Comment>): Promise<void> {
    await this.update(commentId, data);
  }

  /**
   * 댓글을 삭제합니다.
   * @param {string} commentId
   * @returns {Promise<void>}
   */
  async deleteComment(commentId: string): Promise<void> {
    await this.delete(commentId);
  }
}

class ReportService extends BaseFirestoreService<Report> {
  constructor() {
    super('reports');
  }

  /**
   * 신고를 추가합니다.
   * @param {Omit<Report, 'id' | 'createdAt' | 'status' | 'reporterId'>} data
   * @returns {Promise<string>}
   */
  async addReport(data: Omit<Report, 'id' | 'createdAt' | 'status' | 'reporterId'>): Promise<string> {
    const { Timestamp } = await import('firebase/firestore');
    
    const newReport: Report = {
      ...data,
      id: '', // Firestore에서 자동 생성
      reporterId: 'anonymous',
      createdAt: Timestamp.now(),
      status: 'pending',
    };
    
    return await this.add(newReport);
  }

  /**
   * 모든 신고 내역을 가져옵니다.
   * @returns {Promise<Report[]>}
   */
  async getAllReports(): Promise<Report[]> {
    return await this.getAll() as Report[];
  }
}

export const postService = new PostService();
export const commentService = (postId: string) => new CommentService(postId);
export const reportService = new ReportService();
