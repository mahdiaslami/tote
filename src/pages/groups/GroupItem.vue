<template>
  <router-link
    :to="getPathToTodos()"
    class="h-20 min-w-1/2 p-1"
  >
    <div
      class="border text-ternary bg-pri
          h-full p-2 rounded shadow flex justify-between items-stretch"
    >
      <div>
        {{ group.title }}
      </div>

      <div class="flex flex-col justify-between -my-2">
        <button @click.prevent="setAsDefault(group.id)">
          <star-icon
            v-if="group.id === groups.default"
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
import EditIcon from '@/components/icons/EditIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import StarBorderIcon from '@/components/icons/StarBorderIcon.vue'
import { useGroupsStore } from '@/stores/groups'

const groups = useGroupsStore()

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
  console.log(groups)
  groups.default = groupId
}

</script>
