import DataUploadService from './dataUploadService';

interface CacheItem {
  data: any;
  timestamp: number;
  expiresAt: number;
}

class MockDataLoader {
  private static instance: MockDataLoader;
  private cache: Map<string, CacheItem> = new Map();
  private uploadService: DataUploadService;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  constructor() {
    this.uploadService = new DataUploadService();
  }

  static getInstance(): MockDataLoader {
    if (!MockDataLoader.instance) {
      MockDataLoader.instance = new MockDataLoader();
    }
    return MockDataLoader.instance;
  }

  /**
   * 캐시 유효성 검사 (1시간)
   */
  private isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    
    const now = Date.now();
    return now < cached.expiresAt;
  }

  /**
   * 캐시에 데이터 저장
   */
  private setCache(key: string, data: any): void {
    const now = Date.now();
    const expiresAt = now + (60 * 60 * 1000); // 1시간 후 만료
    
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt
    });
  }

  /**
   * 캐시에서 데이터 가져오기
   */
  private getCache(key: string): any | null {
    if (!this.isCacheValid(key)) {
      this.cache.delete(key);
      return null;
    }
    return this.cache.get(key)?.data || null;
  }

  /**
   * 앱 초기화 시 목업 데이터 자동 업로드
   */
  async initializeMockData(): Promise<void> {
    if (this.isInitialized) {
      console.log('목업 데이터가 이미 초기화되었습니다.');
      return;
    }

    if (this.initializationPromise) {
      console.log('목업 데이터 초기화가 진행 중입니다...');
      return this.initializationPromise;
    }

    this.initializationPromise = this.performInitialization();
    return this.initializationPromise;
  }

  private async performInitialization(): Promise<void> {
    try {
      console.log('🚀 목업 데이터 초기화 시작...');
      
      // 캐시 확인
      const cacheKey = 'mock-data-initialized';
      const cached = this.getCache(cacheKey);
      
      if (cached) {
        console.log('✅ 캐시된 목업 데이터가 있습니다. 초기화를 건너뜁니다.');
        this.isInitialized = true;
        return;
      }

      // 데이터 업로드 실행
      await this.uploadService.uploadAllData();
      
      // 성공 시 캐시에 저장
      this.setCache(cacheKey, { initialized: true });
      this.isInitialized = true;
      
      console.log('✅ 목업 데이터 초기화 완료!');
      
    } catch (error) {
      console.error('❌ 목업 데이터 초기화 실패:', error);
      this.initializationPromise = null;
      throw error;
    }
  }

  /**
   * 특정 컬렉션 데이터 확인 (캐시 적용)
   */
  async checkCollectionData(collectionName: string): Promise<any> {
    const cacheKey = `collection-${collectionName}`;
    const cached = this.getCache(cacheKey);
    
    if (cached) {
      console.log(`📊 캐시된 ${collectionName} 데이터 사용`);
      return cached;
    }

    try {
      await this.uploadService.checkCollectionData(collectionName);
      const result = { collectionName, checked: true, timestamp: Date.now() };
      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error(`${collectionName} 데이터 확인 실패:`, error);
      throw error;
    }
  }

  /**
   * 캐시 초기화
   */
  clearCache(): void {
    this.cache.clear();
    this.isInitialized = false;
    this.initializationPromise = null;
    console.log('🗑️ 캐시가 초기화되었습니다.');
  }

  /**
   * 캐시 상태 확인
   */
  getCacheStatus(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

export default MockDataLoader; 