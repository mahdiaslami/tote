<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'

const props = defineProps({
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
const div = ref<HTMLDivElement | null>(null)

watch(
  () => props.modelValue,
  () => nextTick(updateHeight)
)

function updateHeight() {
  if (!p.value || !div.value) {
    return
  }

  const pt = getComputedStyle(div.value, 'padding-top')
  const pb = getComputedStyle(div.value, 'padding-bottom')

  const height = p.value.clientHeight + pt + pb

  if (div.value.clientHeight !== height) {
    div.value.style.height = `${height}px`
  }
}

function getComputedStyle(el: Element, property: string) {
  return parseInt(window.getComputedStyle(el, null).getPropertyValue(property))
}
</script>

<template>
  <div ref="div"
    class="relative min-w-0 h-12 transition-[height] overflow-y-hidden">
    <span v-show="modelValue.length === 0"
      class="absolute select-none text-mute"
      @click="p?.focus()">{{ placeholder }}</span>

    <p ref="p"
      contenteditable="true"
      class="z-10 px-1 -mx-1 outline-none relative"
      @input="(ev) => emit('update:modelValue', p?.innerText)"
      @keyup="(ev) => emit('keyup', ev)">
      {{ modelValue }}
    </p>
  </div>
</template>