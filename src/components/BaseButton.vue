<template>
  <button
    class="b-0 rounded-full cursor-pointer p-2.5 bg-primary
      hover:bg-primary-dark text-primary-darker shadow font-medium"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  emits: ['click'],

  methods: {
    handleClick(e) {
      this.$emit('click', e)
    },
  },
}
</script>
