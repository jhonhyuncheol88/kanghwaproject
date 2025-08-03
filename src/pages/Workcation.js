import React from 'react';
import { cafes } from '../data/workcationData';
import CafeCard from '../components/CafeCard';

const Section = ({ title, children }) => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-8 text-center text-text-main">{title}</h2>
    {children}
  </section>
);

const Workcation = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12">강화 워케이션</h1>
      
      <Section title="일하기 좋은 카페">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cafes.map(cafe => <CafeCard key={cafe.id} cafe={cafe} />)}
        </div>
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
