<template>
  <div>
    <h2 class="title">Login With Social</h2>
    <a :href="`https://github.com/login/oauth/authorize?client_id=${clientId}`" class="btn github">
      <img src="@/assets/github.png" alt="">
      <span>Github Login</span>
    </a>
    <a href="/api/google/auth/google" class="btn google">
      <img src="@/assets/google.png" alt="">
      <span>Google Login</span>
    </a>
  </div>
</template>

<script>
export default {
  name:"Login",
  data () {
    return {
      clientId: ''
    }
  },
  mounted() {
    this.getID()
  },
  methods: {
    async getID(){
      const result = await fetch('/api/github/clientid')
      const final = await result.json()
      this.clientId = final.clientId
    }
  },
}
</script>
<style>
.title{margin-bottom: 50px;}
.btn{
  display: flex;
  align-items: center;
  height: 42px;
  width: 200px;
  border-radius: 4px;
  color: #fff;
  margin-top: 20px;
  padding: 0 10px;
  text-decoration: none;
}
.btn img{
  width: 30px;
  margin-right: 10px;
}
.btn:hover {
  filter: brightness(120%);
}
.github{
  background-color: #dc3545;
}
.google{
  background-color: #0F9D58;
}
</style>