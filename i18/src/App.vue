<script setup>
import Navbar from './components/Navbar.vue'
</script>
<template>
  <Navbar />
  <RouterView class="router"/>
</template>

<style>
.router {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px 100px;
}
</style>