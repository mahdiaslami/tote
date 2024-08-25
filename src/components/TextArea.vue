<script setup lang="ts">
import { ref, watch, nextTick, reactive } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  }
})

const model = defineModel<string>({ required: true })

const emit = defineEmits(['keyup'])

const textarea = ref<HTMLTextAreaElement | null>(null)
const div = ref<HTMLDivElement | null>(null)

defineExpose({
  focus: () => textarea.value?.focus(),
  blur: () => textarea.value?.blur(),
  insertText: insertText,
})

watch(
  model,
  () => {
    updateMirror()
    nextTick(updateHeight)
  }
)

document.addEventListener(
  'selectionchange',
  () => document.activeElement === textarea.value && updateMirror()
);

const mirror = reactive({
  pre: '',
  post: ''
})

function updateMirror() {
  if (!textarea.value) {
    return
  }

  const caretPostion = textarea.value.selectionStart
  mirror.pre = model.value.substring(0, caretPostion)
  mirror.post = model.value.substring(caretPostion)
}

function updateHeight() {
  if (!textarea.value || !div.value) {
    return
  }

  textarea.value.style.height = ''
  textarea.value.style.height = `${textarea.value.scrollHeight}px`

  const pt = getComputedStyle(div.value, 'padding-top')
  const pb = getComputedStyle(div.value, 'padding-bottom')

  const height = textarea.value.scrollHeight + pt + pb

  if (div.value.clientHeight !== height) {
    div.value.style.height = `${height}px`
  }
}

function getComputedStyle(el: Element, property: string) {
  return parseInt(window.getComputedStyle(el, null).getPropertyValue(property))
}

function insertText(txt: string) {
  if (textarea.value) {
    const caretPostion = textarea.value.selectionStart

    const pre = model.value.substring(0, textarea.value.selectionStart)
    const post = model.value.substring(textarea.value.selectionEnd)

    model.value = pre + txt + post;

    setTimeout(() => {
      if (textarea.value) {
        textarea.value.selectionStart = textarea.value.selectionEnd = caretPostion + txt.length
      }
    }, 1);
  }
}
</script>

<template>
  <div ref="div"
    class="relative min-w-0 h-12 transition-[height]">
    <span v-show="model.length === 0"
      class="absolute select-none text-pen/40"
      @click="textarea?.focus()">{{ placeholder }}</span>

    <div class="relative">
      <textarea ref="textarea"
        class=" block z-10 outline-none relative bg-transparent caret-transparent resize-none overflow-hidden w-full"
        rows="1"
        v-model="model"
        @keyup="(ev) => emit('keyup', ev)">
        {{ modelValue }}
      </textarea>

      <!-- Mirror -->
      <div class="absolute inset-0 select-none outline-none text-transparent whitespace-pre-wrap break-words">
        {{ mirror.pre }}<span class="h-full animate-blink border border-blue-600"></span>{{ mirror.post }}
      </div>
    </div>
  </div>
</template>

