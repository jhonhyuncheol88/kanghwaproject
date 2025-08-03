import MockDataLoader from '../services/mockDataLoader';

/**
 * 개발자 도구에서 사용할 수 있는 유틸리티 함수들
 */
export const devTools = {
  /**
   * 캐시 상태 확인
   */
  getCacheStatus: () => {
    const loader = MockDataLoader.getInstance();
    return loader.getCacheStatus();
  },

  /**
   * 캐시 초기화
   */
  clearCache: () => {
    const loader = MockDataLoader.getInstance();
    loader.clearCache();
    console.log('🗑️ 캐시가 초기화되었습니다.');
  },

  /**
   * 목업 데이터 재초기화
   */
  reinitializeMockData: async () => {
    const loader = MockDataLoader.getInstance();
    loader.clearCache();
    await loader.initializeMockData();
    console.log('🔄 목업 데이터가 재초기화되었습니다.');
  },

  /**
   * 특정 컬렉션 데이터 확인
   */
  checkCollection: async (collectionName: string) => {
    const loader = MockDataLoader.getInstance();
    return await loader.checkCollectionData(collectionName);
  },

  /**
   * 모든 컬렉션 데이터 확인
   */
  checkAllCollections: async () => {
    const collections = [
      // 'workcation-cafes', // 워케이션 관련 데이터는 주석처리
      'island-life-properties', 
      'creators-legacy'
    ];
    
    const results: Record<string, any> = {};
    for (const collection of collections) {
      try {
        results[collection] = await devTools.checkCollection(collection);
      } catch (error) {
        results[collection] = { error: (error as Error).message };
      }
    }
    
    console.table(results);
    return results;
  }
};

// 전역 객체에 노출
if (typeof window !== 'undefined') {
  (window as any).devTools = devTools;
  console.log('🛠️ 개발자 도구에서 devTools 사용 가능:');
  console.log('  - devTools.getCacheStatus()');
  console.log('  - devTools.clearCache()');
  console.log('  - devTools.reinitializeMockData()');
  console.log('  - devTools.checkCollection("collection-name")');
  console.log('  - devTools.checkAllCollections()');
} 