<template>
  <div class="flex flex-col justify-end h-full">
    <div class="flex-grow">
      <div
        v-for="group in groups"
        :key="group.id"
      >
        {{ group.title }}
      </div>
    </div>

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
