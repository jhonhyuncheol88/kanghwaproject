import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: 이 부분을 본인의 Firebase 프로젝트 구성 정보로 교체하세요.
// Firebase 콘솔 > 프로젝트 설정 > 일반 > 내 앱
const firebaseConfig = {
  apiKey: "AIzaSyCWJH_5NswHkk9cHg6BleDcTFlbJjWZlMs",
  authDomain: "kanghwaproject-87cf2.firebaseapp.com",
  projectId: "kanghwaproject-87cf2",
  storageBucket: "kanghwaproject-87cf2.firebasestorage.app",
  messagingSenderId: "778488699028",
  appId: "1:778488699028:web:eafc6e626f06cf0440bc81",
  measurementId: "G-RJEHPDW9VV"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 내보내기
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
