import BaseFirestoreService from './baseFirestoreService.ts';
import { Activity } from '../types/Activity.ts';

class ActivityService extends BaseFirestoreService {
  constructor() {
    super('activities');
  }

  /**
   * 모든 활동 데이터를 가져옵니다.
   * @returns {Promise<Activity[]>}
   */
  async getAllActivities(): Promise<Activity[]> {
    return await this.getAll() as Activity[];
  }

  /**
   * 특정 카테고리와 태그를 가진 활동 데이터를 가져옵니다 (예: 워케이션 카페).
   * @param {string} category
   * @param {string} tag
   * @returns {Promise<Activity[]>}
   */
  async getActivitiesByCategoryAndTag(category: string, tag: string): Promise<Activity[]> {
    return await this.query([
      ['category', '==', category],
      ['tags', 'array-contains', tag]
    ]) as Activity[];
  }
}

export const activityService = new ActivityService();
