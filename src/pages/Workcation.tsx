import React, { useEffect, useState } from 'react';
import { activityService } from '../services/activityService'; // activityService 임포트
import CafeCard from '../components/CafeCard';
import { Activity } from '../types/Activity';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-8 text-center text-text-main">{title}</h2>
    {children}
  </section>
);

const Workcation = () => {
  const [cafes, setCafes] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // activityService를 사용하여 워케이션 카페 데이터 가져오기
        const fetchedCafes = await activityService.getActivitiesByCategoryAndTag('experience', '#워케이션카페');
        setCafes(fetchedCafes);
      } catch (err) {
        console.error("Error fetching workcation cafes: ", err);
        setError("카페 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCafes();
  }, []);

  if (loading) {
    return <div className="text-center text-text-main text-xl mt-12">카페 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-12">오류: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12">강화 워케이션</h1>
      
      <Section title="일하기 좋은 카페">
        {cafes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cafes.map(cafe => <CafeCard key={cafe.id} cafe={{
              title: cafe.title,
              description: cafe.description,
              mainImage: cafe.mainImage,
              tags: cafe.tags || []
            }} />)}
          </div>
        ) : (
          <p className="text-center text-text-light">현재 등록된 카페가 없습니다.</p>
        )}
      </Section>

      <Section title="워케이션 숙소">
        <p className="text-center text-text-light">편안한 휴식과 일이 공존하는 숙소들을 곧 소개해 드릴게요.</p>
      </Section>

      <Section title="추천 워케이션 코스">
        <p className="text-center text-text-light">일과 여행의 균형을 맞춘 추천 코스를 준비 중입니다.</p>
      </Section>
    </div>
  );
};

export default Workcation;
