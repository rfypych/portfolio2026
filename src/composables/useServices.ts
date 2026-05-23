import { ref } from 'vue';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query, writeBatch } from 'firebase/firestore';

export interface Service {
  id?: string;
  title: string;
  body: string;
  headings: string[];
  shape: string;
  order?: number;
}

export function useServices() {
  const services = ref<Service[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const colRef = collection(db, 'services');

  const fetchServices = async () => {
    loading.value = true;
    try {
      const q = query(colRef, orderBy('order', 'asc'));
      const snapshot = await getDocs(q).catch(() => getDocs(colRef));
      services.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    await addDoc(colRef, { ...service, order: services.value.length });
    await fetchServices();
  };

  const updateService = async (id: string, service: Partial<Service>) => {
    const docRef = doc(db, 'services', id);
    await updateDoc(docRef, service);
    await fetchServices();
  };

  const deleteService = async (id: string) => {
    const docRef = doc(db, 'services', id);
    await deleteDoc(docRef);
    await fetchServices();
  };

  const reorderServices = async (reordered: Service[]) => {
    const batch = writeBatch(db);
    reordered.forEach((s, i) => {
      if (s.id) {
        batch.update(doc(db, 'services', s.id), { order: i });
      }
    });
    await batch.commit();
    services.value = reordered;
  };

  return { services, loading, error, fetchServices, addService, updateService, deleteService, reorderServices };
}
