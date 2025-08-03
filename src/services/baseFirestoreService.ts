import { db } from './firebase';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where, CollectionReference, DocumentData } from 'firebase/firestore';

/**
 * Firestore 컬렉션에 대한 기본 CRUD 작업을 제공하는 추상 클래스입니다.
 * 각 도메인 서비스는 이 클래스를 상속받아 사용합니다.
 */
class BaseFirestoreService<T extends DocumentData> {
  protected collectionRef: CollectionReference<T>;

  constructor(collectionName: string) {
    this.collectionRef = collection(db, collectionName) as CollectionReference<T>;
  }

  /**
   * 모든 문서를 가져옵니다.
   * @returns {Promise<(T & { id: string })[]>}
   */
  async getAll(): Promise<(T & { id: string })[]> {
    const querySnapshot = await getDocs(this.collectionRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  /**
   * ID로 단일 문서를 가져옵니다.
   * @param {string} id
   * @returns {Promise<(T & { id: string }) | undefined>}
   */
  async getById(id: string): Promise<(T & { id: string }) | undefined> {
    const docRef = doc(this.collectionRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return undefined;
    }
  }

  /**
   * 새 문서를 추가합니다.
   * @param {T} data
   * @returns {Promise<string>} 새로 생성된 문서의 ID
   */
  async add(data: T): Promise<string> {
    const docRef = await addDoc(this.collectionRef, data);
    return docRef.id;
  }

  /**
   * 문서를 업데이트합니다.
   * @param {string} id
   * @param {Partial<T>} data
   * @returns {Promise<void>}
   */
  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    await updateDoc(docRef, data as any);
  }

  /**
   * 문서를 삭제합니다.
   * @param {string} id
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionRef.path, id);
    await deleteDoc(docRef);
  }

  /**
   * 쿼리를 실행하여 문서를 가져옵니다.
   * @param {[string, any, any][]} conditions - [필드, 연산자, 값] 형태의 배열
   * @returns {Promise<(T & { id: string })[]>}
   */
  async query(conditions: [string, any, any][]): Promise<(T & { id: string })[]> {
    let q: any = this.collectionRef;
    conditions.forEach(cond => {
      q = query(q, where(cond[0], cond[1], cond[2]));
    });
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as T)
    }));
  }
}

export default BaseFirestoreService;
