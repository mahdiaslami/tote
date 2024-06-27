<script setup>
import IconCheck from '@/components/icons/IconCheck.vue'
import IconCircle from '@/components/icons/IconCircle.vue'

defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

</script>

<template>
  <div
    ref="container"
    class="flex flex-row items-start"
    @click.prevent="emit('click', todo)"
  >
    <div class="ml-2">
      <IconCheck v-if="todo.completed_at" />
      <IconCircle v-else />
    </div>

    <p
      dir="auto"
      class="flex-grow min-w-0 font-light text-right break-words"
      :class="[todo.completed_at ? 'line-through text-mute' : 'text-pen']"
    >
      {{ todo.content }}
    </p>
  </div>
</template>