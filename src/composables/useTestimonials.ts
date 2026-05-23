import { ref } from 'vue';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query, writeBatch } from 'firebase/firestore';

export interface Testimonial {
  id?: string;
  quote: string;
  author: string;
  position: string;
  tags: string[];
  profile: string; // Cloudinary URL
  order?: number;
}

export function useTestimonials() {
  const testimonials = ref<Testimonial[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const colRef = collection(db, 'testimonials');

  const fetchTestimonials = async () => {
    loading.value = true;
    try {
      const q = query(colRef, orderBy('order', 'asc'));
      const snapshot = await getDocs(q).catch(() => getDocs(colRef));
      testimonials.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial));
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const addTestimonial = async (t: Omit<Testimonial, 'id'>) => {
    await addDoc(colRef, { ...t, order: testimonials.value.length });
    await fetchTestimonials();
  };

  const updateTestimonial = async (id: string, t: Partial<Testimonial>) => {
    const docRef = doc(db, 'testimonials', id);
    await updateDoc(docRef, t);
    await fetchTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    const docRef = doc(db, 'testimonials', id);
    await deleteDoc(docRef);
    await fetchTestimonials();
  };

  const reorderTestimonials = async (reordered: Testimonial[]) => {
    const batch = writeBatch(db);
    reordered.forEach((t, i) => {
      if (t.id) {
        batch.update(doc(db, 'testimonials', t.id), { order: i });
      }
    });
    await batch.commit();
    testimonials.value = reordered;
  };

  return { testimonials, loading, error, fetchTestimonials, addTestimonial, updateTestimonial, deleteTestimonial, reorderTestimonials };
}
