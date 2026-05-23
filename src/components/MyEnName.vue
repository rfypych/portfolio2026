<template>
  <div
    class="flex w-full justify-between leading-[0.8] font-[900] text-flax-smoke-900"
    style="font-size: clamp(3rem, 16vw, 17.5rem); font-family: 'Bricolage Grotesque', sans-serif; letter-spacing: -0.02em;"
  >
    <span
      v-for="(letter, i) in letters"
      :key="i"
      class="name-letter inline-block translate-y-full will-change-transform"
    >{{ letter }}</span>
  </div>
</template>

<script setup lang="ts">
const name = 'ROFIKUL';
const letters = name.split('');
</script>
