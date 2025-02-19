<script setup lang="ts">
import TickIcon from '@/components/icons/TickIcon.vue'
import FiberManualRecordIcon from './icons/FiberManualRecordIcon.vue'
import type { Todo } from '@/types'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits(['click', 'tick'])

function textClasses() {
  if (props.todo.completed_at) {
    return [
      'line-through',
      props.todo.type === 'daily' ? 'text-slate-600' : 'text-danger'
    ]
  }

  return [
    props.todo.type === 'daily' ? 'text-slate-800' : 'text-danger'
  ]
}
</script>

<template>
  <div ref="container"
    class="flex flex-row items-start"
    @click.prevent="emit('click', todo)">
<div class="h-6 pr-2 pl-2"
      @click="emit('tick', todo)">
      <TickIcon v-if="todo.completed_at"
        class="fill-emerald-600 -mt-1 h-7 w-7" />
      <FiberManualRecordIcon v-else
        class="h-7 w-7"
        :class="[todo.type == 'daily' ? 'fill-slate-300' : 'fill-danger/30']" />
    </div>

    <p dir="auto"
      class="font-light break-words min-w-0"
      :class="textClasses()">
      {{ todo.content }}
    </p>

    <div class="flex-shrink-0 w-10" />
  </div>
</template>