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

      <div class="flex flex-col justify-between -my-2">
        <button @click.prevent="setAsDefault(group.id)">
          <star-icon
            v-if="group.id === defaultGroupId"
            class="text-sm w-6"
          />
          <star-border-icon
            v-else
            class="text-sm w-6"
          />
        </button>

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
import StarIcon from '@/components/icons/StarIcon'
import StarBorderIcon from '@/components/icons/StarBorderIcon'
import { useGroups } from '@/hooks/useGroups'

const { defaultGroupId } = useGroups()

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

function setAsDefault(groupId) {
  defaultGroupId.value = groupId
}

</script>
