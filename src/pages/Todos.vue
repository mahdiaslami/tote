<script setup>
import TickIcon from '@/components/icons/TickIcon.vue'
import ArrowUpwardIcon from '@/components/icons/ArrowUpwardIcon.vue'
import AppTextArea from '@/components/TextArea.vue'
import { reactive } from 'vue'

const data = reactive({
  todos: [],
  content: '',
})

function save() {
  if (data.content.trim()) {
    data.todos.push({
      id: Date.now(),
      completed_at: null,
      content: data.content,
  
      toggleComplete() {
        this.completed_at = this.completed_at ? null : Date.now()
      }
    })

    data.content = ''
  }
}

</script>
<template>
  <div class="flex flex-col h-full px-1 pt-10">
    <div class="h-full overflow-y-scroll">
      <div
        v-for="todo in data.todos"
        :key="todo.id"
        class="flex flex-row w-full mb-4"
      >
        <a
          class="w-10 h-10 px-2"
          @click="todo.toggleComplete()"
        >
          <TickIcon
            :class="[todo.completed_at ? 'text-green-600' : 'text-gray-300']"
          />
        </a>
        <p
          dir="auto"
          class="font-light text-gray-900"
          :class="[todo.completed_at ? 'line-through' :'']"
        >
          {{ todo.content }}
        </p>
        <div class="flex-shrink-0 w-10" />
      </div>
    </div>

    <div class="flex flex-row items-end min-h-0 bg-gray-50">
      <AppTextArea
        v-model="data.content"
        class="w-full h-auto p-4 font-light outline-none min-h-16 max-h-32 bg-gray-50"
        placeholder="کار من"
        @keyup.enter="save"
      />
      <button class="flex items-center justify-center w-14 h-14">
        <ArrowUpwardIcon class="text-2xl font-thin text-gray-500" />
      </button>
    </div>
  </div>
</template>