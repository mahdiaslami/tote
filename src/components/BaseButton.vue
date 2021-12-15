<template>
  <button
    class="btn-save"
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
    background-color: var(--c-green);
    border: 0;
    border-radius: 50px;
    box-shadow: 0px 1px 1px 0px var(--c-green-dark);
    color: var(--c-green-darker);
    cursor: pointer;
    font-family: 'Montserrat', Vazir;
    font-weight: 500;
    padding: 10px;
}

.btn-save:hover {
    background-color: var(--c-green-dark);
}
</style>
