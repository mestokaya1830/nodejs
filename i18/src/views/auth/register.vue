<template>
  <div class="container border rounded p-5">
    <h3 style="margin-bottom: 30px;">Register</h3>
    <div class="mb-3 row">
      <label for="name" class="form-label">Name</label>
      <div>
        <input type="name" v-model="user.name" class="form-control" id="name">
        <div v-if="error.name" class="text text-danger mt-2">{{ error.name.message }}</div>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="email" class="form-label">Email</label>
      <div>
        <input type="email" v-model="user.email" class="form-control" id="email">
        <div v-if="error.email" class="text text-danger mt-2">{{ error.email.message }}</div>
        <div v-if="emailDup" class="text text-danger mt-2">{{ emailDup }}</div>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputPassword" class="form-label">Password</label>
      <div>
        <input type="password" v-model="user.password" class="form-control" id="inputPassword">
        <div v-if="error.password" class="text text-danger mt-2">{{ error.password.message }}</div>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="confirm_password" class="form-label">Confirm Password</label>
      <div>
        <input type="password" v-model="user.passwordConfirm" class="form-control" id="confirm_password">
        <div v-if="passwordMatch" class="text text-danger mt-2">{{ passwordMatch }}</div>
      </div>
    </div>
    <div class="d-grid">
      <button class="btn btn-dark btn-lg" @click="registerUser()">Register</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
      },
      error: {},
      emailDup: '',
      passwordMatch: ''
    }
  },
  methods: {
    async registerUser() {
      this.emailDup = ''
      this.error = ''
      this.passwordMatch = ''
      if(this.user.password !== this.user.passwordConfirm){
        this.passwordMatch = 'Password not match!'
        return false
      }
      await axios.post('/api/register', { user: this.user }).then(res => {
        if (res.status == 201) {
          this.emailDup = res.data
          return false
        }
        if (res.data.errors == undefined) {
          this.$router.push('/login')
        } else {
          this.error = res.data.errors
        }
      })
    }
  },
}
</script>