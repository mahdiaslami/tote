<script setup lang="ts">
import { PersianDate } from '@/class/persiandate';
import type { SwiperContainer } from 'swiper/element';
import { reactive, ref } from 'vue';

const swiperContainer = ref<SwiperContainer | null>(null)

const calendar = reactive({
  current: PersianDate.create(),
  activeIndex: 0,

  dates: [
    PersianDate.create(),
    PersianDate.create().addDay(),
    PersianDate.create().subDay(),
  ],
})

const emit = defineEmits(['datechange'])

defineExpose({
  current: () => calendar.current,
  index: () => swiperContainer.value?.swiper.realIndex || 0,
  gotoToday,
})

function handleSlideChange(ev: any) {
  calendar.activeIndex = -1

  const [swiper] = ev.detail

  const cur = swiper.realIndex
  const next = (cur + 1) % 3
  const prev = (cur + 2) % 3

  calendar.current = calendar.dates[cur]
  calendar.dates[next] = calendar.current.duplicate().addDay()
  calendar.dates[prev] = calendar.current.duplicate().subDay()

  emit('datechange', calendar.current)
}

function handleSlideChangeTransitionEnd(ev: any) {
  const [swiper] = ev.detail

  calendar.activeIndex = swiper.realIndex
}

function gotoToday() {
  if (swiperContainer.value === null) {
    throw 'swiper container is null';
  }

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
  <swiper-container ref="swiperContainer"
    loop="true"
    @swiperslidechange="handleSlideChange"
    @swiperslidechangetransitionend="handleSlideChangeTransitionEnd">

    <swiper-slide class="flex flex-col h-full border-r"
      v-for="(date, index) in calendar.dates"
      :key="index">

      <slot :date="date"
        :active="index == calendar.activeIndex" />
    </swiper-slide>
  </swiper-container>
</template>