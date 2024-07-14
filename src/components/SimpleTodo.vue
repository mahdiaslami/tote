<script setup lang="ts">
import TickIcon from '@/components/icons/TickIcon.vue'
import FiberManualRecordIcon from './icons/FiberManualRecordIcon.vue';
import type { Todo } from '@/types';

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits(['click'])

function textColor() {
  if (props.todo.type == 'mandatory') {
    if (props.todo.completed_at) {
      return 'text-force/30'
    } else {
      return 'text-force'
    }
  }

  if (props.todo.completed_at) {
    return 'text-mute'
  } else {
    return 'text-pen'
  }
}

</script>

<template>
  <div ref="container"
    class="flex flex-row items-start"
    @click.prevent="emit('click', todo)">

    <div class="h-6 pr-2 pl-2">
      <TickIcon v-if="todo.completed_at"
        class="fill-success -mt-1 h-7 w-7" />
      <FiberManualRecordIcon v-else
        class="h-7 w-7"
        :class="[todo.type == 'daily' ? 'fill-mute' : 'fill-danger/30']" />
    </div>

    <p dir="auto"
      class="font-light break-words min-w-0"
      :class="[todo.completed_at ? 'line-through' : '', textColor()]">
      {{ todo.content }}
    </p>

    <div class="flex-shrink-0 w-10" />
  </div>
</template>