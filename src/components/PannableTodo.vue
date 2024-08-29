<script setup lang="ts">
import { nextTick, reactive } from 'vue'
import SimpleTodo from './SimpleTodo.vue'
import type { Todo } from '@/types'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits(['edit', 'delete', 'click', 'tick'])

const data = reactive({
  deltaX: 0,
  wiggle: false,
})

const transition = reactive({
  value: true,

  disable() {
    this.value = false
  },

  enable() {
    this.value = true
    nextTick(() => data.deltaX = 0)
  }
})

function handlePans(ev: HammerInput, hammer: HammerManager) {
  transition.disable()

  if (!guessEventName(ev.deltaX / 2.5)) {
    data.deltaX = ev.deltaX / 2.5
    data.wiggle = false
  } else {
    data.wiggle = true
  }

  if (ev.isFinal) {
    hammer.stop(true)
    transition.enable()
  }
}

function handlePanEnd(ev: HammerInput, hammer: HammerManager) {
  const eventName = guessEventName(ev.deltaX / 2.5)

  if (eventName) {
    emit(eventName, props.todo)
  }

  hammer.stop(true)
  transition.enable()
}

function guessEventName(deltaX: number): 'edit' | 'delete' | null {
  if (deltaX > 48) {
    return 'delete'
  } else if (deltaX < -48) {
    return 'edit'
  }

  return null
}

</script>

<template>
  <div>
    <div class="relative overflow-hidden">
      <div class="absolute top-0 right-0 h-full overflow-hidden"
        :style="{ width: `${data.deltaX < 0 ? Math.abs(data.deltaX) : 0}px` }">
        <img class="object-contain h-full pr-6"
          :class="{ 'animate-wiggle': data.wiggle }"
          src="@/assets/pencil.png">
      </div>

      <div class="absolute top-0 left-0 h-full overflow-hidden"
        :style="{ width: `${data.deltaX > 0 ? data.deltaX : 0}px` }">
        <img class="object-contain h-full pl-6"
          :class="{ 'animate-wiggle': data.wiggle }"
          src="@/assets/bin.png">
      </div>

      <SimpleTodo
        v-touch:panright.panleft.panup.pandown="handlePans"
        v-touch:panend="handlePanEnd"
        :class="{ 'transition-transform duration-100': transition.value }"
        :style="{ transform: `translate(${data.deltaX}px)` }"
        :todo="todo"
        @click="emit('click', todo)"
        @tick="emit('tick', todo)" />
    </div>
  </div>
</template>