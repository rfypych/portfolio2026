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

    <!-- Navigation and Help Text -->
    <div class="mt-12 flex justify-between items-center w-full px-1 border-b border-flax-smoke-300 pb-4">
      <span class="font-mono text-xs uppercase opacity-60 tracking-widest flex items-center gap-2 select-none">
        <span class="w-1.5 h-1.5 bg-flax-smoke-950 inline-block animate-pulse"></span>
        Drag or swipe to explore
      </span>
      <div class="flex gap-2">
        <button 
          @click="scrollPrev"
          class="w-10 h-10 border border-flax-smoke-950 flex items-center justify-center text-flax-smoke-950 hover:bg-flax-smoke-950 hover:text-flax-smoke-50 transition-colors uppercase font-mono text-xs select-none cursor-pointer"
          aria-label="Previous"
        >
          ←
        </button>
        <button 
          @click="scrollNext"
          class="w-10 h-10 border border-flax-smoke-950 flex items-center justify-center text-flax-smoke-950 hover:bg-flax-smoke-950 hover:text-flax-smoke-50 transition-colors uppercase font-mono text-xs select-none cursor-pointer"
          aria-label="Next"
        >
          →
        </button>
      </div>
    </div>

    <!-- Credential Scroll Container -->
    <div class="mt-8 sm:mt-12 w-full overflow-hidden relative" style="mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);">
      <div
        ref="containerRef"
        id="cert-marquee"
        class="flex gap-6 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing select-none py-2 will-change-transform"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUpOrLeave"
        @mouseleave="onMouseUpOrLeave"
      >
        <div
          v-for="(cert, index) in certifications"
          :key="`cert-${cert.id || index}`"
          @click="handleCardClick(cert)"
          class="cert-poster flex-shrink-0 w-[320px] sm:w-[380px] h-[460px] sm:h-[520px] border border-flax-smoke-950 bg-flax-smoke-50 cursor-pointer relative overflow-hidden select-none"
        >
          <!-- Template A -->
          <div v-if="getTemplate(cert, index) === 'A'" class="h-full flex flex-col justify-between p-6 sm:p-8 text-flax-smoke-950">
            <div>
              <h3 class="font-fancy font-black text-3xl sm:text-4xl uppercase tracking-tighter leading-[0.9]">ROFIKUL*</h3>
              <img :src="statueImages[0]" class="absolute top-6 right-6 w-20 h-20 sm:w-24 sm:h-24 object-cover mix-blend-multiply" alt="" />
            </div>
            <div class="flex-grow flex flex-col justify-center my-4">
              <h4 class="font-fancy font-black text-2xl sm:text-3xl uppercase leading-[0.9] tracking-tighter whitespace-normal" style="text-wrap: balance;">
                {{ cert.title }}
              </h4>
            </div>
            <div>
              <p class="font-mono text-[9px] sm:text-[10px] uppercase leading-relaxed mb-6 whitespace-normal">
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
              <h4 class="font-fancy font-black text-3xl sm:text-4xl uppercase leading-[0.85] tracking-tighter whitespace-normal" style="text-wrap: balance;">
                {{ cert.title }}
              </h4>
            </div>
            <div class="flex-grow flex flex-col justify-center my-4">
              <p class="font-mono text-[9px] sm:text-[10px] uppercase leading-relaxed whitespace-normal mb-4">
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
              <h4 class="font-fancy font-black text-2xl sm:text-3xl uppercase leading-[0.85] tracking-tighter whitespace-normal" style="text-wrap: balance;">
                {{ cert.title }}
              </h4>
            </div>
            <div>
              <p class="font-mono text-[9px] sm:text-[10px] uppercase leading-relaxed whitespace-normal mb-4">
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
                  <!-- Seal Icon -->
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

    <!-- Click Modal -->
    <Teleport to="body">
      <transition name="fade">
        <div 
          v-if="selectedCert" 
          class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 sm:p-10 backdrop-blur-md" 
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

    <!-- Writeup Overlay -->
    <Teleport to="body">
      <transition name="writeup-slide">
        <div
          v-if="writeupCert"
          class="fixed inset-0 z-[11000] bg-[#0B0B0A] overflow-y-auto"
          data-lenis-prevent
        >
          <!-- Writeup Navbar -->
          <nav class="sticky top-0 left-0 w-full p-4 sm:p-6 z-50 flex justify-between items-center bg-[#0B0B0A]/80 backdrop-blur-md border-b border-white/10">
            <button @click="closeWriteup" class="flex items-center gap-2 group hover:text-flax-smoke-300 transition-colors font-mono uppercase tracking-widest text-xs sm:text-sm">
              <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              Close
            </button>
            <span class="px-2 py-1 rounded bg-flax-smoke-300 text-[#0B0B0A] text-[10px] font-bold uppercase tracking-wider">
              {{ writeupCert.type === 'bounty' ? 'Bug Bounty' : writeupCert.type === 'hall-of-fame' ? 'Hall of Fame' : writeupCert.type === 'vd-certificate' ? 'VD Certificate' : 'Course Certificate' }}
            </span>
          </nav>

          <!-- Writeup Content -->
          <main class="px-6 sm:px-10 pt-10 pb-20 max-w-4xl mx-auto text-flax-smoke-50">
            <!-- Header -->
            <header class="mb-12 sm:mb-16">
              <h1 class="font-fancy text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-[1.1] -tracking-tight text-balance mb-6">
                {{ writeupCert.title }}
              </h1>
              <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 font-mono text-sm opacity-70">
                <p>
                  <span class="opacity-60">{{ writeupCert.type === 'bounty' ? 'Target:' : writeupCert.type === 'hall-of-fame' ? 'Recognized By:' : writeupCert.type === 'vd-certificate' ? 'Reported To:' : 'Issuer:' }}</span>
                  <span class="font-bold text-flax-smoke-300 ml-2">{{ writeupCert.issuer }}</span>
                </p>
                <p class="hidden sm:block opacity-30">•</p>
                <p>
                  <span class="opacity-60">Date:</span>
                  <span class="font-bold ml-2">{{ writeupCert.date }}</span>
                </p>
              </div>
            </header>

            <!-- Markdown Body -->
            <article
              class="writeup-prose"
              v-html="writeupHtml"
            ></article>
          </main>
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
  import { marked } from 'marked';
  import DOMPurify from 'dompurify';

  gsap.registerPlugin(ScrollTrigger);

  const { certifications, loading, fetchCertifications } = useCertifications();

  const certHeading = ref('Credentials /');

  const statueImages = [
    '/statues/statue-1.png',
    '/statues/statue-2.png',
    '/statues/statue-3.png',
  ];

  // Deterministic template assignment based on cert id hash
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

  // Modal State
  const selectedCert = ref<Certification | null>(null);

  const openModal = (cert: Certification) => {
    // If writeup content, open writeup overlay
    if (cert.writeupContent) {
      openWriteup(cert);
      return;
    }
    // If writeup URL, navigate
    if (cert.writeupUrl) {
      window.open(cert.writeupUrl, '_blank');
      return;
    }
    // Otherwise open image modal
    if (cert.badgeUrl) {
      selectedCert.value = cert;
      document.body.style.overflow = 'hidden';
    } else if (cert.credentialUrl) {
      window.open(cert.credentialUrl, '_blank');
    }
  };

  const closeModal = () => {
    selectedCert.value = null;
    document.body.style.overflow = '';
  };

  // Writeup Overlay State
  const writeupCert = ref<Certification | null>(null);
  const writeupHtml = ref('');

  const openWriteup = async (cert: Certification) => {
    writeupCert.value = cert;
    if (cert.writeupContent) {
      const rawHtml = await marked(cert.writeupContent);
      writeupHtml.value = DOMPurify.sanitize(rawHtml);
    }
    document.body.style.overflow = 'hidden';
  };

  const closeWriteup = () => {
    writeupCert.value = null;
    writeupHtml.value = '';
    document.body.style.overflow = '';
  };

  // Scroll and Drag State
  const containerRef = ref<HTMLElement | null>(null);
  const isDragging = ref(false);
  const startX = ref(0);
  const scrollLeftStart = ref(0);
  const dragDistance = ref(0);

  const onMouseDown = (e: MouseEvent) => {
    if (!containerRef.value) return;
    isDragging.value = true;
    dragDistance.value = 0;
    startX.value = e.pageX - containerRef.value.offsetLeft;
    scrollLeftStart.value = containerRef.value.scrollLeft;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value || !containerRef.value) return;
    e.preventDefault();
    const x = e.pageX - containerRef.value.offsetLeft;
    const walk = (x - startX.value) * 1.5;
    dragDistance.value = Math.abs(x - startX.value);
    containerRef.value.scrollLeft = scrollLeftStart.value - walk;
  };

  const onMouseUpOrLeave = () => {
    if (!isDragging.value) return;
    isDragging.value = false;
  };

  const handleCardClick = (cert: Certification) => {
    if (dragDistance.value > 10) return;
    openModal(cert);
  };

  const scrollPrev = () => {
    if (!containerRef.value) return;
    const card = containerRef.value.querySelector('.cert-poster') as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 24 : 404; // width + gap
    gsap.to(containerRef.value, {
      scrollLeft: containerRef.value.scrollLeft - cardWidth,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const scrollNext = () => {
    if (!containerRef.value) return;
    const card = containerRef.value.querySelector('.cert-poster') as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 24 : 404; // width + gap
    gsap.to(containerRef.value, {
      scrollLeft: containerRef.value.scrollLeft + cardWidth,
      duration: 0.5,
      ease: 'power2.out',
    });
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
  });

  watch(certifications, async () => {
    await nextTick();
    ScrollTrigger.refresh();
  });
</script>

<style scoped>
.scrollbar-none {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-none::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, backdrop-filter 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.writeup-slide-enter-active {
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.4s ease;
}
.writeup-slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.3s ease;
}
.writeup-slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.writeup-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>

<style>
/* Writeup Prose — Flax Smoke Theme */
.writeup-prose {
  color: rgba(255, 255, 255, 0.75);
  font-size: 1.125rem;
  line-height: 1.8;
}

.writeup-prose h1,
.writeup-prose h2,
.writeup-prose h3,
.writeup-prose h4 {
  font-family: var(--font-title, 'title'), sans-serif;
  color: #f4f4f1;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  margin-top: 2.5em;
  margin-bottom: 0.75em;
  line-height: 1.1;
}

.writeup-prose h1 { font-size: 2.5rem; }
.writeup-prose h2 { font-size: 1.75rem; }
.writeup-prose h3 { font-size: 1.375rem; }
.writeup-prose h4 { font-size: 1.125rem; }

.writeup-prose p {
  margin-bottom: 1.5em;
}

.writeup-prose a {
  color: #b9b596;
  text-decoration: underline;
  text-decoration-color: rgba(185, 181, 150, 0.4);
  text-underline-offset: 4px;
  transition: text-decoration-color 0.2s ease;
}

.writeup-prose a:hover {
  text-decoration-color: #b9b596;
}

.writeup-prose strong {
  color: #f4f4f1;
  font-weight: 700;
}

.writeup-prose em {
  font-style: italic;
}

.writeup-prose blockquote {
  border-left: 3px solid #b9b596;
  padding-left: 1.25em;
  margin: 1.5em 0;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

.writeup-prose code {
  color: #b9b596;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.15em 0.4em;
  border-radius: 0.375rem;
  font-size: 0.9em;
  font-family: 'Courier New', monospace;
}

.writeup-prose pre {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 1.5em 0;
}

.writeup-prose pre code {
  background: none;
  padding: 0;
  color: #f4f4f1;
  font-size: 0.875rem;
  line-height: 1.7;
}

.writeup-prose ul,
.writeup-prose ol {
  padding-left: 1.5em;
  margin: 1em 0;
}

.writeup-prose ul { list-style-type: disc; }
.writeup-prose ol { list-style-type: decimal; }

.writeup-prose li {
  margin-bottom: 0.5em;
}

.writeup-prose li::marker {
  color: rgba(255, 255, 255, 0.3);
}

.writeup-prose hr {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 2.5em 0;
}

.writeup-prose img {
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 100%;
  margin: 1.5em 0;
}

.writeup-prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
}

.writeup-prose th,
.writeup-prose td {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75em 1em;
  text-align: left;
}

.writeup-prose th {
  background: rgba(255, 255, 255, 0.05);
  color: #f4f4f1;
  font-weight: 700;
}
</style>
