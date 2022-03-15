<template>
  <router-link
    :to="getPathToTodos()"
    class="h-20 min-w-1/2 p-1"
  >
    <div
      class="border text-primary-darker
          h-full p-2 rounded shadow flex justify-between items-start"
    >
      <div>
        {{ group.title }}
      </div>

      <button @click.prevent="$emit('editClick', group)">
        <edit-icon class="text-sm w-6" />
      </button>
    </div>
  </router-link>
</template>

<script setup>
import EditIcon from '@/components/icons/EditIcon'

defineEmits(['editClick'])

const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
})

const getPathToTodos = () => ({
  name: 'TodoList',
  params: { id: props.group.id },
})

</script>
