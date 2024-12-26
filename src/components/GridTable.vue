<template>
  <div class="grid grid-cols-4 gap-4 font-bold text-center mb-4">
    <header>
      <slot name="header" />
    </header>
    <slot name="default" />
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const my_const = ref('')

const props = defineProps<{
  gap?: number
}>()
</script>