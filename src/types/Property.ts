import { Timestamp, GeoPoint } from 'firebase/firestore';

export interface Property {
  id: string; // Firestore 문서 ID
  title: string; // 매물 제목
  propertyType: 'empty-house' | 'farm-hut' | 'land';
  dealType: 'sale' | 'rent';
  description: string;
  mainImage: string;
  images?: string[];
  tags?: string[];
  price: number; // 가격 (숫자, 만원 단위)
  area: {
    land: number; // 대지 면적 (평)
    building?: number; // 건물 면적 (평)
  };
  location: {
    address: string;
    geoPoint: GeoPoint;
  };
  contact: string;
  createdAt: Timestamp;
  authorId: string;
}
