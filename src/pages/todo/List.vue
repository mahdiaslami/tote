<script setup>
import ArrowUpwardIcon from '@/components/icons/ArrowUpwardIcon.vue'
import AppTextArea from '@/components/TextArea.vue'
import Todo from '@/components/PannableTodo.vue'
import Header from '@/components/Header.vue'
import { PersianDate } from '@/class/persiandate.js'
import { useTodoStore } from '@/store/todo.js'
import { reactive, ref } from 'vue'

const todoStore = useTodoStore()

const swiperContainer = ref(null)

const data = reactive({
  content: '',
  currentDate: newDate(0),
  daily: true,

  selected: null,

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

function save() {
  const content = data.content.trim()

  if (!content) {
    return
  }

  if (data.selected) {
    todoStore.update(data.selected.id, {
      ...data.selected,
      content: data.content
    })
  } else {
    todoStore.addNew(content, data.daily || !data.currentDate.isToday() ? data.currentDate : null)
  }

  data.content = ''
  data.selected = null
}

function edit(todo) {
  data.selected = todo
  data.content = todo.content
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

    <div class="relative flex flex-row items-end bg-secondary min-w-0 overflow-x-clip">
      <Transition name="fade">
        <div v-if="data.content.trim() != '' && data.currentDate.isToday()"
          class="absolute right-2 -top-10 z-10 bg-secondary shadow-md
        rounded-md flex flex-row text-pen text-xs">
          <button type="button"
            @click="data.daily = true"
            class="relative px-4 py-2 rounded-r-md font-medium transition-colors"
            :class="{ 'bg-info text-white': data.daily }">روزانه</button>

          <button type="button"
            @click="data.daily = false"
            class="-ml-px relative px-4 py-2 rounded-l-md font-medium transition-colors"
            :class="{ 'bg-info text-white': !data.daily }">اجباری</button>
        </div>
      </Transition>

      <Transition name="left-slide">
        <div v-if="data.gotoTodayVisiable"
          class="absolute left-0 -top-10 z-10 shadow-md
        rounded-r-full flex flex-row text-pen text-xs">
          <button type="button"
            @click="handleGotoToday"
            class="relative px-4 py-2 rounded-r-full font-medium transition-colors
              bg-info text-white">بازگشت به روز جاری</button>
        </div>
      </Transition>

      <AppTextArea v-model="data.content"
        class="w-full h-auto p-3 font-light min-h-12"
        placeholder="کار من"
        @keyup.enter="save" />

      <button class="flex items-center justify-center w-14 h-12 select-none"
        @click="save">
        <ArrowUpwardIcon class="text-2xl font-thin text-mute" />
      </button>
    </div>
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