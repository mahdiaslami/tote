<script setup lang="ts">
import { ref, nextTick, reactive, onUpdated, type Ref, watch } from 'vue'

const textarea = ref<HTMLTextAreaElement | null>(null)
const div = ref<HTMLDivElement | null>(null)

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'keyup'])

useDynamicHeight()
const mirror = useMirror()
const editor = useEditor()

defineExpose({
  focus: () => textarea.value?.focus(),
  blur: () => textarea.value?.blur(),
  insertText: (text: string) => editor.insert(text),
})

function useMirror() {
  const mirror = reactive({
    pre: '',
    post: '',

    update() {
      if (!textarea.value) {
        return
      }

      const caretPosition = textarea.value.selectionStart
      this.pre = props.modelValue.substring(0, caretPosition)
      this.post = props.modelValue.substring(caretPosition)

      console.log('mirror.update', caretPosition);
    }
  })

  document.addEventListener(
    'selectionchange',
    () => mirror.update()
  );

  onUpdated(() => nextTick(() => mirror.update()))

  return mirror
}

function useDynamicHeight() {
  onUpdated(() => nextTick(() => {
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
  }))
}

function getComputedStyle(el: Element, property: string) {
  return parseInt(window.getComputedStyle(el, null).getPropertyValue(property))
}

function useEditor() {
  const editor = {
    caretPosition: 0,

    insert(text: string) {
      if (!textarea.value) {
        return
      }

      this.caretPosition = textarea.value.selectionStart

      this.updateTextarea(
        textarea.value,
        textarea.value.selectionStart,
        textarea.value.selectionEnd,
        text
      )
    },

    updateTextarea(textarea: HTMLTextAreaElement, selectionStart: number, selectionEnd: number, text: string) {
      const pre = props.modelValue.substring(0, selectionStart)
      const post = props.modelValue.substring(selectionEnd)

      textarea.value = pre + text + post
      this.caretPosition += text.length
      emit('update:modelValue', textarea.value)

      // I don't know why! but the only way that updating caret work is this.
      setTimeout(() => this.updateCaret(), 1);
    },

    updateCaret() {
      if (textarea.value) {
        textarea.value.selectionStart = textarea.value.selectionEnd = editor.caretPosition
        document.dispatchEvent(new Event('selectionchange'))
      }
    }
  }

  return editor
}

</script>

<template>
  <div ref="div"
    class="relative min-w-0 h-12 transition-[height]">
    <span v-show="modelValue.length === 0"
      class="absolute select-none text-pen/40"
      @click="textarea?.focus()">{{ placeholder }}</span>

    <div class="relative">
      <textarea ref="textarea"
        class="block z-10 outline-none relative bg-transparent caret-transparent resize-none overflow-hidden w-full"
        style="unicode-bidi: embed;"
        rows="1"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        @keyup="(ev) => emit('keyup', ev)">
        {{ modelValue }}
      </textarea>

      <!-- Mirror -->
      <div class="absolute inset-0 select-none outline-none text-transparent whitespace-pre-wrap break-words"
        style="unicode-bidi: embed;">
        {{ mirror.pre }}<span class="h-full animate-blink border border-blue-600"></span>{{ mirror.post }}
      </div>
    </div>
  </div>
</template>

