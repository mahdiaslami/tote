<script setup>
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

const simpleTodo = ref(null)

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
  const hammer = new Hammer(simpleTodo.value.$refs.container)

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

  function guessEventName(deltaX) {
    if (deltaX > 75) {
      return 'delete'
    } else if (deltaX < -75) {
      return 'edit'
    }

    return null
  }
})

</script>

<template>
  <div>
    <div class="relative bg-gradient-to-r from-danger to-info">
      <img class="absolute top-0 right-0 object-contain h-full pr-6 w-14" :class="{ 'animate-wiggle': data.wiggle }"
        src="@/assets/pencil.png">

      <img class="absolute top-0 left-0 object-contain h-full pl-6 w-14" :class="{ 'animate-wiggle': data.wiggle }"
        src="@/assets/bin.png">

      <SimpleTodo ref="simpleTodo" :class="{ 'transition-transform duration-100': transition.value }"
        :style="{ transform: `translate(${data.deltaX}px)` }" :todo="todo" @click="emit('click', todo)" />
    </div>
  </div>
</template>