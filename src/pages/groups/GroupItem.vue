<template>
  <div
    class="h-20 min-w-1/2 p-1"
  >
    <div
      class="border text-primary-darker
          h-full p-2 rounded shadow"
    >
      {{ group.title }}
    </div>
  </div>
</template>

<script setup>

defineProps({
  group: {
    type: Object,
    required: true,
  },
})

</script>
