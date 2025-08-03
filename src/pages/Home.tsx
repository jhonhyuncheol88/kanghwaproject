import React from 'react';
import ContentGrid from '../components/ContentGrid.tsx';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="text-center my-8 sm:my-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-hero font-extrabold text-text-main">
          {t('slogan')}
        </h2>
      </section>
      <ContentGrid />
    </>
  );
};

export default Home;
