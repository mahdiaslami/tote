<script setup lang="ts">
import { type Schedule } from '@/types'
import { ref, watch } from 'vue'
import CalendarMarkIcon from '@/components/icons/CalendarMarkIcon.vue'
import DangerTriangleIcon from '@/components/icons/DangerTriangleIcon.vue'
import BackspaceIcon from '@/components/icons/BackspaceIcon.vue'
import Emojis from './Emojis.vue'

const props = defineProps<{
  forceDaily: boolean
}>()

const type = defineModel<Schedule>('type')
const emit = defineEmits(['emoji', 'backspace'])

watch(props, () => type.value = props.forceDaily ? 'daily' : type.value)

const footer = ref<boolean>(true)

let prvScrollTop = 0
function handleScroll(ev: any) {
  const curScrollTop = ev.target.scrollTop
  const target = ev.target

  if (curScrollTop > target.clientHeight
    && curScrollTop < (target.scrollHeight - 3 * target.clientHeight)) {
    footer.value = prvScrollTop - curScrollTop > 0
  } else {
    footer.value = true
  }

  prvScrollTop = curScrollTop
}

</script>

<template>
  <div class="bg-slate-50 px-1 flex flex-col overflow-y-scroll"
    @scroll="handleScroll">
    <div class="text-xs font-semibold
      text-slate-300 mt-2 p-0.5 rounded-full w-fit">
      <button v-touch:tap="() => type = 'daily'"
        class="transition-colors rounded-full px-2 py-1"
        :class="{
          'bg-slate-100 text-slate-500': type == 'daily',
        }">
        <CalendarMarkIcon class="transition-[stroke] inline-block h-5 w-5 ml-1"
          :class="[type == 'daily' ? 'stroke-slate-500' : 'stroke-slate-300']" />
        روزانه
      </button>

      <button v-touch:tap="() => type = 'mandatory'"
        class="transition-colors rounded-full px-2 py-1"
        :class="{
          'bg-slate-100 text-slate-500': type == 'mandatory',
        }">
        <DangerTriangleIcon class="transition-[stroke]
          inline-block h-5 w-5 ml-1"
          :class="[type == 'mandatory' ? 'stroke-slate-500' : 'stroke-slate-300']" />
        اجباری
      </button>
    </div>

    <Emojis class="pt-2"
      @tap="(emoji: string) => emit('emoji', emoji)" />

    <Transition name="options-footer">
      <div v-show="footer"
        class="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-2">
        <button class="block p-2 active:scale-90"
          @click="emit('backspace')">
          <BackspaceIcon class="h-7 w-7 stroke-slate-400" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style>
.emoji-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
}

.options-footer-enter-active,
.options-footer-leave-active {
  transition: transform 200ms linear;
}

.options-footer-enter-from,
.options-footer-leave-to {
  transform: translateY(100%);
}
</style>
