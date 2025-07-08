<template>
  <div class="container border rounded p-5">
    <h3 style="margin-bottom: 30px;">Email Verfication For Password Reset</h3>
    <p class="active">{{ message.success }}</p>
    <div class="mb-3 row">
      <label for="email" class="form-label">Email</label>
      <div>
        <input type="email" v-model="email" class="form-control" id="email">
        <p class="error">{{ message.error }}</p>
      </div>
    </div>
    <div class="d-grid">
      <button class="btn btn-dark btn-lg" :disabled="message.success != ''" @click="sendEmail()
      ">Send Email</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      email: '',
      message:{
        success: '',
        error: ''
      }
    }
  },
  methods: {
    async sendEmail() {
      await axios.post('/api/emil-verification', {email: this.email}).then(res => {
        if(res.status == 200){
          this.message.success = res.data
          this.email = ''
        }
      })
    }
  },
}
</script>