import React, { useEffect, useState } from 'react';
import GridItem from './GridItem';
// import { activityService } from '../services/activityService'; // 활동 데이터는 주석처리
import { propertyService } from '../services/propertyService';

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

const ContentGrid = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        // 현재는 부동산 데이터만 가져오기 (활동 데이터는 주석처리)
        const properties = await propertyService.getAllProperties();

        // 부동산 데이터를 ContentItem 형태로 변환
        const propertyItems: ContentItem[] = properties.map(property => ({
          id: property.id,
          type: 'property' as const,
          title: property.title,
          description: property.description,
          mainImage: property.mainImage,
          tags: property.tags || [],
          price: property.price ? `${property.price}만원` : undefined,
          area: property.area?.land ? `대지 ${property.area.land}평` : undefined
        }));

        setContents(propertyItems);
      } catch (error) {
        console.error('Error fetching contents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  if (loading) {
    return <div className="text-center text-text-main text-xl mt-12">콘텐츠를 불러오는 중...</div>;
  }

  if (contents.length === 0) {
    return <div className="text-center text-text-light text-xl mt-12">등록된 콘텐츠가 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {contents.map((item) => (
        <GridItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ContentGrid;
