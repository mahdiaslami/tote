<script setup>
import ArrowUpwardIcon from '@/components/icons/ArrowUpwardIcon.vue'
import AppTextArea from '@/components/TextArea.vue'
import { useTodoStore } from '@/store/todo.js'
import { PersianDate } from '@/class/persiandate.js'
import { reactive } from 'vue';

const todoStore = useTodoStore()

const props = defineProps({ date: { type: PersianDate } })

const id = defineModel('id')
const content = defineModel('content')

const data = reactive({
  daily: false
})

function save() {
  const trimedContent = content.value.trim()

  if (!trimedContent) {
    return
  }

  if (id.value) {
    todoStore.update(id.value, {
      content: trimedContent
    })
  } else {
    todoStore.addNew(trimedContent, data.daily || !props.date.isToday() ? props.date : null)
  }

  content.value = ''
  id.value = null
}

</script>

<template>
  <div class="relative flex flex-row items-end bg-secondary">
    <Transition name="fade">
      <div v-if="content.trim() != '' && date.isToday()"
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

    <AppTextArea v-model="content"
      class="w-full h-auto p-3 font-light min-h-12"
      placeholder="کار من"
      @keyup.enter="save" />

    <button class="flex items-center justify-center w-14 h-12 select-none"
      @click="save">
      <ArrowUpwardIcon class="text-2xl font-thin text-mute" />
    </button>
  </div>
</template>