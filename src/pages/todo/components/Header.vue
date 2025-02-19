<script setup lang="ts">
import { SafeArea } from '@aashu-dubey/capacitor-statusbar-safe-area'
import { PersianDate } from '@/class/persiandate.js'
import { ref } from 'vue'

const statusBarHeight = ref(0)
SafeArea.getStatusBarHeight()
  .then(({ height }) => statusBarHeight.value = height)

defineProps({
  date: {
    type: PersianDate,
    required: true
  }
})

</script>

<template>
  <div class="flex flex-row bg-white border-b-2"
    :class="[
      date.isHoliday() ?
        'text-rose-600 border-rose-600'
        : 'text-slate-700 border-slate-300'
    ]"
    :style="{
      height: `${72 + statusBarHeight}px`,
      paddingTop: `${statusBarHeight}px`
    }">
    <div class="text-4xl p-4 w-18 text-center">{{ date.getPersianDate() }}</div>
    <div class="flex flex-col justify-center flex-grow">
      <div class="my-1">{{ date.getPersianWeekday() }}</div>
      <div class="my-1 text-sm">
        {{ date.getPersianMonthName() }} {{ date.getPersianFullYear() }}
      </div>
    </div>
  </div>
</template>