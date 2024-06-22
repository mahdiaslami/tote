<script setup>
import TickIcon from '@/components/icons/TickIcon.vue'
import FiberManualRecordIcon from './icons/FiberManualRecordIcon.vue';

defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

</script>

<template>
  <div ref="container"
    class="flex flex-row items-start"
    @click.prevent="emit('click', todo)">
    <div class="h-6 pr-1 pl-3">
      <TickIcon v-if="todo.completed_at"
        class="text-success" />
      <FiberManualRecordIcon v-else
        class="text-mute mt-1" />
    </div>
    <p dir="auto"
      class="font-light break-words min-w-0"
      :class="[todo.completed_at ? 'line-through text-mute' : 'text-pen']">
      {{ todo.content }}
    </p>
    <div class="flex-shrink-0 w-10" />
  </div>
</template>