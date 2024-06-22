<script setup>
import ArrowUpwardIcon from '@/components/icons/ArrowUpwardIcon.vue'
import AppTextArea from '@/components/TextArea.vue'
import Todo from '@/components/PannableTodo.vue'
import Header from '@/components/Header.vue'
import { PersianDate } from '@/class/persiandate.js'
import { useTodoStore } from '@/store/todo.js'
import { reactive } from 'vue'

const todoStore = useTodoStore()

const data = reactive({
  content: '',
  selected: null,
  dates: [
    newDate(0),
    newDate(1),
    newDate(-1),
  ],
  currentDate: newDate(0)
})

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


function newDate(value) {
  const date = new PersianDate()
  date.move(value)

  return date
}

function save() {
  if (data.content.trim()) {

    if (data.selected) {
      todoStore.update(data.selected.id, { ...data.selected, content: data.content })
    } else {
      todoStore.addNew(data.content.trim(), data.currentDate)
    }

    data.content = ''
    data.selected = null
  }
}

function remove(todo) {
  todoStore.remove(todo.id)
}

function edit(todo) {
  data.selected = todo
  data.content = todo.content
}

function toggleCompleted(todo) {
  todoStore.toggleCompleted(todo.id)
}

</script>
<template>
  <div class="flex flex-col h-full ">
    <swiper-container class="min-h-0 flex-grow"
      loop="true"
      @swiperslidechange="handleSlideChange">
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
              class="py-3 first:pt-7.5"
              :key="todo.id"
              :todo="todo"
              @edit="edit"
              @delete="remove"
              @click="toggleCompleted(todo)" />
          </TransitionGroup>
        </div>
      </swiper-slide>
    </swiper-container>

    <div class="relative flex flex-row items-end bg-secondary">
      <AppTextArea v-model="data.content"
        class="w-full h-auto p-3 font-light min-h-12"
        placeholder="کار من"
        @keyup.enter="save" />
      <button class="flex items-center justify-center w-14 h-12 select-none"
        @contextmenu.prevent="console.log('here')"
        @click="save">
        <ArrowUpwardIcon class="text-2xl font-thin text-mute" />
      </button>
    </div>

    <div class="absolute w-28 left-2 top-0">ثبت کار اجباری</div>
  </div>
</template>

<style>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}

.paper {
  background:
    linear-gradient(#00000000, #00000000 23px, rgb(var(--color-line)) 24px, rgb(var(--color-line)) 24px, #00000000 25px) center top / calc(100% - 64px) 24px repeat-y,
    linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.75)),
    url("@/assets/pattern.png") left top repeat,
    linear-gradient(to bottom left, rgb(var(--color-info) / 0.3), rgb(var(--color-primary) / 0.8)),
    linear-gradient(to bottom right, rgb(var(--color-success) / 0.3), rgb(var(--color-primary) / 0.8));
}
</style>