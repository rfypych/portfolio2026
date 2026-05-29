<template>
  <div class="min-h-screen bg-[#0B0B0A] text-flax-smoke-50 relative overflow-x-hidden selection:bg-flax-smoke-300 selection:text-black pb-32">
    
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 w-full p-6 sm:p-10 z-50 flex justify-between items-center bg-[#0B0B0A]/80 backdrop-blur-md border-b border-white/10">
      <button @click="goBack" class="flex items-center gap-2 group hover:text-flax-smoke-300 transition-colors font-mono uppercase tracking-widest text-sm text-white">
        <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Portfolio
      </button>
      <div class="hidden sm:block">
        <span class="px-3 py-1.5 rounded-full border border-flax-smoke-800 bg-[#0B0B0A] text-flax-smoke-300 text-[10px] font-bold uppercase tracking-widest shadow-lg">
          Investigation Board
        </span>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-32 px-4 sm:px-8 md:px-16 max-w-[1600px] mx-auto min-h-screen">
      <header class="mb-16">
        <h1 class="font-fancy text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase leading-[1.1] -tracking-tight mb-6">
          All Credentials
        </h1>
        <p class="font-mono text-sm opacity-70 max-w-2xl leading-relaxed text-flax-smoke-300">
          A complete collection of acknowledged vulnerability reports, bug bounties, and technical certifications.
        </p>
      </header>

      <!-- Grid of Poster Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(cert, index) in certifications"
          :key="cert.id"
          @click="openModal(cert)"
          class="cred-card cursor-pointer border border-flax-smoke-950 bg-flax-smoke-50 h-[500px] sm:h-[520px] relative overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
          :style="{ opacity: 0, transform: 'translateY(80px)' }"
        >
          <!-- Template A -->
          <div v-if="getTemplate(cert, index) === 'A'" class="h-full flex flex-col justify-between p-6 sm:p-8 text-flax-smoke-950">
            <div>
              <h3 class="font-fancy font-black text-3xl sm:text-4xl uppercase tracking-tighter leading-[0.9]">ROFIKUL*</h3>
              <img :src="statueImages[0]" class="absolute top-6 right-6 w-20 h-20 sm:w-24 sm:h-24 object-cover mix-blend-multiply" alt="" />
            </div>
            <div class="flex-grow flex flex-col justify-center my-4">
              <h4 class="font-fancy font-black text-2xl sm:text-3xl uppercase leading-[0.9] tracking-tighter" style="text-wrap: balance;">
                {{ cert.title }}
              </h4>
            </div>
            <div>
              <p class="font-mono text-[9px] sm:text-[10px] uppercase leading-relaxed mb-6">
                PRESENTED TO <span class="font-bold">ROFIKUL HUDA</span><br/>
                FOR {{ cert.issuer }} RESEARCH
              </p>
              <div class="flex justify-between items-end border-t border-flax-smoke-950 pt-3">
                <div>
                  <span class="font-mono text-[9px] uppercase opacity-60">DATE:</span><br/>
                  <span class="font-bold text-lg sm:text-xl uppercase tracking-wide">{{ cert.date }}</span>
                </div>
                <div class="flex flex-col items-center">
                  <svg class="w-14 h-6 sm:w-16 sm:h-7 opacity-80 mb-0.5" viewBox="0 0 100 30" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M5,25 Q15,5 25,15 T45,15 T65,10 Q80,0 95,20" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span class="font-mono text-[8px] uppercase tracking-widest border-t border-flax-smoke-950 pt-0.5 text-center">SIGNATURE</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Template B -->
          <div v-else-if="getTemplate(cert, index) === 'B'" class="h-full flex flex-col justify-between p-6 sm:p-8 text-flax-smoke-950">
            <div>
              <div class="flex items-center gap-2 mb-6">
                <span class="bg-flax-smoke-950 text-flax-smoke-50 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest">OXRPHY®</span>
                <span class="font-bold text-[10px] sm:text-xs uppercase tracking-widest">CERTIFICATION</span>
              </div>
              <h4 class="font-fancy font-black text-3xl sm:text-4xl uppercase leading-[0.85] tracking-tighter" style="text-wrap: balance;">
                {{ cert.title }}
              </h4>
            </div>
            <div class="flex-grow flex flex-col justify-center my-4">
              <p class="font-mono text-[9px] sm:text-[10px] uppercase leading-relaxed mb-4">
                This certifies that<br/>
                <span class="font-bold text-sm sm:text-base">[ROFIKUL HUDA]</span><br/>
                has successfully completed or been acknowledged by {{ cert.issuer }}.
              </p>
              <img :src="statueImages[2]" class="w-20 h-24 sm:w-24 sm:h-28 object-contain mx-auto mix-blend-multiply" alt="" />
            </div>
            <div>
              <span class="font-bold text-2xl sm:text-3xl uppercase tracking-wider">{{ cert.date }}</span>
            </div>
          </div>

          <!-- Template C -->
          <div v-else class="h-full flex flex-col justify-between p-6 sm:p-8 text-flax-smoke-950 relative">
            <div>
              <h3 class="font-fancy font-black text-3xl sm:text-4xl uppercase tracking-tighter leading-[0.9]">ROFIKUL*</h3>
              <img :src="statueImages[1]" class="absolute top-0 right-0 w-28 h-40 sm:w-36 sm:h-48 object-cover mix-blend-multiply" alt="" />
            </div>
            <div class="flex-grow flex flex-col justify-center my-4 max-w-[65%]">
              <h4 class="font-fancy font-black text-2xl sm:text-3xl uppercase leading-[0.85] tracking-tighter" style="text-wrap: balance;">
                {{ cert.title }}
              </h4>
            </div>
            <div>
              <p class="font-mono text-[9px] sm:text-[10px] uppercase leading-relaxed mb-4">
                RECOGNIZING <span class="font-bold">ROFIKUL HUDA</span><br/>
                FOR SIGNIFICANT CONTRIBUTIONS TO<br/>
                {{ cert.issuer }}
              </p>
              <div class="flex justify-between items-end">
                <span class="font-bold text-lg sm:text-xl uppercase tracking-wider">{{ cert.date }}</span>
                <div class="flex items-center gap-2">
                  <svg class="w-12 h-5 sm:w-14 sm:h-6 opacity-80" viewBox="0 0 100 30" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M5,25 Q15,5 25,15 T45,15 T65,10 Q80,0 95,20" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg class="w-8 h-8 sm:w-10 sm:h-10 opacity-90" viewBox="0 0 40 40" fill="currentColor">
                    <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" stroke-width="2"/>
                    <path d="M14 20l4 4 8-8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Image Modal -->
    <Teleport to="body">
      <transition name="fade">
        <div 
          v-if="selectedCert" 
          class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 sm:p-10 backdrop-blur-md" 
          @click="closeModal" 
        >
          <div class="relative w-full max-w-6xl max-h-full flex flex-col items-center justify-center gap-6" @click.stop>
            <button @click="closeModal" class="absolute -top-12 md:-top-16 right-0 text-white/50 hover:text-white transition-colors">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <video
              v-if="selectedCert.badgeUrl && isVideo(selectedCert.badgeUrl)"
              :src="selectedCert.badgeUrl"
              autoplay muted loop playsinline
              class="w-full h-auto max-h-[70vh] object-contain drop-shadow-2xl select-none"
            ></video>
            <img
              v-else-if="selectedCert.badgeUrl"
              :src="selectedCert.badgeUrl"
              class="w-full h-auto max-h-[70vh] object-contain drop-shadow-2xl select-none"
            />
            <div class="flex flex-col items-center gap-4 text-white text-center">
              <h4 class="font-fancy text-2xl md:text-4xl font-extrabold uppercase">{{ selectedCert.title }}</h4>
              <p class="font-mono text-sm opacity-60">{{ selectedCert.issuer }} · {{ selectedCert.date }}</p>
              <div class="flex gap-4 mt-2">
                <a 
                  v-if="selectedCert.credentialUrl" 
                  :href="selectedCert.credentialUrl" 
                  target="_blank" 
                  class="px-8 py-3 bg-flax-smoke-300 text-black font-semibold rounded-full hover:bg-flax-smoke-200 transition-colors text-sm uppercase tracking-widest"
                >
                  Verify Credential
                </a>
                <router-link
                  v-if="selectedCert.writeupContent || selectedCert.writeupUrl"
                  :to="{ name: 'writeup-view', params: { id: selectedCert.id } }"
                  class="px-8 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-sm uppercase tracking-widest"
                >
                  Read Writeup
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import gsap from 'gsap';
import { isVideo } from '@/functions';
import { useCertifications, type Certification } from '@/composables/useCertifications';
import { lenis } from '@/lenis';

const router = useRouter();
const { certifications, fetchCertifications } = useCertifications();

const selectedCert = ref<Certification | null>(null);

const statueImages = [
  '/statues/statue-1.png',
  '/statues/statue-2.png',
  '/statues/statue-3.png',
];

const getTemplate = (cert: Certification, index: number): 'A' | 'B' | 'C' => {
  const templates: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
  if (cert.id) {
    let hash = 0;
    for (let i = 0; i < cert.id.length; i++) {
      hash = ((hash << 5) - hash) + cert.id.charCodeAt(i);
      hash |= 0;
    }
    return templates[Math.abs(hash) % 3];
  }
  return templates[index % 3];
};

const openModal = (cert: Certification) => {
  if (cert.writeupContent || cert.writeupUrl) {
    router.push({ name: 'writeup-view', params: { id: cert.id } });
  } else if (cert.badgeUrl) {
    selectedCert.value = cert;
    document.body.style.overflow = 'hidden';
  } else if (cert.credentialUrl) {
    window.open(cert.credentialUrl, '_blank');
  }
};

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/#certifications-section');
  }
};

const closeModal = () => {
  selectedCert.value = null;
  document.body.style.overflow = '';
};

onMounted(async () => {
  document.body.classList.remove('stop-scrolling');
  lenis.start();

  await fetchCertifications();
  await nextTick();

  gsap.to('.cred-card', {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.05,
    ease: 'power3.out',
  });
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, backdrop-filter 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}
</style>
