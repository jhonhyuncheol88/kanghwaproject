import React from 'react';
import { motion } from 'framer-motion';
import Container from './Container';
import { Property } from '../types/Property';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { title, description, mainImage, price, area, tags } = property;

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
          <div className="flex justify-between items-center mb-2 text-primary font-semibold">
            <span>{price ? `${price}만원` : '가격 문의'}</span>
            <span>{area?.land ? `대지 ${area.land}평` : '면적 문의'}</span>
          </div>
          <p className="text-text-light mb-4 h-20 overflow-hidden">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags && tags.map((tag) => (
              <span key={tag} className="bg-gray-200 text-text-light text-xs font-semibold px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default PropertyCard; 