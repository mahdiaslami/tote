<template>
  <div
    v-if="offlineReady || needRefresh"
    class="fixed inset-x-0 bottom-0 m-4 p-3 shadow-2xl rounded border text-right
      bg-primary"
    role="alert"
  >
    <div>
      <span v-if="offlineReady">
        برنامه آماده است که به صورت آفلاین کار کند.
      </span>
      <span
        v-else
        class="dir-rtl"
      >
        محتوای جدید موجود است، روی Reload کلیک کنید تا بروز رسانی شود.
      </span>
    </div>
    <div class="pt-2.5 text-left">
      <button
        v-if="needRefresh"
        class="bg-blue-600 text-white p-2.5 rounded-full text-xs font-bold mr-2"
        @click="updateServiceWorker()"
      >
        Reload
      </button>
      <button
        class="bg-yellow-500 text-white p-2.5 rounded-full text-xs font-bold"
        @click="
          close"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW()

const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
  background-color: white;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>
