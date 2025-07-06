<template>
  <div>
    <nav class="navbar">
      <div>
        <router-link to="/" class="links" exact-active-class="active">Home</router-link>
        <router-link to="/about" class="links" exact-active-class="active">About</router-link>
        <router-link to="/contact" class="links" exact-active-class="active">Contact</router-link>
      </div>
      <div v-if="!$store.state.auth">
        <router-link to="/register" class="links" exact-active-class="active">Register</router-link>
        <router-link to="/login" class="links" exact-active-class="active">Login</router-link>
      </div>
      <div v-else class="dropdown">
        <router-link to="/admin" class="links" exact-active-class="active">{{ $store.state.auth.name }}</router-link>
        <img src="https://picsum.photos/200/300" alt="" class="btn btn-secondary dropdown-toggle"
          id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="/admin">Posts</a></li>
          <li>
            <button type="submit" class="dropdown-item" @click="logoutUser()">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Navbar',
  data() {
    return {
    
    }
  },
  methods: {
    async logoutUser() {
      await axios.post('/api/logout').then(res => {
        if (res.status == 204) {
          this.$store.commit('setAuth', '')
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 20px;
  background: #000;
}

.links {
  color: #fff;
  text-decoration: none;
  font-size: 22px;
  margin: 0 15px;
}

.active {
  color: green;
}
</style>