<template>
  <div
    class="task"
  >
    <input
      class="tick"
      type="checkbox"
      :checked="completed"
      @change="$emit('tickClick', completed)"
    >
    <span
      class="content"
      :class="{
        'bold linethrough': completed,
        'underline': focused
      }"
      dir="auto"
      @click="$emit('click')"
    >
      {{ text }}
    </span>
    <button
      class="btn btn-delete"
      @click="$emit('deleteClick')"
    >
      ✗
    </button>
  </div>
</template>

<script>
export default {
  props: {
    completed: {
      type: Boolean,
      require: false,
      default: false,
    },

    focused: {
      type: Boolean,
      required: false,
      default: false,
    },

    text: {
      type: String,
      required: true,
    },
  },

  emits: ['tickClick', 'click', 'deleteClick'],
}
</script>
