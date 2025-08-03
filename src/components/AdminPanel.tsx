import React, { useState } from 'react';
import { propertyService } from '../services/propertyService';
import { creatorService } from '../services/creatorService';
import { Timestamp, GeoPoint } from 'firebase/firestore';

interface AdminPanelProps {
  onClose: () => void;
}

interface CSVData {
  type: 'property' | 'creator';
  data: any[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [step, setStep] = useState<'password' | 'upload' | 'confirm' | 'processing'>('password');
  const [password, setPassword] = useState('');
  const [csvData, setCsvData] = useState<CSVData | null>(null);
  const [error, setError] = useState<string>('');

  const ADMIN_PASSWORD = '4324'; // 실제 운영 시에는 환경변수로 관리

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setStep('upload');
      setError('');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  const parseCSV = (csvText: string): CSVData => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    });

    // 첫 번째 행의 데이터로 타입 판단
    const firstRow = data[0];
    if (firstRow.title && firstRow.description) {
      return { type: 'property', data };
    } else if (firstRow.creatorName || firstRow.name) {
      return { type: 'creator', data };
    } else {
      throw new Error('CSV 형식을 확인할 수 없습니다.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvText = event.target?.result as string;
        const parsedData = parseCSV(csvText);
        setCsvData(parsedData);
        setStep('confirm');
        setError('');
      } catch (err) {
        setError('CSV 파일을 읽는 중 오류가 발생했습니다: ' + err);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmUpload = async () => {
    if (!csvData) return;

    setStep('processing');
    setError('');

          try {
        if (csvData.type === 'property') {
          for (const item of csvData.data) {
            await propertyService.add({
              id: '', // Firestore에서 자동 생성
              title: item.title,
              description: item.description,
              price: parseInt(item.price) || 0,
              area: { land: parseInt(item.area) || 0 },
              mainImage: item.mainImage || item.image,
              tags: item.tags ? item.tags.split(',').map((tag: string) => tag.trim()) : [],
              propertyType: 'empty-house',
              dealType: 'sale',
              location: {
                address: item.address || '강화도',
                geoPoint: new GeoPoint(37.7480, 126.4830)
              },
              contact: item.contact || '010-0000-0000',
              createdAt: Timestamp.now(),
              authorId: 'admin'
            });
          }
        } else if (csvData.type === 'creator') {
          for (const item of csvData.data) {
            await creatorService.add({
              id: '', // Firestore에서 자동 생성
              creatorName: item.creatorName || item.name,
              description: item.description,
              thumbnailUrl: item.thumbnailUrl || item.image,
              profileUrl: item.profileUrl || item.link,
              categories: item.categories ? item.categories.split(',').map((cat: string) => cat.trim()) : [],
              handle: item.handle || item.creatorName || item.name,
              platform: item.platform || 'instagram',
              createdAt: Timestamp.now(),
              authorId: 'admin'
            });
          }
        }

      alert(`${csvData.data.length}개의 ${csvData.type === 'property' ? '부동산' : '크리에이터'} 데이터가 성공적으로 추가되었습니다!`);
      onClose();
    } catch (err) {
      setError('데이터 업로드 중 오류가 발생했습니다: ' + err);
      setStep('confirm');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">관리자 패널</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {step === 'password' && (
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">관리자 비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="****"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              확인
            </button>
          </form>
        )}

        {step === 'upload' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">CSV 파일 업로드</h3>
            <p className="text-sm text-gray-600 mb-4">
              CSV 파일을 업로드하여 데이터를 추가하세요.
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="w-full p-2 border rounded"
            />
            <div className="mt-4 text-sm text-gray-500">
              <p><strong>부동산 CSV 형식:</strong></p>
              <p>title,description,price,area,mainImage,tags</p>
              <p className="mt-2"><strong>크리에이터 CSV 형식:</strong></p>
              <p>creatorName,description,thumbnailUrl,profileUrl,categories</p>
              <p className="mt-2 text-xs text-gray-400">
                💡 비밀번호는 관리자에게 문의하세요
              </p>
            </div>
          </div>
        )}

        {step === 'confirm' && csvData && (
          <div>
            <h3 className="text-lg font-semibold mb-4">데이터 확인</h3>
            <div className="mb-4">
              <p><strong>타입:</strong> {csvData.type === 'property' ? '부동산' : '크리에이터'}</p>
              <p><strong>데이터 개수:</strong> {csvData.data.length}개</p>
            </div>
            <div className="max-h-40 overflow-y-auto mb-4">
              <h4 className="font-medium mb-2">미리보기:</h4>
              {csvData.data.slice(0, 3).map((item, index) => (
                <div key={index} className="text-sm bg-gray-50 p-2 rounded mb-2">
                  {csvData.type === 'property' ? (
                    <p><strong>{item.title}</strong> - {item.description?.substring(0, 50)}...</p>
                  ) : (
                    <p><strong>{item.creatorName || item.name}</strong> - {item.description?.substring(0, 50)}...</p>
                  )}
                </div>
              ))}
              {csvData.data.length > 3 && (
                <p className="text-sm text-gray-500">... 외 {csvData.data.length - 3}개</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStep('upload')}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                다시 선택
              </button>
              <button
                onClick={handleConfirmUpload}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                데이터 추가
              </button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>데이터를 업로드하는 중...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 