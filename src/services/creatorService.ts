import BaseFirestoreService from './baseFirestoreService.ts';
import { Creator } from '../types/Creator.ts';

class CreatorService extends BaseFirestoreService {
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
