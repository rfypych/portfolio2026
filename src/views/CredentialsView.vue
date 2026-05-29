<template>
  <div class="min-h-screen bg-[#0B0B0A] text-flax-smoke-50 relative overflow-x-hidden selection:bg-flax-smoke-300 selection:text-black pb-32">
    
    <!-- Navbar (simplified back button) -->
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

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]">
        <div
          v-for="(cert, index) in certifications"
          :key="cert.id"
          @click="handleBentoClick(cert)"
          class="cred-card group relative cursor-pointer overflow-hidden border border-flax-smoke-950 bg-flax-smoke-50 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
          :class="getBentoClasses(index)"
          :style="{ opacity: 0, transform: 'translateY(100px)' }"
        >
          <!-- Background Hover Image/Video (Hidden by default) -->
          <div v-if="cert.badgeUrl" class="absolute inset-0 bg-[#0B0B0A] opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-20 pointer-events-none">
            <video v-if="isVideo(cert.badgeUrl)" :src="cert.badgeUrl" autoplay muted loop playsinline class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"></video>
            <img v-else :src="cert.badgeUrl" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <!-- Gradient Overlay for visual polish -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/20 to-transparent"></div>
            
            <!-- Hover State Arrow -->
            <div class="absolute bottom-6 right-6 z-30">
                <div class="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white opacity-0 -translate-y-4 translate-x-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <svg class="w-5 h-5 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                </div>
            </div>
          </div>

          <!-- Typographic Poster Content (Default State) -->
          <div class="relative h-full flex flex-col justify-between p-6 sm:p-8 z-10 text-flax-smoke-950 transition-opacity duration-[600ms] group-hover:opacity-0">
            <!-- Top Header -->
            <div class="flex justify-between items-start w-full border-b border-flax-smoke-950 pb-4">
              <h3 class="font-bold uppercase tracking-widest text-xs sm:text-sm bg-flax-smoke-950 text-flax-smoke-50 px-3 py-1">
                {{ cert.type === 'bounty' ? 'BUG BOUNTY*' : cert.type === 'hall-of-fame' ? 'HALL OF FAME*' : cert.type === 'vd-certificate' ? 'VD CERTIFICATE*' : 'COURSE CERTIFICATE*' }}
              </h3>
              <span class="font-mono text-[10px] uppercase tracking-widest opacity-60 flex flex-col items-end">
                <span>SERIAL NO.</span>
                <span class="font-bold">{{ String(index + 1).padStart(3, '0') }}-{{ new Date().getFullYear() }}</span>
              </span>
            </div>

            <!-- Center Massive Title -->
            <div class="flex-grow flex flex-col justify-center my-8">
              <h4 class="font-fancy font-black uppercase leading-[0.9] tracking-tighter" :class="getTitleSize(index)" style="text-wrap: balance;">
                {{ cert.title }}
              </h4>
              <p class="font-mono text-[10px] sm:text-xs uppercase mt-6 max-w-[90%] opacity-80 leading-relaxed border-l-2 border-flax-smoke-950 pl-4">
                THIS CREDENTIAL CERTIFIES THAT <span class="font-bold">ROFIKUL HUDA</span> HAS SUCCESSFULLY COMPLETED OR BEEN ACKNOWLEDGED BY <span class="font-bold">{{ cert.issuer }}</span> FOR SIGNIFICANT CONTRIBUTIONS.
              </p>
            </div>

            <!-- Bottom Footer -->
            <div class="flex justify-between items-end border-t border-flax-smoke-950 pt-4 w-full">
              <div class="flex flex-col">
                <span class="font-mono text-[10px] uppercase opacity-60">DATE:</span>
                <span class="font-bold uppercase tracking-wider text-xl sm:text-2xl">{{ cert.date }}</span>
              </div>
              
              <!-- Signature Line & SVG -->
              <div class="flex flex-col items-center">
                <!-- Fake Signature SVG -->
                <svg class="w-16 h-8 sm:w-20 sm:h-10 opacity-80 mb-1" viewBox="0 0 100 30" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M5,25 Q15,5 25,15 T45,15 T65,10 Q80,0 95,20" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="font-mono text-[9px] uppercase tracking-widest border-t border-flax-smoke-950 pt-1 w-full text-center">SIGNATURE</span>
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
              v-else
              :src="selectedCert.badgeUrl"
              class="w-full h-auto max-h-[70vh] object-contain drop-shadow-2xl select-none"
            />
            <div class="flex flex-col items-center gap-4 text-white text-center">
              <h4 class="font-fancy text-2xl md:text-4xl font-extrabold uppercase">{{ selectedCert.title }}</h4>
              <a 
                v-if="selectedCert.credentialUrl" 
                :href="selectedCert.credentialUrl" 
                target="_blank" 
                class="px-8 py-3 bg-flax-smoke-300 text-black font-semibold rounded-full hover:bg-flax-smoke-200 transition-colors text-sm uppercase tracking-widest mt-2"
              >
                Verify Credential
              </a>
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

const getBentoClasses = (index: number) => {
  const mod = index % 7;
  if (mod === 0) return 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2';
  if (mod === 1) return 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1';
  if (mod === 2) return 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1';
  if (mod === 3) return 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1';
  if (mod === 4) return 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1';
  if (mod === 5) return 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1';
  if (mod === 6) return 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1';
  return 'col-span-1 row-span-1';
};

const getTitleSize = (index: number) => {
  const mod = index % 7;
  if (mod === 0) return 'text-3xl md:text-5xl lg:text-6xl';
  if (mod === 3 || mod === 5) return 'text-2xl md:text-3xl lg:text-4xl';
  return 'text-2xl md:text-3xl';
};



const handleBentoClick = (cert: Certification) => {
  if (cert.writeupContent || cert.writeupUrl) {
    router.push({ name: 'writeup-view', params: { id: cert.id } });
  } else {
    selectedCert.value = cert;
    document.body.style.overflow = 'hidden';
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
  // Ensure lenis runs on this page
  document.body.classList.remove('stop-scrolling');
  lenis.start();

  await fetchCertifications();
  await nextTick();

  // Smooth entrance animation with GSAP
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
