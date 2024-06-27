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
    class="flex flex-row items-start p-5 rounded-lg bg-dark-700"
    @click.prevent="emit('click', todo)"
  >
    <div class="ml-5">
      <IconCheck
        v-if="todo.completed_at"
        class="stroke-dark-500"
      />
      <IconCircle
        v-else
        class="stroke-dark-500"
      />
    </div>

    <p
      dir="auto"
      class="flex-grow min-w-0 text-right break-words text-dark-500"
      :class="{'line-through': todo.completed_at}"
    >
      {{ todo.content }}
    </p>
  </div>
</template>