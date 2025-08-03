import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Workcation from './pages/Workcation';
import IslandLife from './pages/IslandLife';
import Culture from './pages/Culture';
import Creators from './pages/Creators';

function App() {
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
