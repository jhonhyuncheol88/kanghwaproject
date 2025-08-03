import BaseFirestoreService from './baseFirestoreService';
import { User } from '../types/User';

class UserService extends BaseFirestoreService<User> {
  constructor() {
    super('users');
  }

  /**
   * 모든 사용자 데이터를 가져옵니다. (읽기 전용)
   * @returns {Promise<User[]>}
   */
  async getAllUsers(): Promise<User[]> {
    return await this.getAll() as User[];
  }

  /**
   * 특정 사용자 정보를 가져옵니다. (읽기 전용)
   * @param {string} userId
   * @returns {Promise<User | undefined>}
   */
  async getUserById(userId: string): Promise<User | undefined> {
    return await this.getById(userId);
  }

  /**
   * 사용자 추가 (현재 비활성화 - 로그인 기능 필요)
   * @param {Omit<User, 'id' | 'createdAt' | 'updatedAt'>} data
   * @returns {Promise<string>}
   */
  async addUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    throw new Error("로그인 기능이 필요합니다. 현재는 읽기 전용입니다.");
  }

  /**
   * 사용자 정보 수정 (현재 비활성화 - 로그인 기능 필요)
   * @param {string} userId
   * @param {Partial<User>} data
   * @returns {Promise<void>}
   */
  async updateUser(userId: string, data: Partial<User>): Promise<void> {
    throw new Error("로그인 기능이 필요합니다. 현재는 읽기 전용입니다.");
  }

  /**
   * 사용자 삭제 (현재 비활성화 - 로그인 기능 필요)
   * @param {string} userId
   * @returns {Promise<void>}
   */
  async deleteUser(userId: string): Promise<void> {
    throw new Error("로그인 기능이 필요합니다. 현재는 읽기 전용입니다.");
  }

  /**
   * 사용자가 차단한 사용자 목록을 가져옵니다. (읽기 전용)
   * @param {string} userId
   * @returns {Promise<string[]>}
   */
  async getBlockedUsers(userId: string): Promise<string[]> {
    try {
      const blockedUsers = await this.query([
        ['userId', '==', userId]
      ]);
      return blockedUsers.map(user => user.id);
    } catch (error) {
      console.error('Error fetching blocked users:', error);
      return [];
    }
  }

  /**
   * 사용자 차단 (현재 비활성화 - 로그인 기능 필요)
   * @param {string} userId
   * @param {string} blockedUserId
   * @returns {Promise<void>}
   */
  async blockUser(userId: string, blockedUserId: string): Promise<void> {
    throw new Error("로그인 기능이 필요합니다. 현재는 읽기 전용입니다.");
  }

  /**
   * 사용자 차단 해제 (현재 비활성화 - 로그인 기능 필요)
   * @param {string} userId
   * @param {string} blockedUserId
   * @returns {Promise<void>}
   */
  async unblockUser(userId: string, blockedUserId: string): Promise<void> {
    throw new Error("로그인 기능이 필요합니다. 현재는 읽기 전용입니다.");
  }
}

export const userService = new UserService(); 