<template>
  <section
    id="certifications-section"
    class="common-padding relative mx-auto min-h-[60vh] overflow-y-clip will-change-transform"
  >
    <!-- Header — matches Works / Services pattern -->
    <div class="flex w-full flex-col">
      <h3
        id="cert-heading"
        v-html="certHeading"
        class="heading-1 text-start leading-none font-bold uppercase"
      ></h3>
      <p
        class="heading-1 text-flax-smoke-400 text-opacity-50 hidden w-4/5 text-end font-extrabold sm:block"
      >
        ( {{ certifications.length }} )
      </p>

      <div
        id="cert-desc"
        class="md:column-gap text-flax-smoke-300 mt-[5%] grid grid-cols-12 justify-end opacity-0 lg:grid"
      >
        <p
          class="heading-6 text-flax-smoke-300/85 col-span-4 text-center text-nowrap lg:col-start-2"
        >
          (
          <span class="inline sm:hidden">{{ certifications.length }} </span>
          CREDENTIALS )
        </p>
        <p
          class="heading-4 font-fancy col-span-8 w-full text-balance sm:font-semibold lg:col-span-7"
        >
          A collection of acknowledged vulnerability reports, security
          achievements, and ongoing exploration in modern web technologies.
        </p>
      </div>
    </div>

    <!-- Credentials List -->
    <div
      class="relative mt-12 w-full lg:mt-[10%]"
    >
      <div class="border-flax-smoke-500/50 flex flex-col border-t">
        <div
          v-for="(cert, index) in certifications"
          :key="cert.id"
          @click="openModal(cert)"
          class="cert-card group border-flax-smoke-500/50 relative w-full cursor-pointer border-b"
          :style="{ opacity: 0, transform: 'translateY(60px)' }"
          @mousemove="handleMouseMove($event, index)"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave(index)"
        >
          <!-- Content Row -->
          <div class="relative z-40 flex items-center justify-between py-8 sm:py-10 md:py-14">

            <!-- Left: Index Number -->
            <div class="text-flax-smoke-400 font-title! w-16 shrink-0 text-center text-lg font-bold -tracking-wider sm:w-24 sm:text-xl md:text-2xl">
              {{ (index + 1).toString().padStart(2, '0') }}
            </div>

            <!-- Center: Title & Meta -->
            <div class="flex flex-1 flex-col gap-1.5 md:gap-2">
              <h4 class="font-title! text-xl font-bold uppercase sm:text-2xl md:text-4xl lg:text-5xl -tracking-tight leading-[1.1] transition-colors duration-500 group-hover:text-flax-smoke-950">
                {{ cert.title }}
              </h4>
              <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span class="border-flax-smoke-300 text-flax-smoke-600 rounded-full border px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest select-none transition-[background-color,color] duration-500 group-hover:bg-flax-smoke-300 group-hover:text-flax-smoke-900">
                  {{ cert.type === 'bounty' ? 'Bug Bounty' : cert.type === 'hall-of-fame' ? 'Hall of Fame' : cert.type === 'vd-certificate' ? 'VD Certificate' : 'Course Certificate' }}
                </span>
                <span class="text-flax-smoke-400 text-xs font-medium uppercase tracking-wider sm:text-sm">
                  {{ cert.type === 'bounty' ? 'Target:' : cert.type === 'hall-of-fame' ? 'Recognized By:' : cert.type === 'vd-certificate' ? 'Reported To:' : 'Issuer:' }}
                  <span class="text-flax-smoke-700 font-semibold">{{ cert.issuer }}</span>
                </span>
                <span class="text-flax-smoke-400 hidden text-xs font-medium uppercase tracking-wider sm:inline">
                  {{ cert.date }}
                </span>
              </div>
              <!-- Writeup Buttons -->
              <div class="mt-1 flex items-center gap-3 relative z-40">
                <button
                  v-if="cert.writeupContent"
                  @click.stop="openWriteup(cert)"
                  class="text-flax-smoke-500 hover:text-flax-smoke-800 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  Read Writeup
                </button>
                <a
                  v-else-if="cert.writeupUrl"
                  :href="cert.writeupUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click.stop
                  class="text-flax-smoke-500 hover:text-flax-smoke-800 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  External Writeup
                </a>
              </div>
            </div>

            <!-- Right: Badge + Arrow -->
            <div class="flex shrink-0 items-center gap-4 sm:gap-6">
              <!-- Mobile Badge -->
              <div v-if="cert.badgeUrl" class="flex h-12 w-12 items-center justify-center xl:hidden">
                <video
                  v-if="isVideo(cert.badgeUrl)"
                  :src="cert.badgeUrl"
                  autoplay muted loop playsinline
                  class="h-full w-full object-contain"
                ></video>
                <img
                  v-else
                  :src="cert.badgeUrl"
                  class="h-full w-full object-contain"
                />
              </div>

              <!-- Arrow -->
              <div class="border-flax-smoke-300 group-hover:bg-flax-smoke-300 group-hover:text-flax-smoke-900 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border transition-[background-color,color] duration-500 sm:h-14 sm:w-14 md:h-16 md:w-16">
                <svg class="h-4 w-4 transition-transform duration-500 group-hover:rotate-45 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </div>
            </div>
          </div>

          <!-- Desktop Floating Badge -->
          <div
            v-if="cert.badgeUrl"
            class="pointer-events-none absolute top-0 left-0 z-30 hidden xl:flex"
            :style="{
              transform: `translate3d(calc(${mouseState[index]?.x || 0}px - 50%), calc(${mouseState[index]?.y || 0}px - 50%), 0) ${mouseState[index]?.active ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(15deg)'}`,
              opacity: mouseState[index]?.active ? 1 : 0,
              transition: 'opacity 0.4s ease, transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }"
          >
            <video
              v-if="isVideo(cert.badgeUrl)"
              :src="cert.badgeUrl"
              autoplay muted loop playsinline
              class="h-48 w-48 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] lg:h-56 lg:w-56"
            ></video>
            <img
              v-else
              :src="cert.badgeUrl"
              :alt="cert.title"
              class="h-48 w-48 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] lg:h-56 lg:w-56"
            />
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
          class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 sm:p-10 backdrop-blur-md"
          @click="closeModal"
          data-lenis-prevent
        >
          <div class="relative flex max-h-full w-full max-w-6xl flex-col items-center justify-center gap-6" @click.stop>
            <button @click="closeModal" class="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors md:-top-16">
              <svg class="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <video
              v-if="selectedCert.badgeUrl && isVideo(selectedCert.badgeUrl)"
              :src="selectedCert.badgeUrl"
              autoplay muted loop playsinline
              class="h-auto max-h-[70vh] w-full select-none object-contain drop-shadow-2xl"
            ></video>
            <img
              v-else
              :src="selectedCert.badgeUrl"
              class="h-auto max-h-[70vh] w-full select-none object-contain drop-shadow-2xl"
            />
            <div class="flex flex-col items-center gap-4 text-center text-white">
              <h4 class="font-fancy text-2xl font-extrabold uppercase md:text-4xl">{{ selectedCert.title }}</h4>
              <a
                v-if="selectedCert.credentialUrl"
                :href="selectedCert.credentialUrl"
                target="_blank"
                class="border-flax-smoke-300 bg-flax-smoke-300 mt-2 rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:bg-flax-smoke-200"
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
          class="fixed inset-0 z-[10000] overflow-y-auto bg-[#0B0B0A]"
          data-lenis-prevent
        >
          <!-- Writeup Navbar -->
          <nav class="sticky top-0 left-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-[#0B0B0A]/80 p-4 backdrop-blur-md sm:p-6">
            <button @click="closeWriteup" class="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors hover:text-flax-smoke-300 sm:text-sm">
              <svg class="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              Close
            </button>
            <span class="rounded-full border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">
              {{ writeupCert.type === 'bounty' ? 'Bug Bounty' : writeupCert.type === 'hall-of-fame' ? 'Hall of Fame' : writeupCert.type === 'vd-certificate' ? 'VD Certificate' : 'Course Certificate' }}
            </span>
          </nav>

          <!-- Writeup Content -->
          <main class="mx-auto max-w-4xl px-6 pt-10 pb-20 text-flax-smoke-50 sm:px-10">
            <header class="mb-12 sm:mb-16">
              <h1 class="font-title! mb-6 text-4xl font-extrabold uppercase leading-[1.1] -tracking-tight text-balance sm:text-5xl md:text-6xl">
                {{ writeupCert.title }}
              </h1>
              <div class="flex flex-col gap-4 font-mono text-sm opacity-70 sm:flex-row sm:items-center sm:gap-8">
                <p>
                  <span class="opacity-60">{{ writeupCert.type === 'bounty' ? 'Target:' : writeupCert.type === 'hall-of-fame' ? 'Recognized By:' : writeupCert.type === 'vd-certificate' ? 'Reported To:' : 'Issuer:' }}</span>
                  <span class="ml-2 font-bold text-flax-smoke-300">{{ writeupCert.issuer }}</span>
                </p>
                <p class="hidden opacity-30 sm:block">•</p>
                <p>
                  <span class="opacity-60">Date:</span>
                  <span class="ml-2 font-bold">{{ writeupCert.date }}</span>
                </p>
              </div>
            </header>

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
      '#cert-desc',
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
