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

    <!-- Credential Marquee -->
    <div
      class="mt-16 sm:mt-24 w-full overflow-hidden relative"
      style="mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);"
    >
      <div
        ref="marqueeContainer"
        id="cert-marquee"
        class="flex gap-6 whitespace-nowrap will-change-transform select-none cursor-grab active:cursor-grabbing"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointercancel="handlePointerUp"
        @wheel="handleWheel"
      >
        <div
          v-for="(cert, index) in marqueeItems"
          :key="`cert-${index}`"
          @click="handleCardClick(cert)"
          class="cert-poster flex-shrink-0 w-[280px] sm:w-[380px] h-[400px] sm:h-[520px] border border-flax-smoke-950 bg-flax-smoke-50 cursor-pointer relative overflow-hidden select-none"
        >
          <!-- Template A -->
          <div v-if="getTemplate(cert, index) === 'A'" class="h-full flex flex-col justify-between p-5 sm:p-8 text-flax-smoke-950">
            <div>
              <h3 class="font-fancy font-black text-3xl sm:text-4xl uppercase tracking-tighter leading-[0.9]">ROFIKUL*</h3>
              <img :src="statueImages[0]" class="absolute top-5 right-5 w-16 h-16 sm:w-24 sm:h-24 object-cover mix-blend-multiply" alt="" />
            </div>
            <div class="flex-grow flex flex-col justify-center my-4">
              <h4 class="font-fancy font-black text-2xl sm:text-3xl uppercase leading-[0.9] tracking-tighter whitespace-normal" style="text-wrap: balance;">
                {{ cert.title }}
              </h4>
            </div>
            <div>
              <p class="font-mono text-[9px] sm:text-[10px] uppercase leading-relaxed mb-4 sm:mb-6 whitespace-normal">
                PRESENTED TO <span class="font-bold">ROFIKUL HUDA</span><br/>
                FOR {{ cert.issuer }} RESEARCH
              </p>
              <div class="flex justify-between items-end border-t border-flax-smoke-950 pt-3">
                <div>
                  <span class="font-mono text-[9px] uppercase opacity-60">DATE:</span><br/>
                  <span class="font-bold text-lg sm:text-xl uppercase tracking-wide">{{ cert.date }}</span>
                </div>
                <div class="flex flex-col items-center">
                  <svg class="w-12 h-5 sm:w-16 sm:h-7 opacity-80 mb-0.5" viewBox="0 0 100 30" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M5,25 Q15,5 25,15 T45,15 T65,10 Q80,0 95,20" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span class="font-mono text-[8px] uppercase tracking-widest border-t border-flax-smoke-950 pt-0.5 text-center">SIGNATURE</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Template B -->
          <div v-else-if="getTemplate(cert, index) === 'B'" class="h-full flex flex-col justify-between p-5 sm:p-8 text-flax-smoke-950">
            <div>
              <div class="flex items-center gap-2 mb-4 sm:mb-6">
                <span class="bg-flax-smoke-950 text-flax-smoke-50 px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">OXRPHY®</span>
                <span class="font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">CERTIFICATION</span>
              </div>
              <h4 class="font-fancy font-black text-2xl sm:text-4xl uppercase leading-[0.85] tracking-tighter whitespace-normal" style="text-wrap: balance;">
                {{ cert.title }}
              </h4>
            </div>
            <div class="flex-grow flex flex-col justify-center my-4">
              <p class="font-mono text-[9px] sm:text-[10px] uppercase leading-relaxed whitespace-normal mb-2 sm:mb-4">
                This certifies that<br/>
                <span class="font-bold text-sm sm:text-base">[ROFIKUL HUDA]</span><br/>
                has successfully completed or been acknowledged by {{ cert.issuer }}.
              </p>
              <img :src="statueImages[2]" class="w-16 h-20 sm:w-24 sm:h-28 object-contain mx-auto mix-blend-multiply" alt="" />
            </div>
            <div>
              <span class="font-bold text-xl sm:text-3xl uppercase tracking-wider">{{ cert.date }}</span>
            </div>
          </div>

          <!-- Template C -->
          <div v-else-if="getTemplate(cert, index) === 'C'" class="h-full flex flex-col justify-between p-5 sm:p-8 text-flax-smoke-950 relative">
            <div>
              <h3 class="font-fancy font-black text-3xl sm:text-4xl uppercase tracking-tighter leading-[0.9]">ROFIKUL*</h3>
              <img :src="statueImages[1]" class="absolute top-0 right-0 w-24 h-32 sm:w-36 sm:h-48 object-cover mix-blend-multiply" alt="" />
            </div>
            <div class="flex-grow flex flex-col justify-center my-4 max-w-[75%] sm:max-w-[65%]">
              <h4 class="font-fancy font-black text-xl sm:text-3xl uppercase leading-[0.85] tracking-tighter whitespace-normal" style="text-wrap: balance;">
                {{ cert.title }}
              </h4>
            </div>
            <div>
              <p class="font-mono text-[9px] sm:text-[10px] uppercase leading-relaxed whitespace-normal mb-2 sm:mb-4">
                RECOGNIZING <span class="font-bold">ROFIKUL HUDA</span><br/>
                FOR SIGNIFICANT CONTRIBUTIONS TO<br/>
                {{ cert.issuer }}
              </p>
              <div class="flex justify-between items-end">
                <span class="font-bold text-lg sm:text-xl uppercase tracking-wider">{{ cert.date }}</span>
                <div class="flex items-center gap-2">
                  <svg class="w-10 h-4 sm:w-14 sm:h-6 opacity-80" viewBox="0 0 100 30" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M5,25 Q15,5 25,15 T45,15 T65,10 Q80,0 95,20" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg class="w-6 h-6 sm:w-10 sm:h-10 opacity-90" viewBox="0 0 40 40" fill="currentColor">
                    <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" stroke-width="2"/>
                    <path d="M14 20l4 4 8-8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Template D -->
          <div v-else-if="getTemplate(cert, index) === 'D'" class="h-full flex flex-col p-5 sm:p-8 text-flax-smoke-950 relative z-10 overflow-hidden">
            <img :src="statueImages[0]" class="absolute -bottom-10 -right-10 w-48 sm:w-64 opacity-[0.15] object-contain mix-blend-multiply pointer-events-none" alt="" />
            <div class="flex justify-between items-start border-b-[1.5px] border-flax-smoke-950 pb-3 sm:pb-4 mb-4">
              <span class="font-bold text-[10px] sm:text-[11px] uppercase tracking-widest">ID-{{ String(index).padStart(4, '0') }}</span>
              <span class="bg-flax-smoke-950 text-flax-smoke-50 px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest">VERIFIED</span>
            </div>
            <h4 class="font-fancy font-black text-3xl sm:text-5xl uppercase leading-[0.85] tracking-tighter text-balance mb-auto mt-2">
              {{ cert.title }}
            </h4>
            <div class="mt-auto grid grid-cols-2 gap-4 border-t-[1.5px] border-flax-smoke-950 pt-3 sm:pt-4 relative z-10">
              <div>
                <span class="font-mono text-[8px] sm:text-[9px] uppercase opacity-60 block mb-1">ISSUED BY</span>
                <span class="font-bold text-[10px] sm:text-xs uppercase leading-tight">{{ cert.issuer }}</span>
              </div>
              <div class="text-right">
                <span class="font-mono text-[8px] sm:text-[9px] uppercase opacity-60 block mb-1">ACHIEVED ON</span>
                <span class="font-bold text-[11px] sm:text-[13px] uppercase tracking-wider">{{ cert.date }}</span>
              </div>
            </div>
          </div>

          <!-- Template E -->
          <div v-else class="h-full flex flex-col justify-between p-5 sm:p-8 text-flax-smoke-950 relative overflow-hidden">
            <div class="flex justify-between items-center z-10">
              <h3 class="font-fancy font-black text-2xl sm:text-3xl uppercase tracking-tighter leading-none">ROFIKUL*</h3>
              <div class="w-2 h-2 rounded-full bg-flax-smoke-950"></div>
            </div>
            <div class="relative my-4 sm:my-6 flex-grow flex flex-col justify-center z-10">
              <h4 class="font-fancy font-black text-2xl sm:text-4xl uppercase leading-[0.9] tracking-tighter text-balance relative z-10">
                {{ cert.title }}
              </h4>
              <img :src="statueImages[1]" class="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-28 sm:w-32 sm:h-40 object-cover opacity-20 mix-blend-multiply pointer-events-none" alt="" />
            </div>
            <div class="flex flex-col gap-2 font-mono text-[8px] sm:text-[9px] uppercase z-10">
              <div class="flex justify-between border-b border-flax-smoke-300 pb-1.5 sm:pb-2">
                <span class="opacity-60">RECIPIENT:</span>
                <span class="font-bold">ROFIKUL HUDA</span>
              </div>
              <div class="flex justify-between border-b border-flax-smoke-300 pb-1.5 sm:pb-2">
                <span class="opacity-60">AUTHORITY:</span>
                <span class="font-bold">{{ cert.issuer }}</span>
              </div>
              <div class="flex justify-between pt-1">
                <span class="opacity-60">DATE:</span>
                <span class="font-bold tracking-widest text-[9px] sm:text-[10px]">{{ cert.date }}</span>
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
  import { onBeforeMount, onMounted, onUnmounted, ref, nextTick, watch, computed } from 'vue';
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
  const getTemplate = (cert: Certification, index: number): 'A' | 'B' | 'C' | 'D' | 'E' => {
    const templates: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];
    if (cert.id) {
      let hash = 0;
      for (let i = 0; i < cert.id.length; i++) {
        hash = ((hash << 5) - hash) + cert.id.charCodeAt(i);
        hash |= 0;
      }
      return templates[Math.abs(hash) % 5];
    }
    return templates[index % 5];
  };

  // For marquee: duplicate items to create seamless loop
  const marqueeItems = computed(() => {
    if (certifications.value.length === 0) return [];
    // Duplicate 3 times for seamless loop
    return [...certifications.value, ...certifications.value, ...certifications.value];
  });

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

  // Marquee state and ref
  const marqueeContainer = ref<HTMLElement | null>(null);

  let currentX = 0;
  const isDragging = ref(false);
  let startX = 0;
  let startScrollX = 0;
  let velocityX = 0;
  let lastPointerX = 0;
  let lastTime = 0;
  let animationFrameId: number | null = null;
  let oneSetWidth = 0;
  const autoScrollSpeed = -0.8; // pixels per frame. Negative means moving left.
  let inertiaVelocity = 0;
  let isInertia = false;
  const friction = 0.95;

  // Drag threshold to prevent clicking card when dragging
  const wasDragged = ref(false);

  const updateDimensions = () => {
    const container = marqueeContainer.value;
    if (!container || !container.children.length) return;

    const totalCards = certifications.value.length;
    if (totalCards === 0) return;

    const firstCard = container.children[0] as HTMLElement;
    const gap = 24; // gap-6 is 24px
    const cardWidth = firstCard.offsetWidth + gap;
    oneSetWidth = cardWidth * totalCards;
  };

  const wrapX = () => {
    if (oneSetWidth <= 0) return;
    // Set 2 starts at -oneSetWidth and ends at -2 * oneSetWidth.
    // We keep currentX in the range [-2 * oneSetWidth, -oneSetWidth].
    while (currentX > -oneSetWidth) {
      currentX -= oneSetWidth;
    }
    while (currentX < -2 * oneSetWidth) {
      currentX += oneSetWidth;
    }
  };

  const animate = () => {
    if (oneSetWidth <= 0) {
      animationFrameId = requestAnimationFrame(animate);
      return;
    }

    if (isDragging.value) {
      // Position is updated in pointermove handler
    } else if (isInertia) {
      currentX += inertiaVelocity;
      inertiaVelocity *= friction;

      wrapX();

      // Once absolute inertia falls to auto scroll speed, return to auto-scroll
      if (Math.abs(inertiaVelocity) <= Math.abs(autoScrollSpeed)) {
        isInertia = false;
        inertiaVelocity = 0;
      }
    } else {
      // Constant auto-scroll
      currentX += autoScrollSpeed;
      wrapX();
    }

    if (marqueeContainer.value) {
      marqueeContainer.value.style.transform = `translate3d(${currentX}px, 0, 0)`;
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  const initMarquee = () => {
    updateDimensions();
    if (oneSetWidth > 0 && currentX === 0) {
      currentX = -oneSetWidth;
    }

    if (animationFrameId === null) {
      animate();
    }
  };

  // Pointer Handlers
  const handlePointerDown = (e: PointerEvent) => {
    if (oneSetWidth <= 0) return;

    // Only allow primary button dragging
    if (e.button !== 0) return;

    isDragging.value = true;
    isInertia = false;
    inertiaVelocity = 0;
    wasDragged.value = false;

    startX = e.clientX;
    startScrollX = currentX;

    lastPointerX = e.clientX;
    lastTime = performance.now();
    velocityX = 0;

    marqueeContainer.value?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging.value) return;

    const deltaX = e.clientX - startX;
    
    // If movement is larger than 6px, mark as dragged
    if (Math.abs(deltaX) > 6) {
      wasDragged.value = true;
    }

    currentX = startScrollX + deltaX;
    wrapX();

    const now = performance.now();
    const dt = now - lastTime;
    if (dt > 0) {
      const instantVelocity = (e.clientX - lastPointerX) / dt; // px/ms
      const instantVelocityPxPerFrame = instantVelocity * 16.7; // px/frame
      velocityX = velocityX * 0.4 + instantVelocityPxPerFrame * 0.6;
    }

    lastPointerX = e.clientX;
    lastTime = now;
  };

  const handlePointerUp = (e: PointerEvent) => {
    if (!isDragging.value) return;
    isDragging.value = false;
    marqueeContainer.value?.releasePointerCapture(e.pointerId);

    const maxVelocity = 40;
    velocityX = Math.max(-maxVelocity, Math.min(maxVelocity, velocityX));

    if (Math.abs(velocityX) > 0.5) {
      isInertia = true;
      inertiaVelocity = velocityX;
    } else {
      isInertia = false;
    }
  };

  // Mouse wheel listener that maps vertical and horizontal scrolls to marquee movement
  const handleWheel = (e: WheelEvent) => {
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    if (delta === 0) return;

    // Intercept scroll
    e.preventDefault();

    isInertia = true;
    currentX -= delta * 0.4; // adjusts sensitivity
    wrapX();

    // Set decaying momentum from scroll
    inertiaVelocity = -delta * 0.12;
  };

  // Handle card click, preventing trigger if dragging
  const handleCardClick = (cert: Certification) => {
    if (wasDragged.value) {
      wasDragged.value = false;
      return;
    }
    openModal(cert);
  };

  const handleResize = () => {
    const prevOneSetWidth = oneSetWidth;
    updateDimensions();
    if (prevOneSetWidth > 0 && oneSetWidth > 0) {
      const ratio = currentX / prevOneSetWidth;
      currentX = ratio * oneSetWidth;
      wrapX();
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

    // Start marquee
    initMarquee();

    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
    window.removeEventListener('resize', handleResize);
  });

  // Re-init marquee when data loads
  watch(certifications, async () => {
    await nextTick();
    ScrollTrigger.refresh();
    initMarquee();
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
