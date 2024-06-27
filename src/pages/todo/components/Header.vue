<script setup>
import CloudOffIcon from '@/components/icons/CloudOffIcon.vue'
import { PersianDate } from '@/class/persiandate.js'


defineProps({
  date: {
    type: PersianDate,
    required: true
  }
})

</script>

<template>
  <header
    class="flex flex-row text-white bg-dark-800"
  >
    <div class="p-4 text-4xl text-center">
      {{ date.getPersianDate() }}
    </div>

    <div class="flex flex-col justify-center flex-grow">
      <div
        class="my-1"
        :class="{'text-danger': date.isHoliday()}"
      >
        {{ date.getPersianWeekday() }}
      </div>

      <div class="my-1 text-sm">
        {{ date.getPersianMonthName() }} {{ date.getPersianFullYear() }}
      </div>
    </div>

    <div class="p-4 text-4xl text-center">
      <CloudOffIcon class="text-mute" />
    </div>
  </header>
</template>