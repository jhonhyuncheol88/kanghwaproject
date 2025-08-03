// 내부 더미 데이터 - Firebase 데이터로 대체됨
// 이 파일은 더 이상 사용되지 않습니다.

interface ContentItem {
  id: string;
  type: 'property' | 'activity';
  title: string;
  description: string;
  mainImage: string;
  tags: string[];
  price?: string;
  area?: string;
  date?: string;
  organizer?: string;
}

// Firebase 데이터를 사용하므로 내부 더미 데이터는 비활성화
export const contents: ContentItem[] = [];

/*
export const contents: ContentItem[] = [
  {
    id: 'p1',
    type: 'property', // 'property' or 'activity'
    title: '강화읍 언덕 위 작은 빈집',
    description: '강화읍의 한적한 언덕에 위치한 작은 집입니다. 리모델링을 통해 꿈에 그리던 공간으로 재탄생할 수 있는 잠재력을 가지고 있습니다.',
    mainImage: 'https://source.unsplash.com/random/800x600?house,nature',
    tags: ['#빈집', '#리모델링필수', '#언덕뷰'],
    price: '5,000만원',
    area: '대지 50평',
  },
  {
    id: 'a1',
    type: 'activity',
    title: '소창 체험 공방 원데이 클래스',
    description: '강화도의 특산품인 소창을 직접 만들어보는 시간입니다. 아이들과 함께 특별한 추억을 만들어보세요.',
    mainImage: 'https://source.unsplash.com/random/800x600?craft,workshop',
    tags: ['#원데이클래스', '#소창체험', '#가족과함께'],
    date: '매주 토요일 오후 2시',
    organizer: '강화 소창길',
  },
  {
    id: 'p2',
    type: 'property',
    title: '해안가 근처 밭 딸린 집',
    description: '넓은 밭이 있어 주말 농장으로 활용하기 좋은 집입니다. 바다가 가까워 평화로운 전원 생활을 즐길 수 있습니다.',
    mainImage: 'https://source.unsplash.com/random/800x600?farmhouse,sea',
    tags: ['#주말농장', '#텃밭', '#해안가'],
    price: '1억 2,000만원',
    area: '대지 120평',
  },
  {
    id: 'a2',
    type: 'activity',
    title: '강화도 역사 탐방 걷기 대회',
    description: '강화도의 유구한 역사를 따라 걷는 뜻깊은 행사입니다. 건강도 챙기고 역사도 배우는 시간을 가져보세요.',
    mainImage: 'https://source.unsplash.com/random/800x600?history,hiking',
    tags: ['#역사탐방', '#걷기대회', '#문화유산'],
    date: '매월 마지막 주 일요일',
    organizer: '강화군 문화관광과',
  },
];
*/
