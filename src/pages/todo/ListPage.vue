<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import TodoList from './components/TodoList.vue'
import { PersianDate } from '@/class/persiandate.js'
import { reactive, ref } from 'vue'

const swiperContainer = ref<any | null>(null)

const data = reactive({
  selected: { id: null, content: '' },
})

const calendar = reactive({
  current: PersianDate.create(),

  dates: [
    PersianDate.create(),
    PersianDate.create().addDay(),
    PersianDate.create().subDay(),
  ],
})

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
          :date="date"
          @select="(todo) => data.selected = { ...todo }" />
      </swiper-slide>
    </swiper-container>

    <div class="relative h-0 min-w-0 overflow-x-clip">
      <Transition name="left-slide">
        <div v-if="!calendar.current.isToday()"
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
      :date="calendar.current" />

  </div>
</template>