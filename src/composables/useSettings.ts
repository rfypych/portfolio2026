import { ref } from 'vue';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface SiteSettings {
  heroPhoto: string;
  aboutPhoto: string;
  contactVideo: string;
}

const SETTINGS_DOC = 'profile';
const SETTINGS_COL = 'settings';

// Shared reactive state across all composable instances
const settings = ref<SiteSettings>({
  heroPhoto: '',
  aboutPhoto: '',
  contactVideo: '',
});
const loading = ref(false);
let fetched = false;

export function useSettings() {
  const fetchSettings = async () => {
    if (fetched) return;
    loading.value = true;
    try {
      const docRef = doc(db, SETTINGS_COL, SETTINGS_DOC);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        settings.value = snap.data() as SiteSettings;
      }
      fetched = true;
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      loading.value = false;
    }
  };

  const updateSettings = async (patch: Partial<SiteSettings>) => {
    const docRef = doc(db, SETTINGS_COL, SETTINGS_DOC);
    await setDoc(docRef, { ...settings.value, ...patch }, { merge: true });
    settings.value = { ...settings.value, ...patch };
  };

  return { settings, loading, fetchSettings, updateSettings };
}
