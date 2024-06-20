<script setup>
import ArrowUpwardIcon from '@/components/icons/ArrowUpwardIcon.vue'
import AppTextArea from '@/components/TextArea.vue'
import Todo from '@/components/PannableTodo.vue'
import Header from '@/components/DateHeader.vue'
import { PersianDate } from '@/class/persiandate.js'
import { useTodoStore } from '@/store/todo.js'
import { reactive } from 'vue'

const todoStore = useTodoStore()

const data = reactive({
  content: '',
  selected: null,
  date: new PersianDate()
})

function save() {
  if (data.content.trim()) {

    if (data.selected) {
      todoStore.update(data.selected.id, { ...data.selected, content: data.content })
    } else {
      todoStore.addNew(data.content.trim())
    }

    data.content = ''
    data.selected = null
  }
}

function remove(todo) {
  todoStore.remove(todo.id)
}

function edit(todo) {
  data.selected = todo
  data.content = todo.content
}

function toggleCompleted(todo) {
  todoStore.toggleCompleted(todo.id)
}

</script>
<template>
  <div class="flex flex-col h-full ">
    <div class="flex flex-col relative flex-grow overflow-y-auto overflow-x-hidden">
      <Header class="sticky top-0 left-0 z-10 w-full"
        :date="data.date" />

      <TransitionGroup name="fade"
        tag="div"
        class="group flex-grow paper">
        <Todo v-for="todo in todoStore.all()"
          v-show="!todo.deleted_at"
          class="py-3 first:pt-1.5"
          :key="todo.id"
          :todo="todo"
          @edit="edit"
          @delete="remove"
          @click="toggleCompleted(todo)" />
      </TransitionGroup>
    </div>

    <div class="flex flex-row items-end bg-secondary">
      <AppTextArea v-model="data.content"
        class="w-full h-auto p-3 font-light min-h-12"
        placeholder="کار من"
        @keyup.enter="save" />
      <button class="flex items-center justify-center w-14 h-12"
        @click="save">
        <ArrowUpwardIcon class="text-2xl font-thin text-mute" />
      </button>
    </div>
  </div>
</template>

<style>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}

.paper {
  background:
    linear-gradient(#00000000, #00000000 23px, rgb(var(--color-line)) 24px, rgb(var(--color-line)) 24px, #00000000 25px) center top / calc(100% - 64px) 24px repeat-y,
    linear-gradient(rgb(var(--color-primary) / 0.95), rgb(var(--color-primary) / 0.90) 100%) left top,
    url("@/assets/pattern.png") left top repeat;
}
</style>