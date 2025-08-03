// 브라우저 콘솔에서 실행할 수 있는 스크립트
// Firebase에 유우선생 creator 데이터를 추가합니다.

import { db } from './src/services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const addCreatorManually = async () => {
  try {
    const creatorsCollectionRef = collection(db, 'creators');
    
    const creatorData = {
      creatorName: '유우선생',
      handle: '@유우선생',
      platform: 'youtube',
      profileUrl: 'http://googleusercontent.com/youtube.com/channel/UCv-8l1k1p_g-p3d-i-24gLg',
      description: '자기효능감+그림+의식적인학습',
      thumbnailUrl: 'https://yt3.ggpht.com/ytc/AAUvwnh-v_8l1k1p_g-p3d-i-24gLg=s88-c-k-c0x00ffffff-no-rj',
      categories: ['교육', '그림', '자기계발'],
      createdAt: Timestamp.now(),
      authorId: null,
    };

    const docRef = await addDoc(creatorsCollectionRef, creatorData);
    console.log('유우선생 creator 데이터가 성공적으로 추가되었습니다!');
    console.log('문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류 발생:', error);
  }
};

// 실행
addCreatorManually(); 