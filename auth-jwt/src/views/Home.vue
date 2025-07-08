<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Token</p>
    <p class="token">{{ token }}</p>
    {{ users }}
  </div>
</template>

<script>
export default {
  name:'Home',
  data () {
    return {
      title:'Home Page',
      token: null,
      users: {}
    }
  },
  mounted(){
    this.getUsers()
  },
  methods:{
    async getUsers(){
      const token = JSON.parse(localStorage.getItem('token'))
      if(!token){
        this.$router.push('/login')
      } else {
        const result = await fetch('/api/users', {
        method: 'get',
        headers: {
          Authorization: "Bearer " + token, "x-access-token": token}
      })
      const final = await result.json()
        this.users = final.users
        this.token = token
      }
      console.log(token)
    }
  }
};
</script>

<style>
.token{
  margin-bottom: 40px;
}
</style>