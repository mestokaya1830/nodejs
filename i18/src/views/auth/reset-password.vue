<template>
  <div class="container border rounded p-5">
    <h3 style="margin-bottom: 30px;">Reset Password</h3>
    <div class="mb-3 row">
      <label for="email" class="form-label">Email</label>
      <div>
        <input type="email" class="form-control" v-model="email" id="email">
        <div class="text text-danger mt-3 mb-3" v-if="message.email">{{ message.email }}</div>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputPassword" class="form-label">Password</label>
      <div>
        <input type="password" v-model="password" class="form-control" id="inputPassword">
        <div class="text text-danger mt-3 mb-3" v-if="message.password">{{ message.password }}</div>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="confirm_password" class="form-label">Confirm Password</label>
      <div>
        <input type="password" v-model="passwordConfirmation" class="form-control" id="confirm_password">
        <div class="text text-danger mt-3 mb-3" v-if="message.confirm">{{ message.confirm }}</div>
      </div>
    </div>
    <div class="text text-success mt-3 mb-3" v-if="message.success">{{ message.success }}</div>
    <div class="text text-danger mt-3 mb-3" v-if="message.credential">{{ message.credential }}</div>
    <div class="d-grid">
      <button class="btn btn-dark btn-lg" @click="resetPassword()">Reset</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      email:'',
      password:'',
      passwordConfirmation:'',
      message: {}
    }
  },
  methods: {
    async resetPassword() {
      this.message = {}
      if(this.email == ''){
        this.message = {email:'Email don\'t be empty!'}
        return false
      }
      if(this.password == ''){
        this.message = {password:'Password don\'t be empty!'}
        return false
      }
      if(this.password !== this.passwordConfirmation){
        this.message = {confirm:'Password not match!'}
        return false
      }
      await axios.post('/api/reset-password', {password: this.password, email: this.email}).then(res => {
        if(res.status == 200){
          this.message = {success: res.data}
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
        } else {
          this.message = {credential: res.data}
        }
      })
    }
  },
}
</script>