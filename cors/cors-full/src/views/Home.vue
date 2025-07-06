<template>
  <div>
    <h2>{{ title }}</h2>

    <form @submit.prevent="addUser()" ref="form">
      <input type="text" v-model="newUser.name">
      <input type="text" v-model="newUser.password">
      <input type="submit" value="Add User">
    </form>
    <template v-for="item in users" :key="item._id">
      <div class="list">
        <span>{{ item.name }}</span>
        <span>{{ item.password }}</span>
        <button @click="deleteUser(item._id)">Delete</button>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'Home',
  data () {
    return {
      title:'Home Page',
      users: {},
      newUser:{
        name:'',
        password:''
      }
    }
  },
  mounted(){
    this.getUsers()
  },
  methods:{
    async getUsers(){
      await axios.get('http://localhost:3000/api/users').then(result => {
        this.users = result.data
      })
    },
    async addUser(){
      await axios.post('http://localhost:3000/api/newuser', {newuser: this.newUser}).then((result) => {
        if(result.data == 'Saved'){
          this.getUsers()
          this.newUser = {}
        } else {
          console.log(result.data)
        }
      })
    },
    async deleteUser(userID){
      await axios.post('http://localhost:3000/api/deleteuser', {userID: userID}).then((result) => {
        if(result.data == 'Deleted'){
          this.getUsers()
        } else {
          console.log(result.data)
        }
      })
    }
  }
}
</script>


