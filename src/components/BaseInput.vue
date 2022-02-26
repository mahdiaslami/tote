<template>
  <div class="title-input p-2.5">
    <div class="image">
      <img
        src="@/assets/writing-hand.gif"
        alt="writing-hand"
      >
    </div>

    <input
      v-model="value"
      type="text"
      dir="auto"
      @keyup.enter="$emit('enterKeyup')"
    >
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },

  emits: ['update:modelValue', 'enterKeyup'],

  computed: {
    value: {
      get() {
        return this.modelValue
      },

      set(val) {
        return this.$emit('update:modelValue', val)
      },
    },
  },
}
</script>

<style scoped>
.title-input {
    border: 1px solid lightgrey;
    border-radius: 50px;
    display: flex;
    align-items: center;
    margin-right: 10px;
    background-color: white;
}

.image {
    padding: 0 15px;
}

img {
    height: 40px;
    width: 40px;
    margin: -10px;
}

input {
    flex-grow: 1;
    border: 0;
    font-family: 'Montserrat', Vazir;
}

input:focus {
    outline: 0;
}
</style>
