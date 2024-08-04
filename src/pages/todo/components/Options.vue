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

</script>

<template>
  <div class="bg-secondary/25 px-6 z-10 flex flex-col overflow-y-scroll">
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

    <div class="flex-grow text-lg pt-4 flex flex-row-reverse flex-wrap justify-around items-start">
      <button v-for="emoji in emojies"
        class="active:opacity-30 text-xl transition-opacity select-none min-w-6 min-h-6 p-2 touch-none"
        @mousedown.prevent="insertTextAndPreserveCursor(emoji)"
        @touchstart.prevent="insertTextAndPreserveCursor(emoji)">
        {{ emoji }}
      </button>
    </div>
  </div>
</template>
