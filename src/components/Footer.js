import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12 py-6">
      <div className="container mx-auto px-6 text-center text-text-light">
        <p>&copy; {new Date().getFullYear()} Ganghwa Life. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
