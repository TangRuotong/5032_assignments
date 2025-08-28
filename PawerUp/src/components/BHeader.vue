<script setup></script>

<template>
  <nav class="custom-navbar">
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/" class="nav-link" active-class="active">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link" active-class="active">About</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/services" class="nav-link" active-class="active">Services</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/contact" class="nav-link" active-class="active">Contact</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.custom-navbar {
  display: flex;
  justify-content: center;
  padding: 15px 0;
  background: linear-gradient(135deg, #fafcf8, #fbcda1);
  border-radius: 50px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  font-family: 'Poppins', sans-serif; 
  margin: 20px auto;
  max-width: 900px;
}

.nav-list {
  display: flex;
  gap: 25px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  padding: 10px 20px;
  border-radius: 30px;
  text-decoration: none;
  color: #212615;
  font-weight: 500;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(2px);
}
