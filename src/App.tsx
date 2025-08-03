import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
// import Workcation from './pages/Workcation';
import IslandLife from './pages/IslandLife';
// import Culture from './pages/Culture';
import Creators from './pages/Creators';
import MockDataLoader from './services/mockDataLoader';
import './utils/devTools'; // 개발자 도구 유틸리티 로드

function App() {
  useEffect(() => {
    // 앱 시작 시 목업 데이터 자동 초기화 (캐시 적용)
    const initializeData = async () => {
      try {
        const dataLoader = MockDataLoader.getInstance();
        await dataLoader.initializeMockData();
        
        // 캐시 상태 로그 (개발자 도구에서 확인 가능)
        const cacheStatus = dataLoader.getCacheStatus();
        console.log('📊 캐시 상태:', cacheStatus);
        
        // 전역 객체에 데이터 로더 노출 (개발자 도구에서 접근 가능)
        (window as any).mockDataLoader = dataLoader;
        console.log('🔧 개발자 도구에서 window.mockDataLoader로 접근 가능');
        
      } catch (error) {
        console.error('목업 데이터 초기화 실패:', error);
      }
    };

    initializeData();
  }, []);

  return (
    <Router>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 pt-24 sm:pt-28">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/workcation" element={<Workcation />} /> */}
            <Route path="/island-life" element={<IslandLife />} />
            {/* <Route path="/culture" element={<Culture />} /> */}
            <Route path="/creators" element={<Creators />} />
         
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
