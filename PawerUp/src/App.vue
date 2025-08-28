<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
      <router-link to="/booking">Booking</router-link> |
      <router-link to="/programs">Programs</router-link> |
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script setup></script>

<style scoped>
nav {
  padding: 15px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
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
</style>
