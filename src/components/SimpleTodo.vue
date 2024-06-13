<script setup>
import TickIcon from '@/components/icons/TickIcon.vue'

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
    class="flex flex-row items-start w-full px-1 py-4 bg-primary"
    @click.prevent="emit('click', todo)">
    <div class="h-6 px-2">
      <TickIcon :class="[todo.completed_at ? 'text-success' : 'text-mute']" />
    </div>
    <p dir="auto"
      class="font-light"
      :class="[todo.completed_at ? 'line-through text-mute' : 'text-pen']">
      {{ todo.content }}
    </p>
    <div class="flex-shrink-0 w-10" />
  </div>
</template>