<template>
  <div class="flex justify-between text-ternary p-5 font-bold mb-2.5 shadow-md">
    <p>
      Tote {{ version }}
    </p>

    <router-link :to="{ name: 'GroupList' }">
      <category-icon />
    </router-link>
  </div>
</template>

<script setup>
import CategoryIcon from '@/components/icons/CategoryIcon'

const version = __APP_VERSION__

</script>
