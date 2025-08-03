import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind CSS를 포함합니다.
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.ts';
import './services/i18n.ts'; // i18next 초기화

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

