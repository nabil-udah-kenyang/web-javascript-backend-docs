<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  id: string
  title?: string
  description?: string
  items: string[]
}>()

const storageKey = `js-ts-backend:checkpoint:${props.id}`
const checked = ref<boolean[]>(props.items.map(() => false))

const completed = computed(() => checked.value.filter(Boolean).length)
const progress = computed(() => Math.round((completed.value / props.items.length) * 100))

onMounted(() => {
  const saved = window.localStorage.getItem(storageKey)
  if (!saved) return

  try {
    const parsed = JSON.parse(saved)
    if (Array.isArray(parsed) && parsed.length === props.items.length) {
      checked.value = parsed.map((value) => value === true)
    }
  } catch {
    window.localStorage.removeItem(storageKey)
  }
})

watch(checked, (value) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, JSON.stringify(value))
  }
}, { deep: true })
</script>

<template>
  <section class="checkpoint-card" :aria-labelledby="`${id}-title`">
    <div class="checkpoint-header">
      <div>
        <p class="checkpoint-eyebrow">Checkpoint</p>
        <h3 :id="`${id}-title`">{{ title || 'Cek pemahamanmu' }}</h3>
      </div>
      <span class="checkpoint-count">{{ completed }}/{{ items.length }}</span>
    </div>

    <p v-if="description" class="checkpoint-description">{{ description }}</p>

    <div class="checkpoint-progress" aria-hidden="true">
      <span :style="{ width: `${progress}%` }" />
    </div>

    <label v-for="(item, index) in items" :key="item" class="checkpoint-item">
      <input v-model="checked[index]" type="checkbox" />
      <span>{{ item }}</span>
    </label>

    <p class="checkpoint-saved">
      {{ progress === 100 ? 'Semua poin selesai. Mantap, lanjut ke tahap berikutnya.' : 'Progress tersimpan otomatis di browser ini.' }}
    </p>
  </section>
</template>
