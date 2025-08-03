import { Timestamp, GeoPoint } from 'firebase/firestore';

export interface Activity {
  id: string; // Firestore 문서 ID
  title: string; // 활동 제목
  category: 'exhibition' | 'performance' | 'festival' | 'experience';
  description: string; // 상세 설명 (HTML 또는 Markdown)
  mainImage: string; // 대표 이미지 URL (Firebase Storage)
  images?: string[]; // 추가 이미지 URL 목록
  tags?: string[]; // 관련 태그 (예: ['#전시', '#가족체험'])
  dateInfo: {
    type: 'period' | 'specific';
    startDate: Timestamp;
    endDate?: Timestamp;
  };
  location: {
    name: string; // 장소 이름
    address: string; // 주소
    geoPoint: GeoPoint; // 지도 표시를 위한 위경도
  };
  organizer: string; // 주최자
  contact?: string; // 문의처
  createdAt: Timestamp; // 등록일
  authorId: string; // 정보 등록자 ID (관리자 또는 제보자)
}
