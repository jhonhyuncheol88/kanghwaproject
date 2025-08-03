import React from 'react';
import { contents } from '../data/mockData';
import GridItem from './GridItem';

const ContentGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {contents.map((item) => (
        <GridItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ContentGrid;
