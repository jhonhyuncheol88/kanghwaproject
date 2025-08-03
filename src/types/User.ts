import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string; // Firebase Authentication UID
  email: string;
  displayName: string; // 닉네임
  photoURL?: string; // 프로필 이미지 URL
  bio?: string; // 자기소개
  interests?: string[]; // 관심분야
  createdAt: Timestamp;
}
