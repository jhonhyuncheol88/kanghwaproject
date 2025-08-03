import React from 'react';
import { motion } from 'framer-motion';
import Container from './Container';

const GridItem = ({ item }) => {
  const { title, mainImage, tags, type } = item;
  const typeText = type === 'property' ? '부동산' : '문화활동';
  const typeBgColor = type === 'property' ? 'bg-accent' : 'bg-secondary';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container className="cursor-pointer">
        <div className="relative">
          <img src={mainImage} alt={title} className="w-full h-40 sm:h-48 object-cover" />
          <span className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full ${typeBgColor}`}>
            {typeText}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 truncate">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="bg-gray-200 text-text-light text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default GridItem;
