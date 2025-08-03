import React from 'react';
import { properties } from '../data/islandLifeData';
import PropertyCard from '../components/PropertyCard';

const Section = ({ title, children }) => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-8 text-center text-text-main">{title}</h2>
    {children}
  </section>
);

const IslandLife = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12">섬살이 정보</h1>
      
      <Section title="빈집/농막 찾기">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(prop => <PropertyCard key={prop.id} property={prop} />)}
        </div>
      </Section>

      <Section title="대중교통 안내">
        <p className="text-center text-text-light">강화도의 구석구석을 누비는 버스 노선과 시간표를 곧 안내해 드릴게요.</p>
      </Section>
    </div>
  );
};

export default IslandLife;
