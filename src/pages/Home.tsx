import React, { useState } from 'react';
import ContentGrid from '../components/ContentGrid';
import { useTranslation } from 'react-i18next';
import AdminPanel from '../components/AdminPanel';

const Home = () => {
  const { t } = useTranslation();
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <>
      <section className="text-center my-8 sm:my-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-hero font-extrabold text-text-main">
          {t('slogan')}
        </h2>
      </section>
      <ContentGrid />
      
      {/* 관리자 버튼 */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setShowAdminPanel(true)}
          className="bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        >
          관리자
        </button>
      </div>

      {/* 관리자 패널 */}
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </>
  );
};

export default Home;
