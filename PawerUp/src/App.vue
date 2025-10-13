<template>
  <header>
    <BHeader />
  </header>
  <main class="page-main">
    <router-view></router-view>
  </main>
</template>

<script setup>
import BHeader from './components/BHeader.vue'
</script>

<style>
nav {
  padding: 15px;
  text-align: center;
  font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
}

router-link {
  margin: 0 10px;
  text-decoration: none;
  color: #212615;
  font-weight: 500;
}

router-link:hover {
  color: #89b8a3;
}

router-link.router-link-active {
  font-weight: 600;
  color: #5c8b39;
}
.page-main {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
