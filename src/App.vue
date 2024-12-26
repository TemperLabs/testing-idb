<script setup lang="ts">

</script>

<template>
   <div class="w-full h-full h-dvh flex flex-col">
    <nav class="flex items-center justify-center p-4 gap-4 bg-blue-900">
      <router-link to="/doctors">Doctors</router-link>
      <router-link to="/nurses">Nurses</router-link>
    </nav>
    <router-view></router-view> <!-- Здесь будет отображаться контент -->
  </div>
</template>
