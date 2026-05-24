<template>
  <section id="works" class="common-padding mb-20">
    <div class="flex flex-col">
      <h3
        id="selectedWorks"
        v-html="selectedWorks"
        class="heading-1 text-start leading-none font-bold uppercase"
      ></h3>
      <p
        class="heading-1 text-flax-smoke-400 text-opacity-50 hidden w-4/5 text-end font-extrabold sm:block"
      >
        ( {{ selectedWorksProps.length }} )
      </p>

      <div
        id="selected-works-text"
        class="md:column-gap text-flax-smoke-300 mt-[5%] grid grid-cols-12 justify-end opacity-0 lg:grid"
      >
        <p
          class="heading-6 text-flax-smoke-300/85 col-span-4 text-center text-nowrap lg:col-start-2"
        >
          (
          <span class="inline sm:hidden">{{ selectedWorksProps.length }} </span>
          PROJECTS )
        </p>
        <p
          class="heading-4 font-fancy col-span-8 w-full text-balance sm:font-semibold lg:col-span-7"
        >
          A selection of web development projects and security research. Some
          details are intentionally omitted to comply with active Non-Disclosure
          Agreements (NDAs).
        </p>
      </div>
    </div>

    <div
      class="sm:column-gap relative mt-12 grid size-full grid-cols-12 lg:mt-[10%]"
    >
      <div
        class="text-flax-smoke-100 sticky top-12 col-span-5 hidden h-fit w-full overflow-hidden text-[22vw] leading-[0.8] font-semibold md:flex"
      >
        <span class="font-title! relative -tracking-wider">0</span>
        <span
          id="index"
          class="font-title! relative -tracking-wider will-change-transform"
          >{{ index + 1 }}.</span
        >
      </div>
      <aside
        @mouseenter="showCursor"
        @mouseleave="hideCursor"
        class="relative col-span-full flex flex-col space-y-10 md:col-span-7"
      >
        <div
          v-for="(work, i) in selectedWorksProps"
          :key="i"
          class="work-card @container"
        >
          <a class="group" target="_blank" :href="work.url">
            <div
              class="flex-center relative aspect-square overflow-clip rounded-lg"
            >
              <video
                v-if="work.imageBg && isVideo(work.imageBg)"
                autoplay
                muted
                loop
                playsinline
                class="absolute size-full object-cover select-none"
                :src="work.imageBg"
              ></video>
              <img
                v-else
                alt="work-background"
                loading="lazy"
                class="absolute size-full object-cover select-none"
                :src="work.imageBg"
              />
              <div
                class="flex-center z-10 aspect-4/3 size-full overflow-clip rounded-lg object-cover"
              >
                <!-- autoplay="false" -->
                <video
                  v-if="work.videoSrc && isVideo(work.videoSrc)"
                  ref="videoRefs"
                  :src="work.videoSrc"
                  muted
                  :autoplay="false"
                  class="size-[80%] rounded-md object-contain blur transition-all duration-500 ease-in-out"
                ></video>
                <img
                  v-else-if="work.videoSrc"
                  ref="videoRefs"
                  class="size-[80%] rounded-md object-contain blur transition-all duration-500 ease-in-out"
                  :src="work.videoSrc"
                />
              </div>
            </div>
            <div>
              <p class="heading-6 font-title! mt-[2%] mb-[1%] leading-none">
                {{ work.category }}
              </p>
              <div class="items-center justify-between sm:flex">
                <h3 class="heading-3 font-title! font-bold uppercase">
                  {{ work.name }}
                </h3>
                <div class="flex gap-1.5 select-none">
                  <p
                    class="border-flax-smoke-300 hover:bg-flax-smoke-300 hover:text-flax-smoke-900 rounded-full border px-4 py-2 transition-[background-color,color] duration-500 ease-in-out"
                    v-for="tag in work.tags"
                    :key="tag"
                  >
                    <span>{{ tag }}</span>
                  </p>
                  <p
                    class="border-flax-smoke-300 bg-flax-smoke-300 text-flax-smoke-900 hover:text-flax-smoke-300 rounded-full border px-4 py-2 transition-[background-color,color] duration-500 ease-in-out hover:bg-transparent"
                  >
                    <span>{{ work.year }}</span>
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { animateSplitText } from '@/animations';
  import { textSplitterIntoChar, isVideo } from '@/functions';
  import { computed, onBeforeMount, onMounted, ref, useTemplateRef, nextTick } from 'vue';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { useWindowSize } from '@vueuse/core';
  import { useProjects } from '@/composables/useProjects';

  const videoRefs = useTemplateRef<HTMLVideoElement[]>('videoRefs');

  const isSmallScreen = computed(() => {
    return useWindowSize().width.value < 768;
  });
  const index = ref(0);
  const selectedWorks = ref('Selected Projects /');

  const tl = gsap
    .timeline({ defaults: { duration: 0.25 } })
    .to(['#cursor', '#inner'], {
      scale: 1,
      opacity: 1,
    })
    .paused(true);

  const showCursor = () => {
    tl.play();
  };
  const hideCursor = () => {
    tl.reverse();
  };

  const { projects: selectedWorksProps, fetchProjects } = useProjects();

  // Reusable function to handle forward scroll animation
  const createForwardTimeline = (
    index: any,
    i: any,
    selectedWorksProps: any[],
  ) => {
    const tl = gsap.timeline({
      defaults: { duration: 0.3 },
    });

    // Set and move the #index element
    tl.set('#index', {
      yPercent: 100,
      onComplete: () => {
        index.value = Math.min(i, selectedWorksProps.length - 1);
      },
    }).to('#index', {
      yPercent: 0,
      ease: 'power1.inOut',
    });

    return tl;
  };

  // Reusable function to handle backward scroll animation
  const createBackwardTimeline = (index: any, i: any) => {
    const tl = gsap.timeline({ defaults: { duration: 0.3 } });

    // Set and move the #index element
    tl.set('#index', {
      yPercent: -100,
      onComplete: () => {
        index.value = Math.max(i, 0);
      },
    }).to('#index', {
      yPercent: 0,
      duration: 0.3,
      ease: 'power1.inOut',
    });

    return tl;
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const media = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        if ('play' in media && typeof (media as any).play === 'function') {
          (media as HTMLVideoElement).play().catch(() => {});
        }
        media.classList.remove('blur');
      }
    });
  };

  const stopAllVideos = () => {
    videoRefs.value?.map((video: HTMLElement) => {
      if (video && 'pause' in video && typeof (video as any).pause === 'function' && !(video as any).paused) {
        (video as HTMLVideoElement).pause();
        (video as HTMLVideoElement).currentTime = 0; // Reset video to the start
      }
    });
  };
  onBeforeMount(() => {
    selectedWorks.value = textSplitterIntoChar('Selected Works / ', true);
  });

  onMounted(async () => {
    await fetchProjects();
    await nextTick();
    ScrollTrigger.refresh();

    stopAllVideos();

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.75, // Trigger when 75% of the video is visible
    });

    // Observe each media element
    videoRefs.value?.forEach((media) => {
      if (media) {
        observer.observe(media);
      }
    });

    animateSplitText(
      '#selectedWorks .letters',
      '#selected-works-text',
      0.7,
      0.01,
      0,
    );

    // Apply GSAP animations to each div
    if (!isSmallScreen.value && selectedWorksProps.value.length > 0)
      gsap.utils.toArray('.work-card').forEach((div: any, i: any) => {
        gsap.timeline({ defaults: { duration: 0.7 } }).to(div, {
          scrollTrigger: {
            trigger: div,
            // start: 'top 40%',
            start: 'top 25%',
            // end: 'bottom 40%',
            end: 'bottom 25%',
            scrub: 0.01,
            // markers: true,
            onLeaveBack: () => {
              // Backward scroll animation
              if (index.value !== 0) {
                gsap.to('#index', {
                  yPercent: 100,
                  duration: 0.3,
                  ease: 'power4.inOut',
                  onComplete: () => {
                    createBackwardTimeline(index, i - 1);
                  },
                });
              }
            },
          },
          ease: 'power1.inOut',
          onComplete: () => {
            // Forward scroll animation
            if (index.value !== selectedWorksProps.value.length - 1) {
              gsap.to('#index', {
                yPercent: -100,
                duration: 0.3,
                ease: 'power4.inOut',
                onComplete: () => {
                  createForwardTimeline(index, i + 1, selectedWorksProps.value);
                },
              });
            }
          },
        });
      });
  });
</script>
