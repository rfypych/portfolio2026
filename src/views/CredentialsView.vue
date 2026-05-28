<template>
  <div class="min-h-screen bg-[#0B0B0A] text-flax-smoke-50 relative overflow-x-hidden selection:bg-flax-smoke-300 selection:text-black pb-32">
    
    <!-- Navbar (simplified back button) -->
    <nav class="fixed top-0 left-0 w-full p-6 sm:p-10 z-50 flex justify-between items-center bg-[#0B0B0A]/80 backdrop-blur-md border-b border-white/10">
      <router-link to="/#certifications-section" class="flex items-center gap-2 group hover:text-flax-smoke-300 transition-colors font-mono uppercase tracking-widest text-sm text-white">
        <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Portfolio
      </router-link>
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
          class="cred-card group relative cursor-pointer overflow-hidden rounded-3xl transition-transform duration-500 hover:scale-[1.02]"
          :class="getBentoClasses(index)"
          :style="{ opacity: 0, transform: 'translateY(100px)' }"
        >
          <!-- Background -->
          <div v-if="cert.badgeUrl" class="absolute inset-0 bg-[#0B0B0A]">
            <video v-if="isVideo(cert.badgeUrl)" :src="cert.badgeUrl" autoplay muted loop playsinline class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"></video>
            <img v-else :src="cert.badgeUrl" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/40 to-transparent"></div>
          </div>
          <div v-else class="absolute inset-0 transition-colors duration-500" :class="getBgColor(index)"></div>

          <!-- Content Wrapper -->
          <div class="relative h-full flex flex-col justify-between p-6 sm:p-8 z-10" :class="getTextColor(index, !!cert.badgeUrl)">
            <div class="flex justify-between items-start w-full">
              <span class="inline-block border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md" :class="getBadgeColor(index, !!cert.badgeUrl)">
                {{ cert.type === 'bounty' ? 'Bug Bounty' : cert.type === 'hall-of-fame' ? 'Hall of Fame' : cert.type === 'vd-certificate' ? 'VD Certificate' : 'Course Certificate' }}
              </span>
              <div class="w-10 h-10 rounded-full border flex items-center justify-center opacity-0 -translate-y-4 translate-x-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" :class="getBadgeColor(index, !!cert.badgeUrl)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </div>
            </div>
            <div class="flex flex-col gap-2 mt-auto">
              <div class="flex items-center gap-3 font-mono text-xs uppercase tracking-widest opacity-80">
                <span>{{ cert.date }}</span>
                <span>•</span>
                <span class="truncate max-w-[200px]">{{ cert.issuer }}</span>
              </div>
              <h4 class="font-title! font-bold uppercase leading-[1.05] line-clamp-3" :class="getTitleSize(index)">
                {{ cert.title }}
              </h4>
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

const getBgColor = (index: number) => {
  const colors = ['bg-[#111110]', 'bg-flax-smoke-300', 'bg-[#f4f4f1]'];
  return colors[index % colors.length];
};

const getTextColor = (index: number, hasImage: boolean) => {
  if (hasImage) return 'text-[#f4f4f1]';
  const bg = getBgColor(index);
  if (bg === 'bg-[#111110]') return 'text-[#f4f4f1]';
  return 'text-[#111110]';
};

const getBadgeColor = (index: number, hasImage: boolean) => {
  if (hasImage) return 'border-white/30 text-white bg-black/20';
  const bg = getBgColor(index);
  if (bg === 'bg-[#111110]') return 'border-white/20 text-[#f4f4f1] bg-white/5';
  return 'border-black/20 text-[#111110] bg-black/5';
};

const handleBentoClick = (cert: Certification) => {
  if (cert.writeupContent || cert.writeupUrl) {
    router.push({ name: 'writeup-view', params: { id: cert.id } });
  } else {
    selectedCert.value = cert;
    document.body.style.overflow = 'hidden';
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
