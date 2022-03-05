<template>
  <div>
    <template
      v-for="group in groups"
      :key="group.id"
    >
      <div>
        {{ group.title }}
      </div>
    </template>

    <div class="flex p-2.5">
      <base-input
        v-model="newGroup"
        class="flex-grow"
        @enter-keyup="saveGroup"
      />
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/BaseInput'
import { useGroups } from '@/hooks/useGroups'
import { ref } from 'vue'

const { groups, addGroup } = useGroups()

const newGroup = ref('')

function saveGroup() {
  addGroup(newGroup.value)
  newGroup.value = ''
}
</script>
