<script setup lang="ts">
import CloudOffIcon from '@/components/icons/CloudOffIcon.vue'
import { PersianDate } from '@/class/persiandate.js';


defineProps({
    date: {
        type: PersianDate,
        required: true
    }
})

</script>

<template>
    <div class="flex flex-row h-18 bg-secondary border-b"
        :class="[date.isHoliday() ? 'text-danger border-danger' : 'border-success']">
        <div class="text-4xl p-4 w-18 text-center">{{ date.getPersianDate() }}</div>
        <div class="flex flex-col justify-center flex-grow">
            <div class="my-1">{{ date.getPersianWeekday() }}</div>
            <div class="my-1 text-sm">{{ date.getPersianMonthName() }} {{ date.getPersianFullYear() }}</div>
        </div>
        <div class="text-4xl p-4 w-18 text-center">
            <CloudOffIcon class="text-mute" />
        </div>
    </div>
</template>