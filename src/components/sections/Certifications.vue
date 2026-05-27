<template>
  <section
    id="certifications-section"
    class="common-padding relative mx-auto min-h-[60vh] overflow-y-clip pt-20 sm:pt-32 pb-20 sm:pb-32 will-change-transform"
  >
    <!-- Header -->
    <div
      class="border-flax-smoke-300 grid w-full grid-cols-12 border-b-[1px] pb-[clamp(2.25rem,2.1786rem_+_0.3571vi,2.5rem)]"
    >
      <h3
        id="cert-heading"
        v-html="certHeading"
        class="heading-1 max-sm:heading-2 text-flax-smoke-950 col-span-full leading-none font-bold uppercase will-change-auto"
      ></h3>
      <div
        class="text-flax-smoke-800 col-span-full mt-[5%] flex justify-end gap-10 sm:gap-20 lg:col-span-10"
      >
        <p class="heading-6 text-center text-nowrap uppercase">
          ( Credentials )
        </p>
        <p class="heading-6 font-fancy w-full text-balance sm:max-w-[40ch]">
          A collection of acknowledged vulnerability reports and ongoing
          exploration in modern web technologies and artificial intelligence.
        </p>
      </div>
    </div>

    <!-- Creative Interactive Certifications List -->
    <div class="mt-16 sm:mt-24 flex flex-col w-full border-t border-flax-smoke-300/30">
      <div
        v-for="(cert, index) in certifications"
        :key="cert.id"
        @click="openModal(cert)"
        class="cert-card group relative w-full border-b border-flax-smoke-300/30 overflow-hidden cursor-pointer"
        :style="{ opacity: 0, transform: 'translateY(60px)' }"
        @mousemove="handleMouseMove($event, index)"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave(index)"
      >
        <!-- Hover Background Reveal -->
        <div class="absolute inset-0 bg-flax-smoke-300 translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>

        <!-- Content -->
        <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between p-6 sm:p-10 transition-colors duration-500 group-hover:text-[#0B0B0A]">
          
          <div class="flex flex-col gap-2 md:gap-4 max-w-4xl relative z-20">
            <div class="flex items-center flex-wrap gap-3">
              <span v-if="cert.type === 'bounty'" class="px-2.5 py-1 rounded bg-flax-smoke-950 text-flax-smoke-300 group-hover:bg-[#0B0B0A] group-hover:text-flax-smoke-300 text-xs font-bold uppercase tracking-wider transition-colors duration-500">Bug Bounty</span>
              <span v-else-if="cert.type === 'hall-of-fame'" class="px-2.5 py-1 rounded border border-flax-smoke-950 text-flax-smoke-950 group-hover:border-[#0B0B0A] group-hover:text-[#0B0B0A] text-xs font-bold uppercase tracking-wider transition-colors duration-500">Hall of Fame</span>
              <span class="font-mono text-sm md:text-base font-semibold tracking-widest opacity-60">
                ( {{ (index + 1).toString().padStart(2, '0') }} ) — {{ cert.date }}
              </span>
            </div>
            <h4 class="font-fancy text-[clamp(2.5rem,5vw,6rem)] font-extrabold uppercase leading-[0.9] -tracking-tight text-balance">
              {{ cert.title }}
            </h4>
            <p class="text-base sm:text-lg md:text-xl font-medium opacity-80 mt-2">
              {{ cert.type === 'bounty' ? 'Target / Program:' : cert.type === 'hall-of-fame' ? 'Recognized By:' : 'Issuer:' }} <span class="font-bold">{{ cert.issuer }}</span>
            </p>
          </div>

          <!-- Floating Badge (Desktop) -->
          <div
            v-if="cert.badgeUrl"
            class="absolute top-0 left-0 pointer-events-none hidden xl:flex z-30"
            :style="{
              transform: `translate3d(calc(${mouseState[index]?.x || 0}px - 50%), calc(${mouseState[index]?.y || 0}px - 50%), 0) ${mouseState[index]?.active ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(15deg)'}`,
              opacity: mouseState[index]?.active ? 1 : 0,
              transition: 'opacity 0.4s ease, transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }"
          >
            <video
              v-if="isVideo(cert.badgeUrl)"
              :src="cert.badgeUrl"
              autoplay
              muted
              loop
              playsinline
              class="w-48 h-48 lg:w-56 lg:h-56 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            ></video>
            <img
              v-else
              :src="cert.badgeUrl"
              :alt="cert.title"
              class="w-48 h-48 lg:w-56 lg:h-56 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
          </div>

          <!-- Arrow & Mobile Badge -->
          <div class="mt-8 lg:mt-0 flex items-center gap-6 self-start lg:self-auto relative z-20">
            <div v-if="cert.badgeUrl" class="w-16 h-16 xl:hidden flex items-center justify-center drop-shadow-xl">
              <video
                v-if="isVideo(cert.badgeUrl)"
                :src="cert.badgeUrl"
                autoplay
                muted
                loop
                playsinline
                class="w-full h-full object-contain"
              ></video>
              <img
                v-else
                :src="cert.badgeUrl"
                class="w-full h-full object-contain"
              />
            </div>
            
            <div class="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full border border-current group-hover:bg-[#0B0B0A] group-hover:text-flax-smoke-300 transition-colors duration-500 overflow-hidden relative">
              <div class="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-full group-hover:-translate-y-full">
                <svg class="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
              </div>
              <div class="absolute inset-0 flex items-center justify-center -translate-x-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 group-hover:translate-y-0">
                <svg class="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex-center mt-20 w-full"
    >
      <p class="text-flax-smoke-400 heading-6 animate-pulse font-medium uppercase">
        Loading certifications...
      </p>
    </div>

    <!-- Empty State -->
    <div
      v-if="!loading && certifications.length === 0"
      class="flex-center mt-20 w-full"
    >
      <p class="text-flax-smoke-400 heading-6 font-medium uppercase">
        No certifications yet.
      </p>
    </div>

    <!-- Image Modal -->
    <Teleport to="body">
      <transition name="fade">
        <div 
          v-if="selectedCert" 
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10 backdrop-blur-md" 
          @click="closeModal" 
          data-lenis-prevent
        >
          <div class="relative w-full max-w-6xl max-h-full flex flex-col items-center justify-center gap-6" @click.stop>
            <button @click="closeModal" class="absolute -top-12 md:-top-16 right-0 text-white/50 hover:text-white transition-colors">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <video
              v-if="selectedCert.badgeUrl && isVideo(selectedCert.badgeUrl)"
              :src="selectedCert.badgeUrl"
              autoplay
              muted
              loop
              playsinline
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
  </section>
</template>

<script setup lang="ts">
  import { onBeforeMount, onMounted, ref, nextTick, watch } from 'vue';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { textSplitterIntoChar, isVideo } from '@/functions';
  import { animateSplitText } from '@/animations';
  import { useCertifications, type Certification } from '@/composables/useCertifications';

  gsap.registerPlugin(ScrollTrigger);

  const { certifications, loading, fetchCertifications } = useCertifications();

  const certHeading = ref('Credentials /');

  // Modal State
  const selectedCert = ref<Certification | null>(null);

  const openModal = (cert: Certification) => {
    if (cert.badgeUrl) {
      selectedCert.value = cert;
    } else if (cert.credentialUrl) {
      // If no badge image exists, fallback to opening link
      window.open(cert.credentialUrl, '_blank');
    }
  };

  const closeModal = () => {
    selectedCert.value = null;
  };

  // Mouse tracking state for floating badges
  const mouseState = ref<Record<number, { x: number, y: number, active: boolean }>>({});

  const handleMouseMove = (event: MouseEvent, index: number) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    if (!mouseState.value[index]) {
      mouseState.value[index] = { x, y, active: true };
    } else {
      mouseState.value[index].x = x;
      mouseState.value[index].y = y;
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!mouseState.value[index]) {
      mouseState.value[index] = { x: 0, y: 0, active: true };
    } else {
      mouseState.value[index].active = true;
    }
  };

  const handleMouseLeave = (index: number) => {
    if (mouseState.value[index]) {
      mouseState.value[index].active = false;
    }
  };

  onBeforeMount(() => {
    certHeading.value = textSplitterIntoChar(certHeading.value, true, true);
  });

  onMounted(async () => {
    await fetchCertifications();

    await nextTick();
    ScrollTrigger.refresh();

    // Animate heading text
    animateSplitText(
      '#cert-heading .letters',
      '#cert-heading',
      1,
      0.01,
      0,
    );

    // Staggered row reveal
    gsap.to('.cert-card', {
      scrollTrigger: {
        trigger: '#certifications-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power4.inOut',
    });
  });

  // Re-animate when data loads dynamically
  watch(certifications, async () => {
    await nextTick();
    ScrollTrigger.refresh();
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
