<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import Hammer from 'hammerjs'
import SimpleTodo from './SimpleTodo.vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete', 'click'])

const simpleTodo = ref<InstanceType<typeof SimpleTodo> | null>(null)

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

onMounted(() => {
  if (simpleTodo.value === null) {
    throw new Error("simple todo should not be null");
  }

  const hammer = new Hammer(simpleTodo.value.$refs.container as HTMLElement)

  hammer.on('panright panleft panup pandown', (ev) => {
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
  })

  hammer.on('panend', (ev) => {
    const eventName = guessEventName(ev.deltaX / 2.5)

    if (eventName) {
      emit(eventName, props.todo)
    }

    hammer.stop(true)
    transition.enable()
  })

  function guessEventName(deltaX: number): 'edit' | 'delete' | null {
    if (deltaX > 56) {
      return 'delete'
    } else if (deltaX < -56) {
      return 'edit'
    }

    return null
  }
})

</script>

<template>
  <div>
    <div class="relative">
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

      <SimpleTodo ref="simpleTodo"
        :class="{ 'transition-transform duration-100': transition.value }"
        :style="{ transform: `translate(${data.deltaX}px)` }"
        :todo="todo"
        @click="emit('click', todo)" />
    </div>
  </div>
</template>