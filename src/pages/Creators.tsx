import React, { useEffect, useState } from 'react';
import { creatorService } from '../services/creatorService';
import CreatorCard from '../components/CreatorCard';
import { Creator } from '../types/Creator';

interface CreatorGridProps {
  creators: Creator[];
  loading: boolean;
  error: string | null;
}

const CreatorGrid: React.FC<CreatorGridProps> = ({ creators, loading, error }) => {
  if (loading) {
    return <div className="text-center text-text-main text-xl mt-12">크리에이터 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-12">오류: {error}</div>;
  }

  if (creators.length === 0) {
    return <div className="text-center text-text-light text-xl mt-12">등록된 크리에이터가 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {creators.map((creator: Creator) => (
        <CreatorCard key={creator.id} creator={creator} />
      ))}
    </div>
  );
};

const Creators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const fetchedCreators = await creatorService.getAllCreators();
        setCreators(fetchedCreators);
      } catch (err) {
        console.error("Error fetching creators: ", err);
        setError("크리에이터 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  return (
    <>
      <section className="text-center my-8 sm:my-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-hero font-extrabold text-text-main">
          강화의 크리에이터
        </h1>
      </section>
      <CreatorGrid creators={creators} loading={loading} error={error} />
    </>
  );
};

export default Creators;
