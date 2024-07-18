<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Todos from './components/Todos.vue'
import Modal from '@/components/Modal.vue'
import { PersianDate } from '@/class/persiandate.js'
import { nextTick, reactive, ref } from 'vue'
import { useTodoStore } from '@/store/todo'
import type { Todo, Schedule } from '@/types'

const todoStore = useTodoStore()
const swiperContainer = ref<any | null>(null)
const todosArray = ref<any[] | null>(null)

const emojis = ['✨', '😍', '🤔', '😬', '⏰', '🚀', '🚨']
const emojisRegex = /✨|😍|🤔|😬|⏰|🚀|🚨/g

const data = reactive({
  id: null as string | null,
  content: '',
  type: 'daily' as Schedule,

  clear() {
    this.id = null
    this.content = ''
    this.type = 'daily'
  },

  emoji: false
})

const deleteModal = reactive({
  visiable: false,
  todo: null as Todo | null,

  clear() {
    this.visiable = false
    this.todo = null
  }
})

const calendar = reactive({
  current: PersianDate.create(),

  dates: [
    PersianDate.create(),
    PersianDate.create().addDay(),
    PersianDate.create().subDay(),
  ],
})

function toggleType() {
  if (calendar.current.isToday()) {
    data.type = (data.type == 'daily') ? 'mandatory' : 'daily'
  }
}

function insertTextAndPreserveCursor(txt: string) {
  const selection = window.getSelection()
  if (selection && selection.rangeCount) {
    let range = selection.getRangeAt(0)

    const prefix = data.content.slice(0, range.startOffset)
    const suffix = data.content.slice(range.endOffset, data.content.length)

    // logically each emoji is 2 or more character, but cursor assume
    // it is one character.
    const cursorOffset = prefix.replace(emojisRegex, 'e').length

    data.content = prefix + txt + suffix

    nextTick(() => {
      for (let i = 0; i <= cursorOffset; i++) {
        selection.modify('move', 'forward', 'character')
      }
    })
  } else {
    data.content += txt
  }
}

function handleSave() {
  const trimedContent = data.content.trim()

  if (!trimedContent) {
    return
  }

  const date = data.type === 'daily' || !calendar.current.isToday()
    ? calendar.current : null

  if (data.id !== null) {
    todoStore.update(data.id, trimedContent, date)
  } else {
    todoStore.addNew(trimedContent, date)
    setTimeout(scrollToEnd, 150); // wait for transition height end
  }

  data.clear()
}

function scrollToEnd() {
  if (todosArray.value) {
    const index = swiperContainer.value?.swiper.realIndex || 0
    const todosComponent = todosArray.value[index]

    todosComponent.scrollToEnd()
  }
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

function handleSlideChange(ev: any) {
  const [swiper] = ev.detail
  calendar.current = calendar.dates[swiper.realIndex]
  if (!calendar.current.isToday()) {
    data.type = 'daily'
  }
}

function handleSlideChangeTransitionEnd(ev: any) {
  const [swiper] = ev.detail

  const cur = swiper.realIndex
  const next = (cur + 1) % 3
  const prev = (cur + 2) % 3

  calendar.dates[next] = calendar.current.duplicate().addDay()
  calendar.dates[prev] = calendar.current.duplicate().subDay()

  data.clear()
}

function handleGotoToday() {
  let distance = calendar.current.distanceInDay(new Date())
  const swiper = swiperContainer.value?.swiper
  const cur = swiper.realIndex

  if (distance > 0) {
    const next = (cur + 1) % 3
    calendar.dates[next] = PersianDate.create()

    swiper.slideNext()
  } else if (distance < 0) {
    const prev = (cur + 2) % 3
    calendar.dates[prev] = PersianDate.create()

    swiper.slidePrev()
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <swiper-container ref="swiperContainer"
      class="min-h-0 flex-grow"
      loop="true"
      @swiperslidechange="handleSlideChange"
      @swiperslidechangetransitionend="handleSlideChangeTransitionEnd">

      <swiper-slide class="flex flex-col h-full border-r"
        v-for="(date, dindex) in calendar.dates"
        :key="dindex"
        :data-index="dindex">

        <Header class="w-full z-10"
          :date="date" />

        <Todos ref="todosArray"
          class="flex-grow swiper-no-swiping overflow-y-auto overflow-x-hidden"
          :animate="!swiperContainer?.swiper.animating"
          :list="todoStore.get(date)"
          @edit="handleSelect"
          @delete="handleDelete"
          @click="(todo) => todoStore.toggleCompleted(todo.id)" />
      </swiper-slide>
    </swiper-container>

    <div class="relative h-0 overflow-x-clip">
      <div class="absolute bottom-0 w-full min-w-0 flex flex-col">
        <Transition name="left-slide">
          <div v-if="!calendar.current.isToday()"
            class="z-10 self-end w-fit shadow-md rounded-r-full text-pen text-xs mb-2 transition-all">
            <button type="button"
              @click="handleGotoToday"
              class="px-4 py-2 rounded-r-full font-medium bg-info text-white">بازگشت به روز جاری</button>
          </div>
        </Transition>

        <Transition name="fade-then-collapse"
          :duration="650">
          <div v-if="data.emoji"
            class="bg-secondary border-t border-line py-2 z-10 h-12 flex flex-row overflow-y-hidden">

            <div class="flex-grow text-lg flex flex-row-reverse justify-around">
              <button v-for="emoji in emojis"
                class="active:opacity-30 transition-opacity"
                @mousedown.prevent="insertTextAndPreserveCursor(emoji)"
                @touchstart.prevent="insertTextAndPreserveCursor(emoji)">
                {{ emoji }}
              </button>
            </div>

            <div class="border-r border-line px-2">
              <button class="transition-colors rounded px-2 py-1 font-light"
                :class="{
                  'bg-info text-white': data.type == 'mandatory',
                  'opacity-50': !calendar.current.isToday()
                }"
                @mousedown.prevent="toggleType"
                @touchstart.prevent="toggleType">
                اجباری
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <Footer v-model:content="data.content"
      v-model:emoji="data.emoji"
      @save="handleSave" />

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

.fade-then-collapse-enter-active {
  transition-property: height, padding;
  transition-duration: 300ms, 300ms;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-then-collapse-leave-active {
  transition-property: height, padding;
  transition-duration: 300ms, 300ms;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-then-collapse-enter-from,
.fade-then-collapse-leave-to {
  height: 0 !important;
  padding: 0 !important;
}
</style>