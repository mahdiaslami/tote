<template>
  <p class="navbar text-primary-dark">
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
    margin-bottom: 10px;
    box-shadow: 0px 0px 5px;
}
</style>
