import React, { useEffect, useState } from 'react';
import { creatorService } from '../services/creatorService.ts'; // creatorService 임포트
import CreatorCard from '../components/CreatorCard.tsx';
import { Creator } from '../types/Creator.ts';

const CreatorCategory = ({ title, list }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold mb-6 text-text-main">{title}</h2>
    {list.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map(creator => <CreatorCard key={creator.id} creator={creator} />)}
      </div>
    ) : (
      <p className="text-text-light">추천할 크리에이터를 준비 중입니다.</p>
    )}
  </section>
);

const Creators = () => {
  const [creatorsData, setCreatorsData] = useState({
    scenery: [],
    food: [],
    lifestyle: [],
    art: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const fetchedCreators = await creatorService.getAllCreators(); // creatorService 사용

        const categorized = {
          scenery: [],
          food: [],
          lifestyle: [],
          art: [],
        };

        fetchedCreators.forEach(creator => {
          creator.categories.forEach(category => {
            if (category === '풍경/여행') categorized.scenery.push(creator);
            else if (category === '맛집/카페') categorized.food.push(creator);
            else if (category === '귀촌/일상') categorized.lifestyle.push(creator);
            else if (category === '예술/공방') categorized.art.push(creator);
          });
        });

        setCreatorsData(categorized);
      } catch (err) {
        console.error("Error fetching creators: ", err);
        setError("크리에이터 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) {
    return <div className="text-center text-text-main text-xl mt-12">크리에이터 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-12">오류: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12">강화의 크리에이터</h1>
      <CreatorCategory title="풍경/여행" list={creatorsData.scenery} />
      <CreatorCategory title="맛집/카페" list={creatorsData.food} />
      <CreatorCategory title="귀촌/일상" list={creatorsData.lifestyle} />
      <CreatorCategory title="예술/공방" list={creatorsData.art} />
    </div>
  );
};

export default Creators;
