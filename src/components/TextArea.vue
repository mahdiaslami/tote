<script setup lang="ts">
import { ref, watch, nextTick, reactive } from 'vue'

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

defineExpose({
  focus: () => p.value?.focus(),
  blur: () => p.value?.blur(),
  insertText: insertTextAndPreserveCursor,
})

watch(
  () => props.modelValue,
  () => {
    updateMirror()
    nextTick(updateHeight)
  }
)

document.addEventListener(
  'selectionchange',
  () => document.activeElement === p.value && updateMirror()
);

const mirror = reactive({
  pre: '',
  post: ''
})

function updateMirror() {
  const selection = window.getSelection()
  if (selection && selection.rangeCount) {
    const range = selection.getRangeAt(0)

    const caretPostion = range.startOffset
    mirror.pre = props.modelValue.substring(0, caretPostion)
    mirror.post = props.modelValue.substring(caretPostion)
  }
}

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

function insertTextAndPreserveCursor(txt: string) {
  const selection = window.getSelection()
  if (selection && selection.rangeCount && props.modelValue && props.modelValue.length > 0) {
    let range = selection.getRangeAt(0)

    const prefix = props.modelValue.slice(0, range.startOffset)
    const suffix = props.modelValue.slice(range.endOffset, props.modelValue.length)

    // logically each emoji is 2 or more character, but cursor assume
    // it is one character.
    const cursorOffset = prefix.replace(/\p{Emoji_Presentation}/ug, 'e').length

    emit('update:modelValue', prefix + txt + suffix)

    nextTick(() => {
      for (let i = 0; i <= cursorOffset; i++) {
        selection.modify('move', 'forward', 'character')
      }
    })
  } else {
    emit('update:modelValue', txt)
  }
}
</script>

<template>
  <div ref="div"
    class="relative min-w-0 h-12 transition-[height]">
    <span v-show="modelValue.length === 0"
      class="absolute select-none text-pen/40"
      @click="p?.focus()">{{ placeholder }}</span>

    <div class="px-1 -mx-1 relative">
      <p ref="p"
        contenteditable="true"
        class="z-10 outline-none relative bg-transparent caret-transparent"
        @input="(ev) => emit('update:modelValue', p?.innerText)"
        @keyup="(ev) => emit('keyup', ev)">
        {{ modelValue }}
      </p>

      <!-- Mirror -->
      <div class="absolute px-1 inset-0 select-none outline-none text-transparent">
        <span>{{ mirror.pre }}</span>
        <span class="animate-blink border border-blue-600"></span>
        <span>{{ mirror.post }}</span>
      </div>
    </div>


  </div>
</template>

