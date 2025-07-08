import { io } from "socket.io-client" //npm i socket.io-client
export const socket = io('http://localhost:3000') //connect backend

socket.on("connect", () => {
  console.log('New user connected...')
});

socket.on("disconnect", () => {
  console.log('User disconnected...')
})