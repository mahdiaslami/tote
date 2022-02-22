<template>
  <p class="navbar">
    Tote {{ version }}
  </p>
</template>

<script setup>

const version = __APP_VERSION__

</script>

<style scoped>
.navbar {
    padding: 20px;
    font-weight: 900;
    color: var(--c-green-dark);
    margin-bottom: 10px;
    box-shadow: 0px 0px 5px;
}
</style>
