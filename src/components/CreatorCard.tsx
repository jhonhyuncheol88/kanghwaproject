import React from 'react';
import { motion } from 'framer-motion';
import Container from './Container';
import { Creator } from '../types/Creator';

interface CreatorCardProps {
  creator: Creator;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container className="cursor-pointer">
        <div className="relative">
          <img src={creator.thumbnailUrl} alt={creator.creatorName} className="w-full h-40 sm:h-48 object-cover" />
          <span className="absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full bg-accent">
            크리에이터
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 truncate">{creator.creatorName}</h3>
          <p className="text-sm text-text-light mb-3">{creator.description}</p>
          <div className="flex flex-wrap gap-2">
            {creator.categories?.map((category: string) => (
              <span key={category} className="bg-gray-200 text-text-light text-xs px-2 py-1 rounded-full">
                {category}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default CreatorCard;
