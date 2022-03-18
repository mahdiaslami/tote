<template>
  <router-link
    :to="getPathToTodos()"
    class="h-20 min-w-1/2 p-1"
  >
    <div
      class="border text-primary-darker bg-primary
          h-full p-2 rounded shadow flex justify-between items-stretch"
    >
      <div>
        {{ group.title }}
      </div>

      <div class="flex flex-col justify-between">
        <button @click.prevent="$emit('editClick', group)">
          <edit-icon class="text-sm w-6" />
        </button>

        <button @click.prevent="$emit('removeClick', group)">
          <delete-icon class="text-sm w-6" />
        </button>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import EditIcon from '@/components/icons/EditIcon'
import DeleteIcon from '@/components/icons/DeleteIcon'

defineEmits(['editClick', 'removeClick'])

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
