<template>
  <div class="flex flex-col justify-end h-full">
    <div class="flex flex-grow flex-wrap content-start px-1">
      <group-item
        v-for="group in groups.get()"
        :key="group.id"
        :group="group"
        @edit-click="edit"
        @remove-click="remove"
      />
    </div>

    <div class="flex p-2.5">
      <base-input
        v-model="title"
        class="flex-grow"
        :clearable="editing"
        @enter-keyup="save"
        @clear-click="clear"
      />
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { ref, computed } from 'vue'
import GroupItem from './GroupItem.vue'
import { useGroupsStore } from '@/stores/groups'

const groups = useGroupsStore()

const id = ref(null)
const title = ref('')

const editing = computed(() => id.value !== null)

function clear() {
  title.value = ''
  id.value = null
}

function save() {
  if (editing.value) {
    groups.update(id.value, title.value)
  } else {
    groups.add(title.value)
  }
  clear()
}

function edit(group) {
  title.value = group.title
  id.value = group.id
}

function remove(group) {
  groups.remove(group.id)
}

</script>
