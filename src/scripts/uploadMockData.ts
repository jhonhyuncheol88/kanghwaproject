import DataUploadService from '../services/dataUploadService';

/**
 * 목업 데이터를 Firestore에 업로드하는 스크립트
 */
async function uploadMockData() {
  console.log('🚀 목업 데이터 업로드 시작...');
  
  const uploadService = new DataUploadService();
  
  try {
    // 모든 데이터 업로드
    await uploadService.uploadAllData();
    
    console.log('✅ 모든 목업 데이터 업로드 완료!');
    
    // 업로드된 데이터 확인
    console.log('\n📊 업로드된 데이터 확인:');
    await uploadService.checkCollectionData('workcation-cafes');
    await uploadService.checkCollectionData('island-life-properties');
    await uploadService.checkCollectionData('creators-legacy');
    
  } catch (error) {
    console.error('❌ 데이터 업로드 중 오류 발생:', error);
  }
}

// 스크립트 실행
if (require.main === module) {
  uploadMockData()
    .then(() => {
      console.log('🎉 스크립트 실행 완료!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 스크립트 실행 실패:', error);
      process.exit(1);
    });
}

export default uploadMockData; 