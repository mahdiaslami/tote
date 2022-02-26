<template>
  <div
    class="p-2.5 border border-solid border-gray-300 rounded-full flex items-center
    mr-2.5 bg-white"
  >
    <div class="py-0 pl-1">
      <img
        class="h-10 w-10 -my-2.5"
        src="@/assets/writing-hand.gif"
        alt="writing-hand"
      >
    </div>

    <input
      v-model="value"
      class="flex-grow border-0 focus:outline-none"
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
