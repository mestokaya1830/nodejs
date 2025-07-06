<!-- <script setup>

</script> -->

<template>
  <main>
    <div id="container">
      <h2>Socket.IO Crud</h2>
      <form @submit.prevent="addUser()" class="inputs">
        <input type="text" class="inputs" :v-model="name" placeholder="name">
        <input type="text" class="inputs" v-model="password" placeholder="password">
        <button class="inputs">Add User</button>
        <input type="text" class="inputs" id="search" onkeyup="searchLangs()" placeholder="search...">
        <br><br>
        <hr>
        <h2 id="title">User List</h2>
        <ul id="list">
        </ul>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name:'Users',
  data (){
    return {
      users: {},
      name: '',
      password: ''
    }
  },
  mounted() {
    this.getUsers()
  },
  methods:{
    getUsers(){
      console.log('Hello')
    }
  }
}
</script>
<style lang="">
  
</style>

