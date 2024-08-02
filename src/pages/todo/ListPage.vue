<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Options from './components/Options.vue'
import Todos from './components/Todos.vue'
import Calendar from './components/Calendar.vue'
import Modal from '@/components/Modal.vue'
import { useTodoStore } from '@/store/todo'
import type { Todo, Schedule } from '@/types'
import { reactive, ref } from 'vue'
import { useKeyboard, useKeyboardEventListener } from '@/composable/keyboard'
import { useBackEventListener } from '@/composable/backbutton'

const todoStore = useTodoStore()
const keyboard = useKeyboard()

const calendar = ref<any | null>(null)
const todos = ref<any | null>(null)

const data = reactive({
  id: null as string | null,
  content: '',
  type: 'daily' as Schedule,

  clear() {
    this.id = null
    this.content = ''
    this.type = 'daily'
  },

  options: false,
})



const deleteModal = reactive({
  visiable: false,
  todo: null as Todo | null,

  clear() {
    this.visiable = false
    this.todo = null
  }
})

function isToday() {
  return calendar.value && calendar.value.current().isToday()
}

function handleSave() {
  const trimedContent = data.content.trim()

  if (!trimedContent) {
    return
  }

  const date = data.type === 'daily' ? calendar.value.current() : null

  if (data.id !== null) {
    todoStore.update(data.id, trimedContent, date)
  } else {
    todoStore.addNew(trimedContent, date)
    setTimeout(
      () => todos.value && todos.value.scrollToEnd(),
      300
    ) // wait to the end of todo transition
  }

  data.clear()
}

function handleSelect(todo: Todo) {
  data.id = todo.id
  data.content = todo.content
  data.type = todo.type
}

function handleDelete(todo: Todo) {
  if (todo.id == data.id) {
    return
  }

  deleteModal.visiable = true
  deleteModal.todo = todo
}

function handleDateChange() {
  if (!isToday()) {
    data.type = 'daily'
  }

  data.clear()
}

function handleGotoToday() {
  calendar.value?.reset()
}

let manuallyHideKeyboard = false
function handleOptions() {
  if (keyboard.visiable) {
    if (data.options) {
      manuallyHideKeyboard = true
      keyboard.hide()
    } else {
      // undefinded state
    }
  } else {
    if (data.options) {
      keyboard.show()
    } else {
      data.options = true
    }
  }
}

useKeyboardEventListener('keyboardWillHide', 'options', () => {
  if (!manuallyHideKeyboard) {
    data.options = false
  }
})

useKeyboardEventListener('keyboardDidHide', 'options', () => {
  if (manuallyHideKeyboard) {
    manuallyHideKeyboard = false
  } else {
    document.body.style.height = `100%`
  }
})

useKeyboardEventListener('keyboardWillShow', 'options', () => {
  data.options = true
  document.body.style.height = `${keyboard.screenHeight}px`
})

useBackEventListener('options', (): boolean => {
  if (data.options) {
    data.options = false
    return false
  }

  return true
})
</script>

<template>
  <div class="flex flex-col h-full">
    <Calendar ref="calendar"
      class="min-h-0 flex-grow"
      @datechange="handleDateChange"
      v-slot="{ date, active }">

      <Header class="w-full z-10"
        :date="date" />

      <Todos :ref="(el: any) => { if (active) todos = el }"
        class="flex-grow swiper-no-swiping overflow-y-auto overflow-x-hidden"
        :animate="active"
        :list="todoStore.get(date)"
        @edit="handleSelect"
        @delete="handleDelete"
        @tick="(todo: any) => todoStore.toggleCompleted(todo.id)" />

    </Calendar>

    <div class="relative h-0 overflow-x-clip">
      <div class="absolute bottom-0 w-full min-w-0 flex flex-col">
        <Transition name="left-slide">
          <div v-if="isToday() === false"
            class="z-10 self-end w-fit shadow-md rounded-r-full text-pen text-xs mb-2 transition-all">
            <button type="button"
              @click="handleGotoToday"
              class="px-4 py-2 rounded-r-full font-medium bg-info text-white">بازگشت به روز جاری</button>
          </div>
        </Transition>
      </div>
    </div>

    <Footer v-model:content="data.content"
      @options="handleOptions"
      @save="handleSave" />

    <Transition name="content-menu"
      :duration="keyboard.visiable === false ? 300 : 1">
      <Options v-model="data.options"
        v-model:content="data.content"
        :force-daily="!isToday()"
        :style="{
          minHeight: `${keyboard.keyboardHeight}px`,
        }" />
    </Transition>

    <Modal v-model="deleteModal.visiable"
      :cancelable="true"
      class="p-4 font-light">

      <h2 class="text-lg mb-1">حذف کار</h2>
      <p class="mb-6">مطمئنی میخوای حذف کنی؟</p>

      <div class="flex flex-row -mx-0.5">
        <!-- TODO: add bg-gray-50 and etc to palette -->
        <button class="p-2 w-full bg-gray-50 active:bg-gray-100
          rounded-xl mx-1 transition-colors"
          @click="deleteModal.clear()">نه</button>

        <button class="p-2 w-full text-danger active:bg-gray-50
          rounded-xl mx-1 transition-colors"
          @click="() => {
            todoStore.remove(deleteModal.todo!.id)
            deleteModal.clear()
          }">آره</button>
      </div>
    </Modal>
  </div>
</template>

<style>
.left-slide-enter-active,
.left-slide-leave-active {
  transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.left-slide-enter-from,
.left-slide-leave-to {
  transform: translateX(-100%);
}

.content-menu-enter-active {
  transition-property: min-height, max-height, padding;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.content-menu-leave-active {
  transition-property: min-height, max-height, padding;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.content-menu-enter-from,
.content-menu-leave-to {
  min-height: 0 !important;
  max-height: 0 !important;
  padding: 0 !important;
}
</style>