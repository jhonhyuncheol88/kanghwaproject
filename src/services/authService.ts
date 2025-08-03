import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

/**
 * 이메일과 비밀번호로 로그인합니다.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * 이메일과 비밀번호로 회원가입합니다.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export const register = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * 현재 사용자를 로그아웃합니다.
 * @returns {Promise<void>}
 */
export const logout = async () => {
  return await signOut(auth);
};

/**
 * 사용자 인증 상태 변화를 구독합니다.
 * @param {(user: User | null) => void} callback - 사용자 객체 또는 null을 받는 콜백 함수
 * @returns {firebase.Unsubscribe}
 */
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * 현재 로그인된 사용자 정보를 가져옵니다.
 * @returns {User | null}
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

// authService 객체로 모든 인증 관련 함수들을 export
export const authService = {
  login,
  register,
  logout,
  subscribeToAuthChanges,
  getCurrentUser,
};
