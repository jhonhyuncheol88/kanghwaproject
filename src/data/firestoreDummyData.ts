import { db } from '../services/firebase';
import { collection, addDoc, Timestamp, GeoPoint } from 'firebase/firestore';

/**
 * 활동(Activity) 더미 데이터를 Firestore에 추가합니다.
 */
export const addActivityDummyData = async () => {
  const activitiesCollectionRef = collection(db, 'activities');

  const dummyActivities = [
    {
      title: '강화도 가을 국화 축제',
      category: 'festival',
      description: '매년 가을, 강화도에서 열리는 아름다운 국화 축제입니다. 다양한 품종의 국화를 감상하고, 지역 특산물도 맛볼 수 있습니다.',
      mainImage: 'https://source.unsplash.com/random/800x600?chrysanthemum,festival',
      images: ['https://source.unsplash.com/random/800x600?chrysanthemum,festival,1', 'https://source.unsplash.com/random/800x600?chrysanthemum,festival,2'],
      tags: ['#축제', '#가을', '#국화', '#가족'],
      dateInfo: {
        type: 'period',
        startDate: Timestamp.fromDate(new Date('2025-10-01')),
        endDate: Timestamp.fromDate(new Date('2025-10-31')),
      },
      location: {
        name: '강화 고인돌 공원',
        address: '인천 강화군 하점면 부근리 2317',
        geoPoint: new GeoPoint(37.7667, 126.4000),
      },
      organizer: '강화군청',
      contact: '032-930-0000',
      createdAt: Timestamp.now(),
      authorId: 'admin123',
    },
    {
      title: '소창 체험 공방 원데이 클래스',
      category: 'experience',
      description: '강화도의 특산품인 소창을 직접 만들어보는 시간입니다. 아이들과 함께 특별한 추억을 만들어보세요.',
      mainImage: 'https://source.unsplash.com/random/800x600?craft,workshop',
      images: ['https://source.unsplash.com/random/800x600?craft,workshop,1'],
      tags: ['#원데이클래스', '#소창체험', '#가족과함께'],
      dateInfo: {
        type: 'specific',
        startDate: Timestamp.fromDate(new Date('2025-09-15T14:00:00')),
      },
      location: {
        name: '강화 소창 체험 공방',
        address: '인천 강화군 강화읍 신문리 123-45',
        geoPoint: new GeoPoint(37.7480, 126.4830),
      },
      organizer: '강화 소창길',
      contact: '032-934-5678',
      createdAt: Timestamp.now(),
      authorId: 'admin123',
    },
  ];

  for (const data of dummyActivities) {
    await addDoc(activitiesCollectionRef, data);
  }
  console.log('Activity dummy data added successfully!');
};

/**
 * 부동산(Property) 더미 데이터를 Firestore에 추가합니다.
 */
export const addPropertyDummyData = async () => {
  const propertiesCollectionRef = collection(db, 'properties');

  const dummyProperties = [
    {
      title: '강화읍 언덕 위 작은 빈집',
      propertyType: 'empty-house',
      dealType: 'sale',
      description: '강화읍의 한적한 언덕에 위치한 작은 집입니다. 리모델링을 통해 꿈에 그리던 공간으로 재탄생할 수 있는 잠재력을 가지고 있습니다.',
      mainImage: 'https://source.unsplash.com/random/800x600?house,nature',
      images: ['https://source.unsplash.com/random/800x600?house,nature,1', 'https://source.unsplash.com/random/800x600?house,nature,2'],
      tags: ['#빈집', '#리모델링필수', '#언덕뷰'],
      price: 5000, // 만원 단위
      area: {
        land: 50,
      },
      location: {
        address: '인천 강화군 강화읍 관청리 123',
        geoPoint: new GeoPoint(37.7450, 126.4800),
      },
      contact: '010-1234-5678',
      createdAt: Timestamp.now(),
      authorId: 'admin123',
    },
    {
      title: '작은 텃밭이 있는 농막',
      propertyType: 'farm-hut',
      dealType: 'rent',
      description: '주말 농장을 꿈꾸는 분들을 위한 아담한 농막입니다. 바로 사용할 수 있도록 기본 시설이 갖춰져 있습니다.',
      mainImage: 'https://source.unsplash.com/random/800x600?farm,hut',
      images: ['https://source.unsplash.com/random/800x600?farm,hut,1'],
      tags: ['#농막', '#주말농장', '#즉시입주'],
      price: 20, // 만원 단위 (월세)
      area: {
        land: 50,
        building: 6,
      },
      location: {
        address: '인천 강화군 양도면 건평리 678',
        geoPoint: new GeoPoint(37.6000, 126.4500),
      },
      contact: '010-9876-5432',
      createdAt: Timestamp.now(),
      authorId: 'admin123',
    },
  ];

  for (const data of dummyProperties) {
    await addDoc(propertiesCollectionRef, data);
  }
  console.log('Property dummy data added successfully!');
};

/**
 * 크리에이터(Creator) 더미 데이터를 Firestore에 추가합니다.
 */
export const addCreatorDummyData = async () => {
  const creatorsCollectionRef = collection(db, 'creators');

  const dummyCreators = [
    {
      creatorName: '강화바이브',
      handle: '@ganghwa.vibe',
      platform: 'instagram',
      profileUrl: 'https://www.instagram.com/ganghwa.vibe',
      description: '감성적인 사진으로 강화도의 숨은 명소를 소개합니다.',
      thumbnailUrl: 'https://source.unsplash.com/random/100x100?profile,person,1',
      categories: ['풍경/여행'],
      createdAt: Timestamp.now(),
      authorId: 'admin123',
    },
    {
      creatorName: '강화댁 김씨',
      handle: '강화댁 김씨',
      platform: 'youtube',
      profileUrl: 'https://www.youtube.com/channel/UC-example',
      description: '좌충우돌 유쾌한 강화도 귀촌 일상 브이로그',
      thumbnailUrl: 'https://source.unsplash.com/random/100x100?profile,woman,1',
      categories: ['귀촌/일상'],
      createdAt: Timestamp.now(),
      authorId: 'admin123',
    },
    {
      creatorName: '강화 맛집 탐험대',
      handle: '@ganghwa.foodie',
      platform: 'instagram',
      profileUrl: 'https://www.instagram.com/ganghwa.foodie',
      description: '강화도의 진짜 맛집만 찾아다니는 미식가 그룹',
      thumbnailUrl: 'https://source.unsplash.com/random/100x100?profile,group,1',
      categories: ['맛집/카페'],
      createdAt: Timestamp.now(),
      authorId: 'admin123',
    },
    {
      creatorName: '유우선생',
      handle: '@유우선생',
      platform: 'youtube',
      profileUrl: 'http://googleusercontent.com/youtube.com/channel/UCv-8l1k1p_g-p3d-i-24gLg',
      description: '자기효능감+그림+의식적인학습',
      thumbnailUrl: 'https://yt3.ggpht.com/ytc/AAUvwnh-v_8l1k1p_g-p3d-i-24gLg=s88-c-k-c0x00ffffff-no-rj',
      categories: ['교육', '그림', '자기계발'],
      createdAt: Timestamp.now(),
      authorId: null,
    },
  ];

  for (const data of dummyCreators) {
    await addDoc(creatorsCollectionRef, data);
  }
  console.log('Creator dummy data added successfully!');
};

// 모든 더미 데이터를 추가하는 함수
export const addAllDummyData = async () => {
  console.log('Adding all dummy data...');
  await addActivityDummyData();
  await addPropertyDummyData();
  await addCreatorDummyData();
  console.log('All dummy data added!');
};
