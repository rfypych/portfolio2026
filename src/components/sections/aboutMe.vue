<template>
  <section
    id="about-me-section"
    class="common-padding text-flax-smoke-200 relative z-10 overflow-y-clip rounded-b-3xl bg-[#0B0B0A] shadow-2xl will-change-auto sm:mt-0"
  >
    <div class="md:column-gap grid grid-cols-12">
      <div class="hide-on-mobile overflow-hidden md:col-span-4">
        <svg
          id="down-arrow-2"
          stroke="currentColor"
          fill="none"
          stroke-width="1.25"
          viewBox="6 6 12 12"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="hide-on-mobile m-0 size-20 -translate-x-full p-0"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="7" y1="7" x2="17" y2="17"></line>
          <polyline points="17 7 17 17 7 17"></polyline>
        </svg>
      </div>

      <h3
        id="little-bit-about-me"
        v-html="aboutMe"
        class="heading-1-alt lg:heading-1 section-heading col-span-full leading-none font-extrabold uppercase md:col-span-8 md:col-start-6"
      ></h3>
    </div>

    <div class="padding-y md:column-gap mt-6 grid grid-cols-12">
      <div
        class="pointer-events-none col-span-full content-end rounded-lg select-none md:col-span-4"
      >
        <video
          v-if="settings.aboutPhoto && isVideo(settings.aboutPhoto)"
          :src="settings.aboutPhoto"
          autoplay
          muted
          loop
          playsinline
          class="aspect-[1/1.5] rounded-lg object-cover object-top mix-blend-screen brightness-90 grayscale"
        ></video>
        <img
          v-else
          :src="settings.aboutPhoto || profile2Fallback"
          class="aspect-[1/1.5] rounded-lg object-cover object-top mix-blend-screen brightness-90 grayscale"
          alt="Rofikul Huda - Developer and Security Researcher portrait"
        />
      </div>
      <div class="col-span-11 mt-10 md:col-span-8 md:col-start-6">
        <p
          class="heading-4 relative w-full max-w-[40ch] leading-snug font-medium text-balance"
        >
          I specialize in web development and cybersecurity. My work process
          focuses on practicality, clean code, and logical problem-solving,
          taking projects from initial ideation to secure deployment.
        </p>

        <div
          class="text-flax-smoke-300 mt-[5%] flex justify-start gap-10 sm:gap-20"
        >
          <p class="heading-6 text-flax-smoke-300/85 text-center text-nowrap">
            ( ABOUT ME )
          </p>
          <p class="heading-6 font-fancy w-full text-balance sm:max-w-[40ch]">
            Building secure digital experiences is my main priority. I pay
            close attention to system architecture and proactive
            problem-solving. <br /><br />
            Outside of work, I spend my time playing games and listening to
            music.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import {
    animateSplitText,
    xToZero,
    animateAboutMeSectionLeave,
  } from '@/animations';
  import { profile2 as profile2Fallback } from '@/assets/images';
  import { textSplitterIntoChar, isVideo } from '@/functions';
  import { onBeforeMount, onMounted, ref } from 'vue';
  import { useSettings } from '@/composables/useSettings';

  const { settings, fetchSettings } = useSettings();
  const aboutMe = ref('ٍSelected Projects /');

  onBeforeMount(() => {
    aboutMe.value = textSplitterIntoChar(
      'Developer, Security Researcher, AI Enthusiast/',
      true,
      true,
    );
  });

  onMounted(() => {
    fetchSettings();

    animateSplitText(
      '#little-bit-about-me .letters',
      '#little-bit-about-me',
      1,
      0.01,
      0,
      () => {
        xToZero('#down-arrow-2');
      },
    );

    animateAboutMeSectionLeave('#about-me-section');
  });
</script>
