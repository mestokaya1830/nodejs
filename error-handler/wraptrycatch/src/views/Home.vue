<template>
  <div>
    <h2>{{ title }}</h2>
    {{ user }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'Home',
  data () {
    return {
      title:'Home Page',
      user: null
    }
  },
  mounted(){
    this.getUser()
  },
  methods:{
    async getUser(){
      // const result = await fetch('/api')
      // this.user = await result.json()
      await axios.get('/api').then(result => {
        if(result.data){
          this.user = result.data
        } else {
          console.log(result.data)
        }
        
      })
    }
  }
};
</script>