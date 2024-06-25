<script setup>
import Todo from '@/components/PannableTodo.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { PersianDate } from '@/class/persiandate.js'
import { useTodoStore } from '@/store/todo.js'
import { reactive, ref } from 'vue'

const todoStore = useTodoStore()

const swiperContainer = ref(null)

const data = reactive({
  currentDate: newDate(0),
  selected: { id: null, content: '' },

  dates: [
    newDate(0),
    newDate(1),
    newDate(-1),
  ],

  gotoTodayVisiable: false,
})

let gotoTodayRunning = false

function handleSlideChange(ev) {
  const [swiper] = ev.detail

  const cur = swiper.realIndex
  const next = (cur + 1) % 3
  const prev = (cur + 2) % 3

  data.currentDate = data.dates[cur]

  let temp = data.currentDate.duplicate()
  temp.move(1)
  data.dates[next] = temp

  temp = data.currentDate.duplicate()
  temp.move(-1)
  data.dates[prev] = temp
}

function handleSlideChangeTransitionEnd(ev) {
  if (gotoTodayRunning) {
    back()
  }

  data.gotoTodayVisiable = !data.currentDate.isToday()
}

function handleGotoToday() {
  gotoTodayRunning = true
  back()
}

function back() {
  let distance = data.currentDate.distanceToToday()

  if (distance > 0) {
    swiperContainer.value.swiper.slideNext(150 / distance)
  } else if ('shorter', distance < 0) {
    swiperContainer.value.swiper.slidePrev(-150 / distance)
  } else {
    gotoTodayRunning = false
  }
}


function newDate(value) {
  const date = new PersianDate()
  date.move(value)

  return date
}


function edit(todo) {
  data.selected = { ...todo }
}

</script>
<template>
  <div class="flex flex-col h-full">
    <swiper-container ref="swiperContainer"
      class="min-h-0 flex-grow"
      loop="true"
      @swiperslidechange="handleSlideChange"
      @swiperslidechangetransitionend="handleSlideChangeTransitionEnd">
      <swiper-slide class="h-full"
        v-for="(date, dindex) in data.dates"
        :key="dindex"
        :data-index="dindex">
        <div class="flex flex-col relative h-full overflow-y-auto overflow-x-hidden border-r">
          <Header class="sticky top-0 left-0 z-10 w-full"
            :date="date" />

          <TransitionGroup name="fade"
            tag="div"
            class="group flex-grow paper swiper-no-swiping">
            <Todo v-for="todo in todoStore.get(date)"
              v-show="!todo.deleted_at"
              class="py-3 first:pt-7.5 w-full"
              :key="todo.id"
              :todo="todo"
              @edit="edit"
              @delete="todoStore.remove(todo.id)"
              @click="todoStore.toggleCompleted(todo.id)" />
          </TransitionGroup>
        </div>
      </swiper-slide>
    </swiper-container>

    <div class="relative h-0 min-w-0 overflow-x-clip">
      <Transition name="left-slide">
        <div v-if="data.gotoTodayVisiable"
          class="absolute left-0 -top-10 z-10 shadow-md rounded-r-full flex flex-row text-pen text-xs">
          <button type="button"
            @click="handleGotoToday"
            class="relative px-4 py-2 rounded-r-full font-medium transition-colors
              bg-info text-white">بازگشت به روز جاری</button>
        </div>
      </Transition>
    </div>

    <Footer v-model:id="data.selected.id"
      v-model:content="data.selected.content"
      :date="data.currentDate" />

  </div>
</template>

<style>
.paper {
  background:
    linear-gradient(#00000000, #00000000 23px, rgb(var(--color-line)) 24px, rgb(var(--color-line)) 24px, #00000000 25px) center top / calc(100% - 64px) 24px repeat-y,
    linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.75)),
    url("@/assets/pattern.png") left top repeat,
    linear-gradient(to bottom left, rgb(var(--color-info) / 0.3), rgb(var(--color-primary) / 0.8)),
    linear-gradient(to bottom right, rgb(var(--color-success) / 0.3), rgb(var(--color-primary) / 0.8));
}
</style>