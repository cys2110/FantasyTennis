<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';

</script>

<template>
  <div class="header">
    <Header />
  </div>
  <div class="app-body">
    <RouterView />
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #0c15bc;
  z-index: 400;
}
.app-body {
  margin: 0 auto;
  width: 75%;
  margin-top: 10rem;
}
</style>
