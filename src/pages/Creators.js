import React from 'react';
import { creators } from '../data/creatorsData';
import CreatorCard from '../components/CreatorCard';

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
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12">강화의 크리에이터</h1>
      <CreatorCategory title="풍경/여행" list={creators.scenery} />
      <CreatorCategory title="맛집/카페" list={creators.food} />
      <CreatorCategory title="귀촌/일상" list={creators.lifestyle} />
      <CreatorCategory title="예술/공방" list={creators.art} />
    </div>
  );
};

export default Creators;
