<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <input type="button" class="inputs" value="Connect" @click="connect()">
    <input type="button" class="inputs" value="Disonnect" @click="disConnect()">
    <input v-model="value" class="inputs" placeholder="Enter a message"/>
    <button type="button" class="inputs" @click="sendMessage()">Send Message</button>
    {{ message }}
  </div>
</template>

<script>
import { socket } from "@/socket"
export default {
  name: "Socket",
  data() {
    return {
      value: "",
      message: ''
    }
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
    getMessage() {
      socket.on("message", (data) => {
        console.log(data)
        this.message = data
      })
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.inputs{
  margin: 5px;
}
</style>
