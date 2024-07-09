<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import TodoList from './components/TodoList.vue'
import { PersianDate } from '@/class/persiandate.js'
import { reactive, ref } from 'vue'

const swiperContainer = ref<any | null>(null)

const data = reactive({
  currentDate: PersianDate.create(),
  selected: { id: null, content: '' },

  dates: [
    PersianDate.create(),
    PersianDate.create().addDay(),
    PersianDate.create().subDay(),
  ],
})

function handleSlideChange(ev: any) {
  const [swiper] = ev.detail

  const cur = swiper.realIndex
  const next = (cur + 1) % 3
  const prev = (cur + 2) % 3

  data.currentDate = data.dates[cur]
  data.dates[next] = data.currentDate.duplicate().addDay()
  data.dates[prev] = data.currentDate.duplicate().subDay()
}

function handleGotoToday() {
  let distance = data.currentDate.distanceInDay(new Date())
  const swiper = swiperContainer.value?.swiper

  const cur = swiper.realIndex
  const next = (cur + 1) % 3
  const prev = (cur + 2) % 3

  if (distance > 0) {
    data.dates[next] = PersianDate.create()
    swiper.slideNext()
  } else if (distance < 0) {
    data.dates[prev] = PersianDate.create()
    swiper.slidePrev()
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <swiper-container ref="swiperContainer"
      class="min-h-0 flex-grow"
      loop="true"
      @swiperslidechange="handleSlideChange">

      <swiper-slide class="flex flex-col h-full border-r"
        v-for="(date, dindex) in data.dates"
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
        <div v-if="!data.currentDate.isToday()"
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