import React from 'react';
import { motion } from 'framer-motion';

const CreatorCard = ({ creator }) => {
  return (
    <motion.a
      href={creator.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <img src={creator.thumbnailUrl} alt={creator.creatorName} className="w-16 h-16 rounded-full object-cover mr-4" />
      <div>
        <h3 className="font-bold text-text-main">{creator.creatorName}</h3>
        <p className="text-sm text-text-light">{creator.description}</p>
      </div>
    </motion.a>
  );
};

export default CreatorCard;
