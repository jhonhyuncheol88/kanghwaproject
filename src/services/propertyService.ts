import BaseFirestoreService from './baseFirestoreService';
import { Property } from '../types/Property';

class PropertyService extends BaseFirestoreService<Property> {
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
