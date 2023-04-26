<template>
  <div
    v-show="visible"
    class="fixed inset-x-0 bottom-0 m-4 p-3 shadow-2xl rounded border text-right
        bg-secondary"
    role="alert"
  >
    <div>
      <span>
        {{ getMessage() }}
      </span>
    </div>
    <div class="pt-2.5 text-left">
      <button
        class="bg-blue-600 text-white p-2.5 rounded-full text-xs font-bold mr-2 w-20"
        @click="confirmed"
      >
        بله
      </button>
      <button
        class="bg-yellow-500 text-white p-2.5 rounded-full text-xs font-bold w-20"
        @click="close"
      >
        خیر
      </button>
    </div>
  </div>
</template>

<script setup>
import { useConfirm } from '@/hooks/useConfirm.js'

const {
  visible,
  getMessage,
  confirmed,
  close,
} = useConfirm()

</script>
