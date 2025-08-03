import React from 'react';
import { motion } from 'framer-motion';
import Container from './Container.tsx';
import { Activity } from '../types/Activity.ts';

const CafeCard = ({ cafe }) => {
  const { title, description, mainImage, tags } = cafe;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <img src={mainImage} alt={title} className="w-full h-48 object-cover" />
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2 text-text-main">{title}</h3>
          <p className="text-text-light mb-4 h-20 overflow-hidden">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags && tags.map((tag) => (
              <span key={tag} className="bg-secondary text-text-main text-xs font-semibold px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default CafeCard;
