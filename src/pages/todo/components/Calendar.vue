<script setup lang="ts">
import { PersianDate } from '@/class/persiandate'
import type { SwiperContainer } from 'swiper/element'
import { reactive, ref } from 'vue'

const swiperContainer = ref<SwiperContainer | null>(null)

let reseting = false
const data = reactive({
  activeIndex: 0,

  dates: [
    PersianDate.today(),
    PersianDate.today().addDay(),
    PersianDate.today().subDay(),
  ],
})

const emit = defineEmits(['datechange'])

defineExpose({
  index,
  current,
  reset,
})

function index() {
  return swiperContainer.value?.swiper.realIndex || 0
}

function current(): PersianDate {
  return data.dates[index()]
}

function reset() {
  if (swiperContainer.value === null) {
    throw 'swiper container is null'
  }

  reseting = true

  let distance = current().distanceInDay(new Date())
  const swiper = swiperContainer.value?.swiper
  const cur = swiper.realIndex

  if (distance > 0) {
    const next = (cur + 1) % 3
    data.dates[next] = PersianDate.today()

    swiper.slideNext()
  } else if (distance < 0) {
    const prev = (cur + 2) % 3
    data.dates[prev] = PersianDate.today()

    swiper.slidePrev()
  }
}

function updateDates(index: number) {
  const next = (index + 1) % 3
  const prev = (index + 2) % 3

  data.dates[next] = current().duplicate().addDay()
  data.dates[prev] = current().duplicate().subDay()
}

function handleSlideChange(ev: any) {
  const [swiper] = ev.detail
  if (!reseting) {
    updateDates(swiper.realIndex)
  }
}

function handleSlideChangeTransitionEnd(ev: any) {
  const [swiper] = ev.detail

  if (data.activeIndex != swiper.realIndex) {
    data.activeIndex = swiper.realIndex
    emit('datechange', current())
  }

  if (reseting) {
    reseting = false
    updateDates(swiper.realIndex)
  }
}
</script>

<template>
  <swiper-container ref="swiperContainer"
    loop="true"
    @swiperslidechange="handleSlideChange"
    @swiperslidechangetransitionend="handleSlideChangeTransitionEnd">
    <swiper-slide v-for="(date, dindex) in data.dates"
      :key="dindex"
      class="flex flex-col h-full border-r">
      <slot :date="date"
        :active="dindex == data.activeIndex" />
    </swiper-slide>
  </swiper-container>
</template>