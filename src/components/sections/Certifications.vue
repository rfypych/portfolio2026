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

    <!-- Bento Grid Showcase -->
    <div class="mt-16 sm:mt-24 w-full">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]">
        <div
          v-for="(cert, index) in certifications.slice(0, 4)"
          :key="cert.id"
          @click="handleBentoClick(cert)"
          class="cert-card group relative cursor-pointer overflow-hidden rounded-3xl transition-transform duration-500 hover:scale-[1.02]"
          :class="getBentoClasses(index)"
          :style="{ opacity: 0, transform: 'translateY(60px)' }"
        >
          <!-- Background -->
          <div v-if="cert.badgeUrl" class="absolute inset-0 bg-[#0B0B0A]">
            <video v-if="isVideo(cert.badgeUrl)" :src="cert.badgeUrl" autoplay muted loop playsinline class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"></video>
            <img v-else :src="cert.badgeUrl" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
            <!-- Gradient Overlay for text readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/40 to-transparent"></div>
          </div>
          <div v-else class="absolute inset-0 transition-colors duration-500" :class="getBgColor(index)"></div>

          <!-- Content Wrapper -->
          <div class="relative h-full flex flex-col justify-between p-6 sm:p-8 z-10" :class="getTextColor(index, !!cert.badgeUrl)">
            <!-- Top: Badge & Arrow -->
            <div class="flex justify-between items-start w-full">
              <span class="inline-block border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md" :class="getBadgeColor(index, !!cert.badgeUrl)">
                {{ cert.type === 'bounty' ? 'Bug Bounty' : cert.type === 'hall-of-fame' ? 'Hall of Fame' : cert.type === 'vd-certificate' ? 'VD Certificate' : 'Course Certificate' }}
              </span>
              <!-- Arrow Icon -->
              <div class="w-10 h-10 rounded-full border flex items-center justify-center opacity-0 -translate-y-4 translate-x-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" :class="getBadgeColor(index, !!cert.badgeUrl)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </div>
            </div>

            <!-- Bottom: Meta & Title -->
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

      <!-- Explore All Credentials Button -->
      <div v-if="certifications.length > 4" class="mt-12 flex justify-center w-full relative z-50">
        <router-link
          to="/credentials"
          class="group border-flax-smoke-300 text-flax-smoke-800 hover:bg-flax-smoke-300 hover:text-flax-smoke-950 flex items-center justify-center gap-4 rounded-full border px-10 py-4 font-bold uppercase tracking-widest transition-all duration-500"
        >
          Explore All Credentials
          <span class="bg-flax-smoke-100 group-hover:bg-flax-smoke-950 flex h-6 w-6 items-center justify-center rounded-full text-xs text-flax-smoke-950 group-hover:text-flax-smoke-50 transition-colors duration-500">
            {{ certifications.length }}
          </span>
        </router-link>
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

  // Bento Grid Layout Logic
  const getBentoClasses = (index: number) => {
    // Pattern to create asymmetric bento grid. Repeat every 7 items.
    const mod = index % 7;
    
    if (mod === 0) return 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2'; // Large Hero
    if (mod === 1) return 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1'; // Standard
    if (mod === 2) return 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1'; // Standard
    if (mod === 3) return 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1'; // Wide Horizontal
    if (mod === 4) return 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1'; // Standard
    if (mod === 5) return 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1'; // Wide Horizontal
    if (mod === 6) return 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1'; // Standard
    
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
      if (cert.writeupContent) {
        openWriteup(cert);
      } else if (cert.writeupUrl) {
        window.open(cert.writeupUrl, '_blank');
      }
    } else {
      openModal(cert);
    }
  };

  // Image Modal State
  const selectedCert = ref<Certification | null>(null);

  const openModal = (cert: Certification) => {
    if (cert.badgeUrl) {
      selectedCert.value = cert;
    } else if (cert.credentialUrl) {
      window.open(cert.credentialUrl, '_blank');
    }
  };

  const closeModal = () => {
    selectedCert.value = null;
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
