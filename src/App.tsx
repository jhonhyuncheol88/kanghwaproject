import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import Workcation from './pages/Workcation.tsx';
import IslandLife from './pages/IslandLife.tsx';
import Culture from './pages/Culture.tsx';
import Creators from './pages/Creators.tsx';
import { addAllDummyData } from './data/firestoreDummyData.ts'; // 더미 데이터 임포트

function App() {
  useEffect(() => {
    // 개발 환경에서만 더미 데이터 추가 (한 번 실행 후 주석 처리 권장)
    // addAllDummyData();
  }, []);

  return (
    <Router>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 pt-24 sm:pt-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workcation" element={<Workcation />} />
            <Route path="/island-life" element={<IslandLife />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/creators" element={<Creators />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
