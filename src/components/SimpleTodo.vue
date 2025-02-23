<script setup lang="ts">
import TickIcon from '@/components/icons/TickIcon.vue'
import FiberManualRecordIcon from './icons/FiberManualRecordIcon.vue'
import type { Todo } from '@/types'
import { PersianDate } from '@/class/persiandate'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits(['click', 'tick'])

function textClasses() {
  if (props.todo.completed_at) {
    return [
      'line-through',
      props.todo.type === 'daily' ? 'text-slate-600' : 'text-sky-600'
    ]
  }

  return [
    props.todo.type === 'daily' ? 'text-slate-800' : 'text-sky-600'
  ]
}
</script>

<template>
  <div ref="container"
    class="flex flex-row items-start"
    @click.prevent="emit('click', todo)">
    <div class="h-6 w-7 mx-2"
      @click="emit('tick', todo)">
      <TickIcon v-if="todo.completed_at"
        class="fill-emerald-600 h-7 w-7 -mt-1" />
      <FiberManualRecordIcon v-else
        class="h-7 w-7 fill-slate-500" />
    </div>

    <p dir="auto"
      class="font-light break-words min-w-0"
      :class="textClasses()">
      {{ todo.content }}

      <span v-if="todo.type === 'mandatory' && todo.completed_at"
        class="inline-block text-xs mx-2 text-slate-400">
        ({{ (new PersianDate(todo.completed_at)).toPersianLocalDateString() }})
      </span>
    </p>


    <div class="flex-shrink-0 w-10" />
  </div>
</template>