<script setup>
import AppTextArea from '@/components/TextArea.vue'
import { useTodoStore } from '@/store/todo.js'
import { PersianDate } from '@/class/persiandate.js'
import { reactive } from 'vue'
import IconSend from '@/components/icons/IconSend.vue'

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
  <footer class="absolute bottom-0 z-50 flex flex-row items-center w-full px-5 mb-5">
    <Transition name="fade">
      <div
        v-if="content.trim() != '' && date.isToday()"
        class="absolute z-10 flex flex-row text-xs rounded-md shadow-md left-5 -top-10 bg-dark-600 text-stone-300"
      >
        <button
          type="button"
          class="relative px-4 py-2 font-medium transition-colors rounded-r-md"
          :class="{ 'bg-info text-white': data.daily }"
          @click="data.daily = true"
        >
          روزانه
        </button>

        <button
          type="button"
          class="relative px-4 py-2 -ml-px font-medium transition-colors rounded-l-md"
          :class="{ 'bg-info text-white': !data.daily }"
          @click="data.daily = false"
        >
          اجباری
        </button>
      </div>
    </Transition>

    <button
      class="right-0 p-3 ml-5 rounded-full bg-info"
      @click="save"
    >
      <IconSend
        class="stroke-dark-900"
      />
    </button>

    <AppTextArea
      v-model="content"
      class="w-full h-auto p-3 font-light text-white rounded-lg min-h-12 bg-dark-900"
      placeholder="کار من"
      @keyup.enter="save"
    />
  </footer>
</template>