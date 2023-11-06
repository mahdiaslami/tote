<script setup>
import TickIcon from '@/components/icons/TickIcon.vue'
import { nextTick, onMounted, reactive, ref } from 'vue'
import Hammer from 'hammerjs'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['panright', 'panleft'])

const div = ref(null)

const data = reactive({
  deltaX: 0,
  transition: true,
})

const animation = {
  disable() {
    data.transition = false
  },

  start() {
    data.transition = true
    nextTick(() => data.deltaX = 0)
  }
}

onMounted(() => {
  const hammer = new Hammer(div.value)

  hammer.on('panright panleft', (ev) => {
    animation.disable()

    if (Math.abs(data.deltaX) < 75) {
      data.deltaX = ev.deltaX / 3
    }

    if (ev.isFinal) {
      handleEnd(ev)
    }
  })

  hammer.on('panend panup pandown', handleEnd)

  function handleEnd(ev) {
    if (ev.deltaX > 250) {
      emit('panright', props.todo)
    } else if (ev.deltaX < -250) {
      emit('panleft', props.todo)
    }

    hammer.stop(true)

    animation.start()
  }
})

</script>

<template>
  <div
    ref="div"
    class="flex flex-row items-start w-full px-1 py-4 bg-primary"
    :class="{
      'bg-success-2': todo.completed_at,
      'transition-transform duration-100': data.transition
    }"
    :style="{ transform: `translate(${data.deltaX}px)` }"
  >
    <button
      class="h-6 px-2"
      @click.prevent="todo.toggleComplete()"
    >
      <TickIcon
        :class="[todo.completed_at ? 'text-success' : 'text-mute']"
      />
    </button>
    <p
      dir="auto"
      class="font-light text-pen"
      :class="[todo.completed_at ? 'line-through' :'']"
    >
      {{ todo.content }}
    </p>
    <div class="flex-shrink-0 w-10" />
  </div>
</template>