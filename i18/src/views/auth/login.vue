<template>
  <div class="container border rounded p-5">
    <h3 style="margin-bottom: 30px;">Login</h3>
    <div class="mb-3 row">
      <label for="email" class="form-label">Email</label>
      <div>
        <input type="email" v-model="user.email" class="form-control" id="email">
        <div v-if="error.email" class="text text-danger mt-2">{{ error.email }}</div>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputPassword" class="form-label">Password</label>
      <div>
        <input type="password" v-model="user.password" class="form-control" id="inputPassword">
        <div v-if="error.password" class="text text-danger mt-2">{{ error.password }}</div>
      </div>
    </div>
    <div class="mb-3 row">
      <router-link to="email-verfication" style="text-decoration: none;">Forget your password?</router-link>
    </div>
    <div class="text text-danger m-2">{{ credential }}</div>
    <div class="d-grid">
      <button class="btn btn-dark btn-lg" @click="loginUser()">Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      error: {
        email:'',
        password: ''
      },
      credential:''
    }
  },
  methods: {
    async loginUser() {
      this.error = {}
      if(this.user.email == ''){
        this.error = {email: 'Email cant be null'}
      } else if(this.user.password == ''){
        this.error = {password: 'Password cant be null'}
      } else {
        await axios.post('/api/login', { user: this.user }).then(res => {
          if (res.status == 200) {
            this.$store.commit('setAuth', res.data)
            this.$router.push('/admin/')
          } else {
            this.credential = res.data
          }
        })
      }
    }
  },
}
</script>