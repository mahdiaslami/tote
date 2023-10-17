<script setup>
import ArrowUpwardIcon from '@/components/icons/ArrowUpwardIcon.vue'
import AppTextArea from '@/components/TextArea.vue'
import Todo from '@/components/Todo.vue'
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
  <div class="flex flex-col h-full">
    <div class="h-full overflow-y-scroll">
      <Todo
        v-for="todo in data.todos"
        :key="todo.id"
        :todo="todo"
      />
    </div>

    <div class="flex flex-row items-end bg-secondary">
      <AppTextArea
        v-model="data.content"
        class="w-full h-auto p-4 font-light min-h-16 max-h-32"
        placeholder="کار من"
        @keyup.enter="save"
      />
      <button class="flex items-center justify-center w-14 h-14">
        <ArrowUpwardIcon class="text-2xl font-thin text-mute" />
      </button>
    </div>
  </div>
</template>