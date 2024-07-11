<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import TodoList from './components/TodoList.vue'
import { PersianDate } from '@/class/persiandate.js'
import { reactive, ref } from 'vue'
import { useTodoStore, type TodoType, type Todo } from '@/store/todo'

const todoStore = useTodoStore()
const swiperContainer = ref<any | null>(null)

const data = reactive({
  id: null as string | null,
  content: '',
  type: 'daily' as TodoType
})

const calendar = reactive({
  current: PersianDate.create(),

  dates: [
    PersianDate.create(),
    PersianDate.create().addDay(),
    PersianDate.create().subDay(),
  ],
})

function handleSave() {
  const trimedContent = data.content.trim()

  if (!trimedContent) {
    return
  }

  if (data.id !== null) {
    todoStore.update(data.id, trimedContent)
  } else {
    todoStore.addNew(trimedContent, data.type === 'daily' || !calendar.current.isToday()
      ? calendar.current : null)
  }

  data.content = ''
  data.id = null
}

function handleSelect(todo: Todo) {
  data.id = todo.id
  data.content = todo.content
  data.type = todo.type
}

function handleSlideChange(ev: any) {
  const [swiper] = ev.detail
  calendar.current = calendar.dates[swiper.realIndex]
}

function handleSlideChangeTransitionEnd(ev: any) {
  const [swiper] = ev.detail

  const cur = swiper.realIndex
  const next = (cur + 1) % 3
  const prev = (cur + 2) % 3

  calendar.dates[next] = calendar.current.duplicate().addDay()
  calendar.dates[prev] = calendar.current.duplicate().subDay()
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

        <TodoList class="flex-grow swiper-no-swiping overflow-y-auto overflow-x-hidden"
          :list="todoStore.get(date)"
          @edit="handleSelect"
          @delete="(todo) => todoStore.remove(todo.id)"
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
          <div v-if="data.content.trim() != ''"
            class="self-center z-10 bg-secondary shadow-md rounded-md flex 
            flex-row text-pen text-xs p-1 w-11/12 h-10">

            <button type="button"
              @click="data.type = 'daily'"
              class="px-4 py-2 rounded-md font-medium transition-colors"
              :class="{ 'bg-info text-white': data.type === 'daily' }">روزانه</button>

            <button type="button"
              @click="data.type = 'mandatory'"
              class="px-4 py-2 rounded-md font-medium transition-colors"
              :class="{ 'bg-info text-white': data.type === 'mandatory' }">اجباری</button>

            <div class="flex-grow text-lg border-r border-gray-200 px-2 flex flex-row-reverse
            justify-between">
              <button v-for="emoji in ['✨', '😍', '🤔', '😊', '😬', '⏰', '🚀', '🎯', '🚨']"
                class="active:opacity-30 transition-opacity"
                @click="data.content += emoji">
                {{ emoji }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <Footer v-model:content="data.content"
      @save="handleSave" />

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
  transition-property: opacity, height, padding;
  transition-duration: 500ms, 150ms, 150ms;
  transition-delay: 150ms, 0ms, 0ms;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-then-collapse-leave-active {
  transition-property: opacity, height, padding;
  transition-duration: 500ms, 150ms, 150ms;
  transition-delay: 0ms, 500ms, 500ms;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-then-collapse-enter-from,
.fade-then-collapse-leave-to {
  opacity: 0 !important;
  height: 0 !important;
  padding: 0 !important;
}
</style>