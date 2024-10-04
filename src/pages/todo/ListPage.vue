<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Options from './components/Options.vue'
import Todos from './components/Todos.vue'
import Calendar from './components/Calendar.vue'
import Modal from '@/components/Modal.vue'
import Animate from '@/components/Animate.vue'
import { useTodoStore } from '@/store/todo'
import type { Todo, Schedule } from '@/types'
import { reactive, ref } from 'vue'
import { useKeyboard } from '@/composable/keyboard'
import { useBackEventListener } from '@/composable/backbutton'

const todoStore = useTodoStore()
const keyboard = useKeyboard()

const calendar = ref<any | null>(null)
const todos = ref<any | null>(null)
const footer = ref<any | null>(null)

const data = reactive({
  selected: null as Todo | null,
  content: '',
  type: 'daily' as Schedule,

  clear() {
    this.selected = null
    this.content = ''
    this.type = 'daily'
  },
})

const optionsMenu = useOptionsMenu()

const deleteModal = reactive({
  visible: false,
  todo: null as Todo | null,

  clear() {
    this.visible = false
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

  if (data.selected !== null) {
    todoStore.update(data.selected.id, trimedContent, date)
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
  data.selected = todo
  data.content = todo.content
  data.type = todo.type
}

function handleDelete(todo: Todo) {
  if (todo.id == data.selected?.id) {
    return
  }

  deleteModal.visible = true
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

function useOptionsMenu() {
  const optionsMenu = reactive({
    visible: false,

    fromHeight() {
      return 0
      // return keyboard.shown ? `${keyboard.keyboardHeight - 144}px` : 0
    },

    toHeight() {
      return keyboard.keyboardHeight
    },

    duration() {
      if (keyboard.showing !== keyboard.shown) {
        if (keyboard.showing) {
          return 200
        } else {
          return 10
        }
      }

      return 500
    },

    watchTo() {
      return keyboard.showing
    }
  })

  useBackEventListener('options', (): boolean => {
    if (optionsMenu.visible) {
      optionsMenu.visible = false
      return false
    }

    return true
  })

  return optionsMenu
}

</script>

<template>
  <div class="flex flex-col h-full">
    <Calendar ref="calendar"
      v-slot="{ date, active }"
      class="min-h-0 flex-grow"
      @datechange="handleDateChange">
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
            class="z-10 self-end w-fit shadow-md rounded-r-full text-pen text-xs
              mb-2 transition-all">
            <button type="button"
              class="px-4 py-2 rounded-r-full font-medium bg-info text-white"
              @click="handleGotoToday">
              بازگشت به روز جاری
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <Footer ref="footer"
      v-model:content="data.content"
      v-model:options="optionsMenu.visible"
      @save="handleSave" />

    <!-- 144px is max height of the footer textarea -->
    <Animate :from="{
      minHeight: optionsMenu.fromHeight(),
      height: optionsMenu.fromHeight()
    }"
      :to="{
        minHeight: optionsMenu.toHeight(),
        height: optionsMenu.toHeight()
      }"
      easing="easeOutExpo"
      :duration="optionsMenu.duration()"
      :watch-to="optionsMenu.watchTo()">
      <Options v-show="optionsMenu.visible"
        v-model:type="data.type"
        :force-daily="!isToday()"
        class="h-0 min-h-0"
        @emoji="(emoji: string) => footer?.insertText(emoji)"
        @backspace="footer?.removeText" />
    </Animate>

    <Modal v-model="deleteModal.visible"
      :cancelable="true"
      class="p-4 font-light select-none">
      <h2 class="text-lg mb-1">حذف کار</h2>
      <p class="mb-6">مطمئنی میخوای حذف کنی؟</p>

      <div class="flex flex-row -mx-0.5">
        <!-- TODO: add bg-gray-50 and etc to palette -->
        <button class="p-2 w-full bg-gray-50 active:bg-gray-100
          rounded-xl mx-1 transition-colors"
          @click="deleteModal.clear()">
          نه
        </button>

        <button class="p-2 w-full text-danger active:bg-gray-50
          rounded-xl mx-1 transition-colors"
          @click="() => {
            todoStore.remove(deleteModal.todo!.id)
            deleteModal.clear()
          }">
          آره
        </button>
      </div>
    </Modal>
  </div>
</template>

<style>
.left-slide-enter-active,
.left-slide-leave-active {
  transition: transform 300ms ease-out;
}

.left-slide-enter-from,
.left-slide-leave-to {
  transform: translateX(-100%);
}
</style>