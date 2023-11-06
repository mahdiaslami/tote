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
    <div class="h-full overflow-x-hidden overflow-y-scroll">
      <div
        v-for="todo in data.todos"
        :key="todo.id"
        class="relative bg-gradient-to-r from-danger-1 to-info-1"
      >
        <img
          class="absolute top-0 object-contain w-12 h-full p-2 right-6"
          src="@/assets/pencil.png"
        >

        <img
          class="absolute top-0 object-contain w-12 h-full p-2 left-6"
          src="@/assets/bin.png"
        >

        <Todo
          :todo="todo"
        />
      </div>
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