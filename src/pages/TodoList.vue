<script setup>
import ArrowUpwardIcon from '@/components/icons/ArrowUpwardIcon.vue'
import AppTextArea from '@/components/TextArea.vue'
import Todo from '@/components/PannableTodo.vue'
import { onMounted, reactive } from 'vue'

const data = reactive({
  todos: [],
  content: '',
})

onMounted(() => {
  addTodo('سلام رفیق! من یک برنامه خیلی کوچولو برای مدیریت کار هام')
  addTodo('هر وقت کاری خواستی اضافه کنی از پایین صفحه جایی که نوشته «کار من» می تونی اضافه کنی')
  addTodo('وقتی کاری رو تموم کردی روی تیک سمت راستش ضربه بزن تا یک خط روش بکشم')
  addTodo('اگر لازم شد کاری رو ویرایش کنی اونو به سمت راست هلش بده')
  addTodo('برای حذف کار هم به سمت چپ حلش بده')
})

function save() {
  if (data.content.trim()) {
    addTodo(data.content)
    data.content = ''
  }
}

function addTodo(content) {
  data.todos.push({
    id: Date.now(),
    completed_at: null,
    content: content,

    toggleComplete() {
      this.completed_at = this.completed_at ? null : Date.now()
    }
  })
}

</script>
<template>
  <div class="flex flex-col h-full">
    <div class="h-full overflow-x-hidden overflow-y-scroll">
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