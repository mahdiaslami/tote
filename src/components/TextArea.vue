<script setup lang="ts">
import { ref, nextTick, reactive, onUpdated } from 'vue'

const textArea = ref<HTMLTextAreaElement | null>(null)
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
  focus: () => textArea.value?.focus(),
  blur: () => textArea.value?.blur(),
  insertText: (text: string) => editor.insert(text),
  removeText: () => editor.remove(),
})

function useMirror() {
  const mirror = reactive({
    pre: '',
    post: '',

    update() {
      if (!textArea.value) {
        return
      }

      const caretPosition = textArea.value.selectionStart
      this.pre = props.modelValue.substring(0, caretPosition)
      this.post = props.modelValue.substring(caretPosition)
    }
  })

  document.addEventListener(
    'selectionchange',
    () => mirror.update()
  )

  onUpdated(() => nextTick(() => mirror.update()))

  return mirror
}

function useDynamicHeight() {
  onUpdated(() => nextTick(() => {
    if (!textArea.value || !div.value) {
      return
    }

    textArea.value.style.height = ''
    textArea.value.style.height = `${textArea.value.scrollHeight}px`

    const pt = getComputedStyle(div.value, 'padding-top')
    const pb = getComputedStyle(div.value, 'padding-bottom')

    const height = textArea.value.scrollHeight + pt + pb

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
      if (!textArea.value) {
        return
      }

      this.caretPosition = textArea.value.selectionStart

      this.updateTextArea(
        textArea.value,
        textArea.value.selectionStart,
        textArea.value.selectionEnd,
        text
      )
    },

    remove() {
      if (!textArea.value) {
        return
      }

      let selectionStart = textArea.value.selectionStart
      let selectionEnd = textArea.value.selectionEnd

      if (selectionStart == selectionEnd) {
        const pre = props.modelValue.slice(0, selectionStart)
        const lastUtf8CharacterIndex = pre.search(/.$/u)
        selectionStart -= pre.length - lastUtf8CharacterIndex
      }

      this.caretPosition = selectionStart

      this.updateTextArea(
        textArea.value,
        selectionStart,
        selectionEnd,
        ''
      )
    },

    updateTextArea(
      textArea: HTMLTextAreaElement,
      selectionStart: number,
      selectionEnd: number,
      text: string
    ) {
      const pre = props.modelValue.substring(0, selectionStart)
      const post = props.modelValue.substring(selectionEnd)

      textArea.value = pre + text + post
      this.caretPosition += text.length
      this.updateCaret()
      mirror.update()
      emit('update:modelValue', textArea.value)
    },

    updateCaret() {
      if (textArea.value) {
        textArea.value.selectionStart = textArea.value.selectionEnd = editor.caretPosition
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
      @click="textArea?.focus()">{{ placeholder }}</span>

    <div class="relative">
      <textarea ref="textArea"
        class="block z-10 outline-none relative bg-transparent caret-transparent
          resize-none overflow-hidden w-full"
        style="unicode-bidi: embed;"
        rows="1"
        :value="modelValue"
        @input="emit(
          'update:modelValue',
          ($event.target as HTMLTextAreaElement).value
        )"
        @keyup="(ev) => emit('keyup', ev)" />

      <!-- Mirror -->
      <div class="absolute inset-0 select-none outline-none text-transparent
        whitespace-pre-wrap break-words"
        style="unicode-bidi: embed;">
        {{ mirror.pre }}<span class="h-full animate-blink border border-blue-600" />{{ mirror.post }}
      </div>
    </div>
  </div>
</template>
