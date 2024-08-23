<script setup lang="ts">
import { type Schedule } from '@/types';
import { watch } from 'vue';
import CalendarMarkIcon from '@/components/icons/CalendarMarkIcon.vue'
import DangerTriangleIcon from '@/components/icons/DangerTriangleIcon.vue'
import Emojis from './Emojis.vue'

const props = defineProps<{
  forceDaily: boolean
}>()

const type = defineModel<Schedule>('type')
const emit = defineEmits(['emoji'])

watch(props, () => type.value = props.forceDaily ? 'daily' : type.value)

let hammer
const vTap = {
  mounted(el: HTMLElement, { value }: { value: HammerListener }) {
    hammer = new Hammer(el)

    hammer.on('tap', value)
  }
}

</script>

<template>
  <div class="bg-secondary-1 px-1 flex flex-col overflow-y-scroll">
    <div class="text-xs font-semibold text-pen/30 mt-2 p-0.5 rounded-full w-fit">
      <button class="transition-colors rounded-full px-2 py-1"
        :class="{
          'bg-secondary-2 text-pen/60': type == 'daily',
          'opacity-50': forceDaily
        }"
        v-tap="() => type = 'daily'">
        <CalendarMarkIcon class="transition-[stroke] inline-block h-5 w-5 ml-1"
          :class="[type == 'daily' ? 'stroke-pen/60' : 'stroke-pen/30']" />
        روزانه
      </button>

      <button class="transition-colors rounded-full px-2 py-1"
        :class="{
          'bg-secondary-2 text-pen/60': type == 'mandatory',
          'opacity-50': forceDaily
        }"
        v-tap="() => type = 'mandatory'">
        <DangerTriangleIcon class="transition-[stroke] inline-block h-5 w-5 ml-1"
          :class="[type == 'mandatory' ? 'stroke-pen/60' : 'stroke-pen/30']" />
        اجباری
      </button>
    </div>

    <Emojis class="pt-2"
      @tap="(emoji) => emit('emoji', emoji)" />
  </div>
</template>

<style>
.emoji-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
}
</style>
