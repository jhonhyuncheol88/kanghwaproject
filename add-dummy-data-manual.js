// 브라우저 콘솔에서 실행할 수 있는 스크립트
// Firebase에 모든 더미 데이터를 추가합니다.

import { addAllDummyData } from './src/data/firestoreDummyData';

const addDummyDataManually = async () => {
  try {
    console.log('더미 데이터 추가를 시작합니다...');
    await addAllDummyData();
    console.log('모든 더미 데이터가 성공적으로 추가되었습니다!');
  } catch (error) {
    console.error('더미 데이터 추가 중 오류 발생:', error);
  }
};

// 실행
addDummyDataManually(); 