import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-text-light hover:text-primary transition-colors duration-300 font-semibold pb-1 ${isActive ? 'border-b-2 border-primary text-primary' : ''}`
    }
  >
    {children}
  </NavLink>
);

const Header = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-primary">강화섬살이</Link>
        <nav className="hidden md:flex items-center space-x-6">
          {/* <NavItem to="/workcation">워케이션</NavItem> */}
          <NavItem to="/island-life">섬살이 정보</NavItem>
          {/* <NavItem to="/culture">섬의 문화</NavItem> */}
          <NavItem to="/creators">강화의 크리에이터</NavItem>
        </nav>
        <div className="flex items-center">
          {/* 번역 버튼 주석처리 */}
          {/* <Button onClick={toggleLanguage} variant="secondary" size="sm">
            {i18n.language === 'ko' ? 'EN' : 'KO'}
          </Button> */}
          {/* 모바일 메뉴 버튼 (추후 구현) */}
        </div>
      </div>
    </header>
  );
};

export default Header;
