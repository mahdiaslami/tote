<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import TodoList from './components/TodoList.vue'
import { PersianDate } from '@/class/persiandate.js'
import { reactive, ref } from 'vue'

const swiperContainer = ref<any | null>(null)

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

function handleSlideChange(ev: any) {
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

function handleSlideChangeTransitionEnd(ev: any) {
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
    swiperContainer.value?.swiper.slideNext(150 / distance)
  } else if (distance < 0) {
    swiperContainer.value?.swiper.slidePrev(-150 / distance)
  } else {
    gotoTodayRunning = false
  }
}


function newDate(value: number) {
  const date = new PersianDate()
  date.move(value)

  return date
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
        v-for="(date, dindex) in data.dates"
        :key="dindex"
        :data-index="dindex">

        <Header class="w-full z-10"
          :date="date" />

        <div class="flex-grow overflow-y-auto overflow-x-hidden">
          <TodoList class="min-h-full swiper-no-swiping pb-10"
            :date="date"
            @select="(todo) => data.selected = { ...todo }" />
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