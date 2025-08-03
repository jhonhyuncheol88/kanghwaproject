import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next) // react-i18next를 초기화합니다.
  .use(HttpApi) // HTTP 백엔드를 사용하여 번역 파일을 로드합니다.
  .init({
    lng: 'ko', // 기본 언어
    fallbackLng: 'ko', // 번역이 없을 경우 사용할 언어
    supportedLngs: ['ko', 'en'],
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // 번역 파일 경로
    },
    interpolation: {
      escapeValue: false, // React는 이미 XSS 방어 기능이 있으므로 false로 설정
    },
    debug: process.env.NODE_ENV === 'development', // 개발 모드에서만 디버그 로그 출력
  });

export default i18n;
