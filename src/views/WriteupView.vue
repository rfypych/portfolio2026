<template>
  <div class="min-h-screen bg-[#0B0B0A] text-flax-smoke-50 font-body relative overflow-x-hidden selection:bg-flax-smoke-300 selection:text-black">
    <!-- Navbar (simplified back button) -->
    <nav class="fixed top-0 left-0 w-full p-6 sm:p-10 z-50 flex justify-between items-center bg-[#0B0B0A]/80 backdrop-blur-md border-b border-white/10">
      <button @click="goBack" class="flex items-center gap-2 group hover:text-flax-smoke-300 transition-colors font-mono uppercase tracking-widest text-sm">
        <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Portfolio
      </button>
      <div v-if="cert" class="hidden sm:block">
        <span class="px-2 py-1 rounded border border-white/20 text-xs font-bold uppercase tracking-wider opacity-60">
          {{ cert.type === 'bounty' ? 'Bug Bounty' : cert.type === 'hall-of-fame' ? 'Hall of Fame' : cert.type === 'vd-certificate' ? 'VD Certificate' : 'Course Certificate' }}
        </span>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-32 pb-20 px-6 sm:px-10 max-w-4xl mx-auto min-h-[80vh]">
      <div v-if="loading" class="flex items-center justify-center h-64">
        <p class="font-mono animate-pulse text-flax-smoke-400">Loading writeup...</p>
      </div>
      
      <div v-else-if="cert" class="animate-fade-in">
        <!-- Header -->
        <header class="mb-12 sm:mb-16">
          <h1 class="font-fancy text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-[1.1] -tracking-tight text-balance mb-6">
            {{ cert.title }}
          </h1>
          <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 font-mono text-sm opacity-70">
            <p>
              <span class="opacity-60">{{ cert.type === 'bounty' ? 'Target:' : cert.type === 'hall-of-fame' ? 'Recognized By:' : cert.type === 'vd-certificate' ? 'Reported To:' : 'Issuer:' }}</span>
              <span class="font-bold text-flax-smoke-300 ml-2">{{ cert.issuer }}</span>
            </p>
            <p class="hidden sm:block opacity-30">•</p>
            <p>
              <span class="opacity-60">Date:</span>
              <span class="font-bold ml-2">{{ cert.date }}</span>
            </p>
          </div>
        </header>

        <!-- Badge Media -->
        <div v-if="cert.badgeUrl" class="mb-12 sm:mb-16">
          <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <video
              v-if="isVideo(cert.badgeUrl)"
              :src="cert.badgeUrl"
              autoplay muted loop playsinline
              class="w-full h-auto max-h-[50vh] object-contain grayscale brightness-90"
            />
            <img
              v-else
              :src="cert.badgeUrl"
              class="w-full h-auto max-h-[50vh] object-contain grayscale brightness-90"
              :alt="cert.title"
            />
          </div>
        </div>

        <!-- Markdown Body -->
        <article 
          v-if="htmlContent" 
          class="prose prose-invert prose-flax prose-lg sm:prose-xl max-w-none"
          v-html="htmlContent"
        ></article>

        <!-- Empty State -->
        <div v-else class="p-8 border border-white/10 rounded-2xl bg-white/5 text-center">
          <p class="opacity-50 font-mono">No writeup content available for this entry.</p>
        </div>
      </div>
      
      <div v-else class="flex flex-col items-center justify-center h-64 gap-4 text-center">
        <h2 class="font-fancy text-3xl font-bold text-red-400">Writeup Not Found</h2>
        <p class="opacity-60">The requested writeup could not be found or does not exist.</p>
        <button @click="$router.push('/')" class="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors font-mono text-sm uppercase">Return Home</button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { Certification } from '../composables/useCertifications';
import { isVideo } from '@/functions';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const route = useRoute();
const router = useRouter();

const goBack = () => {
  // If there's history (user came from the portfolio), go back to preserve scroll
  if (window.history.length > 1) {
    router.back();
  } else {
    // Fallback: direct visit to writeup URL
    router.push('/#certifications');
  }
};

const cert = ref<Certification | null>(null);
const loading = ref(true);
const htmlContent = ref('');

onMounted(async () => {
  const id = route.params.id as string;
  if (!id) {
    loading.value = false;
    return;
  }

  try {
    const docRef = doc(db, 'certifications', id);
    const snapshot = await getDoc(docRef);
    
    if (snapshot.exists()) {
      cert.value = { id: snapshot.id, ...snapshot.data() } as Certification;
      
      if (cert.value.writeupContent) {
        // Parse markdown and sanitize HTML
        const rawHtml = await marked(cert.value.writeupContent);
        htmlContent.value = DOMPurify.sanitize(rawHtml);
      } else if (cert.value.writeupUrl) {
        // If it's an external URL, just redirect them there
        window.location.href = cert.value.writeupUrl;
      }
    }
  } catch (err) {
    console.error('Failed to fetch writeup:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style>
/* Custom Prose Styles to match the Flax Smoke Theme */
.prose-flax {
  --tw-prose-body: rgba(255, 255, 255, 0.7);
  --tw-prose-headings: #f4f4f1; /* flax-smoke-50 */
  --tw-prose-lead: rgba(255, 255, 255, 0.6);
  --tw-prose-links: #b9b596; /* flax-smoke-300 */
  --tw-prose-bold: #f4f4f1;
  --tw-prose-counters: rgba(255, 255, 255, 0.5);
  --tw-prose-bullets: rgba(255, 255, 255, 0.3);
  --tw-prose-hr: rgba(255, 255, 255, 0.1);
  --tw-prose-quotes: #f4f4f1;
  --tw-prose-quote-borders: #b9b596;
  --tw-prose-captions: rgba(255, 255, 255, 0.5);
  --tw-prose-code: #b9b596;
  --tw-prose-pre-code: #f4f4f1;
  --tw-prose-pre-bg: rgba(0, 0, 0, 0.5);
  --tw-prose-th-borders: rgba(255, 255, 255, 0.2);
  --tw-prose-td-borders: rgba(255, 255, 255, 0.1);
}

.prose-flax h1, 
.prose-flax h2, 
.prose-flax h3, 
.prose-flax h4 {
  font-family: 'Cabinet Grotesk', 'title', sans-serif;
  letter-spacing: -0.025em;
  text-transform: uppercase;
}

.prose-flax a {
  text-decoration-color: rgba(185, 181, 150, 0.4);
  text-underline-offset: 4px;
  transition: all 0.2s ease;
}

.prose-flax a:hover {
  text-decoration-color: #b9b596;
}

.prose-flax pre {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
}

.prose-flax img {
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
