<template>
  <div>
    <h2>Contact</h2>
    <p>{{ userInfo }}</p>
  </div>
</template>


<script>
export default {
  name:"Login",
  data () {
    return {
      userInfo: {}
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo(){
      const result = await fetch('/api/github/user-profile')
      const final = await result.json()
      this.userInfo = final
    }
  },
}
</script>