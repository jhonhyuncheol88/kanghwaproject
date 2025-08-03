import BaseFirestoreService from './baseFirestoreService';
import { Creator } from '../types/Creator';

class CreatorService extends BaseFirestoreService<Creator> {
  constructor() {
    super('creators');
  }

  /**
   * 모든 크리에이터 데이터를 가져옵니다.
   * @returns {Promise<Creator[]>}
   */
  async getAllCreators(): Promise<Creator[]> {
    return await this.getAll() as Creator[];
  }
}

export const creatorService = new CreatorService();
