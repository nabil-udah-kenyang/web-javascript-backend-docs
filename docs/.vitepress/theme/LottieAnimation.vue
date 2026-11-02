<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{
  src: string
  label?: string
}>()

const container = ref<HTMLElement | null>(null)
let animation: { destroy: () => void } | undefined
let disposed = false

onMounted(async () => {
  const { default: lottie } = await import('lottie-web')
  if (disposed || !container.value) return

  const response = await fetch(withBase(props.src))
  const animationData = await response.json()

  if (disposed || !container.value) return

  animation = lottie.loadAnimation({
    container: container.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData
  })
})

onBeforeUnmount(() => {
  disposed = true
  animation?.destroy()
})
</script>

<template>
  <div
    ref="container"
    class="lottie-animation"
    role="img"
    :aria-label="label || 'Lottie animation'"
  />
</template>
