<script setup lang="ts">
import { type Schedule } from '@/types';
import { mergeProps, nextTick, watch } from 'vue';

const props = defineProps<{
  forceDaily: boolean
}>()

const model = defineModel<boolean>()
const content = defineModel<string>('content')
const type = defineModel<Schedule>('type')

watch(props, () => type.value = props.forceDaily ? 'daily' : type.value)

const emojies = ['✨', '😍', '🤔', '😬', '⏰', '🚀', '🚨']

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

function toggleType() {
  if (!props.forceDaily) {
    type.value = (type.value == 'daily') ? 'mandatory' : 'daily'
  }
}

</script>

<template>
  <Transition name="content-menu"
    :duration="300">
    <div v-if="model"
      class="bg-secondary border-t border-line py-2 z-10 h-12 flex flex-row overflow-y-hidden">

      <div class="flex-grow text-lg flex flex-row-reverse justify-around">
        <button v-for="emoji in emojies"
          class="active:opacity-30 transition-opacity"
          @mousedown.prevent="insertTextAndPreserveCursor(emoji)"
          @touchstart.prevent="insertTextAndPreserveCursor(emoji)">
          {{ emoji }}
        </button>
      </div>

      <div class="border-r border-line px-2">
        <button class="transition-colors rounded px-2 py-1 font-light"
          :class="{
            'bg-info text-white': type == 'mandatory',
            'opacity-50': forceDaily
          }"
          @mousedown.prevent="toggleType"
          @touchstart.prevent="toggleType">
          اجباری
        </button>
      </div>
    </div>
  </Transition>
</template>

<style>
.content-menu-enter-active {
  transition-property: height, padding;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.content-menu-leave-active {
  transition-property: height, padding;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.content-menu-enter-from,
.content-menu-leave-to {
  height: 0 !important;
  padding: 0 !important;
}
</style>