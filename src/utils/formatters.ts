import i18n from '../services/i18n';

/**
 * 숫자를 1,000,000과 같은 형식으로 포맷합니다.
 * @param {number} number - 포맷할 숫자
 * @returns {string} 포맷된 문자열
 */
export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('ko-KR').format(number);
};

/**
 * 날짜 객체를 현지화된 날짜 문자열로 포맷합니다.
 * @param {Date} date - 포맷할 날짜 객체
 * @returns {string} 포맷된 날짜 문자열
 */
export const formatDate = (date: Date) => {
  const lang = i18n.language; // 현재 설정된 언어 가져오기
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
