import { ref } from 'vue';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query, writeBatch } from 'firebase/firestore';

export interface Project {
  id?: string;
  name: string;
  category: string;
  tags: string[];
  videoSrc: string;
  imageBg: string;
  url: string;
  year: string;
  order?: number;
}

export function useProjects() {
  const projects = ref<Project[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const colRef = collection(db, 'projects');

  const fetchProjects = async () => {
    loading.value = true;
    try {
      const q = query(colRef, orderBy('order', 'asc'));
      const snapshot = await getDocs(q).catch(() => getDocs(colRef));
      projects.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    await addDoc(colRef, { ...project, order: projects.value.length });
    await fetchProjects();
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    const docRef = doc(db, 'projects', id);
    await updateDoc(docRef, project);
    await fetchProjects();
  };

  const deleteProject = async (id: string) => {
    const docRef = doc(db, 'projects', id);
    await deleteDoc(docRef);
    await fetchProjects();
  };

  const reorderProjects = async (reordered: Project[]) => {
    const batch = writeBatch(db);
    reordered.forEach((p, i) => {
      if (p.id) {
        batch.update(doc(db, 'projects', p.id), { order: i });
      }
    });
    await batch.commit();
    projects.value = reordered;
  };

  return { projects, loading, error, fetchProjects, addProject, updateProject, deleteProject, reorderProjects };
}
