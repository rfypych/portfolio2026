<template>
  <div class="min-h-screen bg-[#0B0B0A] flex items-center justify-center p-8">
    <div class="w-full max-w-md">
      <!-- Logo / Header -->
      <div class="text-center mb-10">
        <p class="text-flax-smoke-400 text-sm tracking-widest uppercase mb-2">Portfolio</p>
        <h1 class="text-4xl font-bold text-flax-smoke-100">Admin Panel</h1>
      </div>

      <!-- Card -->
      <div class="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
        <h2 class="text-flax-smoke-300 text-lg font-semibold mb-6">Sign in to continue</h2>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs text-white/50 uppercase tracking-wider">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="admin@example.com"
              class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none text-flax-smoke-100 placeholder:text-white/30 focus:border-flax-smoke-400 transition-colors"
              required
            >
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs text-white/50 uppercase tracking-wider">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none text-flax-smoke-100 placeholder:text-white/30 focus:border-flax-smoke-400 transition-colors"
              required
            >
          </div>

          <p v-if="errorMsg" class="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
            {{ errorMsg }}
          </p>

          <button
            type="submit"
            :disabled="loading"
            class="mt-2 bg-flax-smoke-300 text-black py-3 rounded-lg font-bold hover:bg-flax-smoke-200 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign In</span>
          </button>
        </form>
      </div>

      <p class="text-center text-white/20 text-sm mt-6">
        <router-link to="/" class="hover:text-white/50 transition-colors">← Back to Portfolio</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMsg = ref('');

const handleLogin = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push({ name: 'admin' });
  } catch (error: any) {
    const code = error.code as string;
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
      errorMsg.value = 'Invalid email or password.';
    } else if (code === 'auth/user-not-found') {
      errorMsg.value = 'No account found with this email.';
    } else {
      errorMsg.value = 'An error occurred. Please try again.';
    }
  } finally {
    loading.value = false;
  }
};
</script>
