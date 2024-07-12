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
    return 'text-info font-medium'
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
        class="text-success -mt-1" />
      <FiberManualRecordIcon v-else
        :class="[todo.type == 'daily' ? 'text-mute' : 'text-info/70']" />
    </div>

    <p dir="auto"
      class="font-light break-words min-w-0"
      :class="[todo.completed_at ? 'line-through' : '', textColor()]">
      {{ todo.content }}
    </p>

    <div class="flex-shrink-0 w-10" />
  </div>
</template>