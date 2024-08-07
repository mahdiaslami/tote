<script setup lang="ts">
import { type Schedule } from '@/types';
import { nextTick, watch } from 'vue';

const props = defineProps<{
  forceDaily: boolean
}>()

const content = defineModel<string>('content')
const type = defineModel<Schedule>('type')

watch(props, () => type.value = props.forceDaily ? 'daily' : type.value)

const emojies = [
  '😍', '🤔', '😬', '😇', '🤒', '🤢', '🤧', '😴',
  '✨', '⏰', '🚀', '🚨', '⭐', '❤️', '🔥', '🎥',
  '📕', '📚', '🖇️', '🧮', '💰', '🪙', '🎀', '🥽',
  '👔', '👕', '👖', '🧣', '💃', '🕺', '⛹️‍♂️', '⛹️‍♀️',
  '💇‍♂️', '💇‍♀️', '🤱'
]

function regex() {
  return new RegExp(emojies.join('|'), 'g')
}

function insertTextAndPreserveCursor(txt: string) {
  const selection = window.getSelection()
  if (selection && selection.rangeCount && content.value && content.value.length > 0) {
    let range = selection.getRangeAt(0)

    const prefix = content.value.slice(0, range.startOffset)
    const suffix = content.value.slice(range.endOffset, content.value.length)

    // logically each emoji is 2 or more character, but cursor assume
    // it is one character.
    const cursorOffset = prefix.replace(regex(), 'e').length

    content.value = prefix + txt + suffix

    nextTick(() => {
      for (let i = 0; i <= cursorOffset; i++) {
        selection.modify('move', 'forward', 'character')
      }
    })
  } else {
    content.value += txt
  }
}

let hammer
const vTap = {
  mounted: (el: HTMLElement, { value }: { value: HammerListener }) => {
    hammer = new Hammer(el)
    console.log('v-tap', el, value);

    hammer.on('tap', value)
  }
}

</script>

<template>
  <div class="bg-secondary/25 px-1 flex flex-col overflow-y-scroll">
    <div class="text-xs font-semibold text-black/25 mt-4">
      <button class="transition-colors rounded-full px-4 py-1"
        :class="{
          'bg-secondary text-black/50': type == 'daily',
          'opacity-50': forceDaily
        }"
        @mousedown.prevent="type = 'daily'"
        @touchstart.prevent="type = 'daily'">
        روزانه
      </button>

      <button class="transition-colors rounded-full px-4 py-1"
        :class="{
          'bg-secondary text-black/50': type == 'mandatory',
          'opacity-50': forceDaily
        }"
        @mousedown.prevent="type = 'mandatory'"
        @touchstart.prevent="type = 'mandatory'">
        اجباری
      </button>
    </div>

    <div class="pt-2 text-2.5xl emoji-list -mt-2">
      <button v-for="emoji in emojies"
        class="active:opacity-30 transition-opacity min-w-6 min-h-6 p-2 select-none"
        v-tap="() => insertTextAndPreserveCursor(emoji)">
        {{ emoji }}
      </button>
    </div>
  </div>
</template>

<style>
.emoji-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
}
</style>
