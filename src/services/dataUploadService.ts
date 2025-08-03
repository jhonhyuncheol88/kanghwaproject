import BaseFirestoreService from './baseFirestoreService';
import { Timestamp, GeoPoint } from 'firebase/firestore';
import { cafes, accommodations, courses } from '../data/workcationData';
import { properties as islandLifeProperties } from '../data/islandLifeData';
import { creators } from '../data/creatorsData';

// 타입 정의
interface WorkcationCafe {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
}

interface WorkcationAccommodation {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  tags: string[];
}

interface WorkcationCourse {
  id: string;
  name: string;
  description: string;
  image: string;
  duration: string;
  tags: string[];
}

interface IslandLifeProperty {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  area: string;
  tags: string[];
}

interface Creator {
  id: string;
  name: string;
  description: string;
  profileImage: string;
  link: string;
  category?: string;
}

// 서비스 클래스들
class WorkcationCafeService extends BaseFirestoreService<WorkcationCafe> {
  constructor() {
    super('workcation-cafes');
  }
}

class WorkcationAccommodationService extends BaseFirestoreService<WorkcationAccommodation> {
  constructor() {
    super('workcation-accommodations');
  }
}

class WorkcationCourseService extends BaseFirestoreService<WorkcationCourse> {
  constructor() {
    super('workcation-courses');
  }
}

class IslandLifePropertyService extends BaseFirestoreService<IslandLifeProperty> {
  constructor() {
    super('island-life-properties');
  }
}

class CreatorService extends BaseFirestoreService<Creator> {
  constructor() {
    super('creators-legacy');
  }
}

/**
 * 모든 목업 데이터를 Firestore에 업로드하는 서비스
 */
export class DataUploadService {
  private cafeService = new WorkcationCafeService();
  private accommodationService = new WorkcationAccommodationService();
  private courseService = new WorkcationCourseService();
  private propertyService = new IslandLifePropertyService();
  private creatorService = new CreatorService();

  /**
   * 워케이션 카페 데이터 업로드
   */
  async uploadWorkcationCafes(): Promise<void> {
    console.log('워케이션 카페 데이터 업로드 시작...');
    
    for (const cafe of cafes) {
      try {
        await this.cafeService.add(cafe);
        console.log(`카페 "${cafe.name}" 업로드 완료`);
      } catch (error) {
        console.error(`카페 "${cafe.name}" 업로드 실패:`, error);
      }
    }
    
    console.log('워케이션 카페 데이터 업로드 완료!');
  }

  /**
   * 워케이션 숙박 데이터 업로드
   */
  async uploadWorkcationAccommodations(): Promise<void> {
    console.log('워케이션 숙박 데이터 업로드 시작...');
    
    if (accommodations.length === 0) {
      console.log('업로드할 숙박 데이터가 없습니다.');
      return;
    }
    
    for (const accommodation of accommodations as WorkcationAccommodation[]) {
      try {
        await this.accommodationService.add(accommodation);
        console.log(`숙박 "${accommodation.name}" 업로드 완료`);
      } catch (error) {
        console.error(`숙박 "${accommodation.name}" 업로드 실패:`, error);
      }
    }
    
    console.log('워케이션 숙박 데이터 업로드 완료!');
  }

  /**
   * 워케이션 코스 데이터 업로드
   */
  async uploadWorkcationCourses(): Promise<void> {
    console.log('워케이션 코스 데이터 업로드 시작...');
    
    if (courses.length === 0) {
      console.log('업로드할 코스 데이터가 없습니다.');
      return;
    }
    
    for (const course of courses as WorkcationCourse[]) {
      try {
        await this.courseService.add(course);
        console.log(`코스 "${course.name}" 업로드 완료`);
      } catch (error) {
        console.error(`코스 "${course.name}" 업로드 실패:`, error);
      }
    }
    
    console.log('워케이션 코스 데이터 업로드 완료!');
  }

  /**
   * 섬생활 부동산 데이터 업로드
   */
  async uploadIslandLifeProperties(): Promise<void> {
    console.log('섬생활 부동산 데이터 업로드 시작...');
    
    for (const property of islandLifeProperties) {
      try {
        await this.propertyService.add(property);
        console.log(`부동산 "${property.name}" 업로드 완료`);
      } catch (error) {
        console.error(`부동산 "${property.name}" 업로드 실패:`, error);
      }
    }
    
    console.log('섬생활 부동산 데이터 업로드 완료!');
  }

  /**
   * 크리에이터 데이터 업로드
   */
  async uploadCreators(): Promise<void> {
    console.log('크리에이터 데이터 업로드 시작...');
    
    // 기존 데이터 확인
    const existingCreators = await this.creatorService.getAll();
    const existingNames = new Set(existingCreators.map(c => c.name));
    
    // 모든 카테고리의 크리에이터를 하나의 배열로 합치기
    const allCreators: Creator[] = [];
    
    Object.entries(creators).forEach(([category, creatorList]) => {
      creatorList.forEach(creator => {
        allCreators.push({
          ...creator,
          category
        });
      });
    });
    
    for (const creator of allCreators) {
      // 중복 체크
      if (existingNames.has(creator.name)) {
        console.log(`크리에이터 "${creator.name}" 이미 존재함 - 건너뜀`);
        continue;
      }
      
      try {
        await this.creatorService.add(creator);
        console.log(`크리에이터 "${creator.name}" 업로드 완료`);
      } catch (error) {
        console.error(`크리에이터 "${creator.name}" 업로드 실패:`, error);
      }
    }
    
    console.log('크리에이터 데이터 업로드 완료!');
  }

  /**
   * 모든 목업 데이터 업로드
   */
  async uploadAllData(): Promise<void> {
    console.log('=== 모든 목업 데이터 업로드 시작 ===');
    
    try {
      // 워케이션 관련 데이터는 주석처리
      // await this.uploadWorkcationCafes();
      // await this.uploadWorkcationAccommodations();
      // await this.uploadWorkcationCourses();
      
      // 섬살이 정보 (빈방) 및 크리에이터 정보만 업로드
      await this.uploadIslandLifeProperties();
      await this.uploadCreators();
      
      console.log('=== 모든 목업 데이터 업로드 완료! ===');
    } catch (error) {
      console.error('데이터 업로드 중 오류 발생:', error);
      throw error;
    }
  }

  /**
   * 특정 컬렉션의 데이터 확인
   */
  async checkCollectionData(collectionName: string): Promise<void> {
    console.log(`${collectionName} 컬렉션 데이터 확인 중...`);
    
    let service: BaseFirestoreService<any>;
    
    switch (collectionName) {
      case 'workcation-cafes':
        service = this.cafeService;
        break;
      case 'workcation-accommodations':
        service = this.accommodationService;
        break;
      case 'workcation-courses':
        service = this.courseService;
        break;
      case 'island-life-properties':
        service = this.propertyService;
        break;
      case 'creators-legacy':
        service = this.creatorService;
        break;
      default:
        console.error('알 수 없는 컬렉션 이름:', collectionName);
        return;
    }
    
    try {
      const data = await service.getAll();
      console.log(`${collectionName} 컬렉션 데이터:`, data);
      console.log(`총 ${data.length}개의 문서가 있습니다.`);
    } catch (error) {
      console.error(`${collectionName} 컬렉션 데이터 확인 실패:`, error);
    }
  }
}

export default DataUploadService;

// React에서 사용할 수 있는 훅
export const useDataUpload = () => {
  const uploadService = new DataUploadService();
  
  const uploadAllData = async () => {
    try {
      await uploadService.uploadAllData();
      return { success: true, message: '모든 목업 데이터가 성공적으로 업로드되었습니다!' };
    } catch (error: any) {
      console.error('데이터 업로드 실패:', error);
      return { success: false, message: `업로드 실패: ${error.message || '알 수 없는 오류'}` };
    }
  };

  const checkCollectionData = async (collectionName: string) => {
    try {
      await uploadService.checkCollectionData(collectionName);
      return { success: true, message: `${collectionName} 컬렉션 데이터 확인 완료` };
    } catch (error: any) {
      console.error('데이터 확인 실패:', error);
      return { success: false, message: `확인 실패: ${error.message || '알 수 없는 오류'}` };
    }
  };

  return { uploadAllData, checkCollectionData };
}; 