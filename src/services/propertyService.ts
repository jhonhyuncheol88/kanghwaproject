import BaseFirestoreService from './baseFirestoreService.ts';
import { Property } from '../types/Property.ts';

class PropertyService extends BaseFirestoreService {
  constructor() {
    super('properties');
  }

  /**
   * 모든 부동산 데이터를 가져옵니다.
   * @returns {Promise<Property[]>}
   */
  async getAllProperties(): Promise<Property[]> {
    return await this.getAll() as Property[];
  }
}

export const propertyService = new PropertyService();
