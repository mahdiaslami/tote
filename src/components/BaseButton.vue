<template>
  <button
    class="btn-save p-2.5 bg-primary hover:bg-primary-dark text-primary-darker shadow"
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

<style>
.btn-save {
    border: 0;
    border-radius: 50px;
    cursor: pointer;
    font-family: 'Montserrat', Vazir;
    font-weight: 500;
}
</style>
