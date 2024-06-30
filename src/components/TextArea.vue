<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'keyup'])

const p = ref<HTMLParagraphElement | null>(null)

</script>

<template>
  <div class="relative min-w-0">
    <span v-show="modelValue.length === 0"
      class="absolute select-none text-mute"
      @click="p?.focus()">{{ placeholder }}</span>

    <p ref="p"
      contenteditable="true"
      class="z-10 px-1 -mx-1 outline-none"
      @input="(ev) => emit('update:modelValue', p?.innerText)"
      @keyup="(ev) => emit('keyup', ev)">
      {{ modelValue }}
    </p>
  </div>
</template>