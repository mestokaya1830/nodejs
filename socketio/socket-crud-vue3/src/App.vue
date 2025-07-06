<script setup>
import { RouterLink, RouterView } from 'vue-router'
const vFocus = { mounted: (el) => el.data() }
</script>

<template>
  <div class="container">
    <input type="button" class="inputs" value="Connect" @click="connect()">
    <input type="button" class="inputs" value="Disonnect" @click="disConnect()">
    <div id="inputs">
      <input type="text" class="inputs" v-model="user.name" placeholder="name">
      <input type="text" class="inputs" v-model="user.password" placeholder="password">
      <button class="inputs" @click="addUser()">Add User</button>
    </div>
    <br><br>
    <input type="text" class="inputs" v-model="search" @keyup="searchUser()" placeholder="search...">
    <h2 id="title">User List</h2>
    <ul id="list">
      <li class="list" v-for="(item, index) in userList" :key="index">
        <span class="list-name">{{ item.name }}</span>
        <span class="list-password">{{ item.password }}</span>
        <input type="button" class="buttons" @click="deleteUser(item._id)" value="Delete">
        <input type="button" class="buttons" @click="updateUser(item._id, index)" value="Update">
        <input type="text" class="inputs update-input"  :data=item._id placeholder="Update password">
      </li>
    </ul>
  </div>
</template>

<script>
import { socket } from "@/socket"
export default {
  name: "Socket",
  data() {
    return {
      user: {
        name: '',
        password: ''
      },
      userList:{},
      search:'',
      updatePassword:''
    }
  },

  mounted(){
    this.getUsers()
  },
  methods: {
    connect() {
      socket.connect()
    },
    disConnect() {
      socket.disconnect()
    },
    sendMessage() {
      socket.timeout(0).emit("message", this.value, () => {
        this.getMessage()
      })
    },
    getUsers() {
      socket.emit('get-users')
      socket.on("send-users", (data) => {
        this.userList = data
      })
    },
    addUser(){
      socket.emit('add-user', this.user)
      this.getUsers()
    },
    updateUser(id){
      let password = document.querySelector(`[data="${id}"]`).value
      socket.emit('update-password', {id:id, password:password})
      this.getUsers()
    },
    deleteUser(id){
      socket.emit('delete-user', id)
      this.getUsers()
    },
    searchUser(){
      
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.inputs {
  margin: 5px;
}
</style>
