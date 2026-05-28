import { ref } from 'vue';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  writeBatch,
} from 'firebase/firestore';

export interface Certification {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  badgeUrl: string;
  writeupUrl?: string;
  writeupContent?: string;
  order?: number;
  type?: 'certificate' | 'course-certificate' | 'vd-certificate' | 'bounty' | 'hall-of-fame';
}

const COLLECTION = 'certifications';

export function useCertifications() {
  const certifications = ref<Certification[]>([]);
  const loading = ref(false);

  const fetchCertifications = async () => {
    loading.value = true;
    try {
      const q = query(collection(db, COLLECTION), orderBy('order', 'asc'));
      const snapshot = await getDocs(q).catch(() => getDocs(collection(db, COLLECTION)));
      certifications.value = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Certification[];
    } catch (err) {
      console.error('Failed to fetch certifications:', err);
    } finally {
      loading.value = false;
    }
  };

  const addCertification = async (data: Omit<Certification, 'id'>) => {
    await addDoc(collection(db, COLLECTION), {
      ...data,
      order: certifications.value.length,
    });
    await fetchCertifications();
  };

  const updateCertification = async (id: string, data: Partial<Certification>) => {
    await updateDoc(doc(db, COLLECTION, id), data);
    await fetchCertifications();
  };

  const deleteCertification = async (id: string) => {
    await deleteDoc(doc(db, COLLECTION, id));
    await fetchCertifications();
  };

  const reorderCertifications = async (reordered: Certification[]) => {
    const batch = writeBatch(db);
    reordered.forEach((c, i) => {
      if (c.id) {
        batch.update(doc(db, COLLECTION, c.id), { order: i });
      }
    });
    await batch.commit();
    certifications.value = reordered;
  };

  return {
    certifications,
    loading,
    fetchCertifications,
    addCertification,
    updateCertification,
    deleteCertification,
    reorderCertifications,
  };
}
