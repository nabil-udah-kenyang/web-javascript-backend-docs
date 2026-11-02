<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import LottieAnimation from './LottieAnimation.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <div class="home-lottie-shell">
        <LottieAnimation
          src="/lotties/JavaScript.json"
          label="Animasi JavaScript"
        />
      </div>
    </template>
  </Layout>
</template>
