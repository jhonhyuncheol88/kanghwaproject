import React, { useEffect, useState } from 'react';
import { propertyService } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../types/Property';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-8 text-center text-text-main">{title}</h2>
    {children}
  </section>
);

const IslandLife = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProperties = await propertyService.getAllProperties();
        setProperties(fetchedProperties);
      } catch (err) {
        console.error("Error fetching properties: ", err);
        setError("부동산 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div className="text-center text-text-main text-xl mt-12">부동산 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-12">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12">섬살이 정보</h1>
      
      <Section title="빈집/농막 찾기">
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(prop => <PropertyCard key={prop.id} property={prop} />)}
          </div>
        ) : (
          <p className="text-center text-text-light">등록된 부동산 정보가 없습니다.</p>
        )}
      </Section>
{/* 
      <Section title="대중교통 안내">
        <p className="text-center text-text-light">강화도의 구석구석을 누비는 버스 노선과 시간표를 곧 안내해 드릴게요.</p>
      </Section> */}
    </div>
  );
};

export default IslandLife;
