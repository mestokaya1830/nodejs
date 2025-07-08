<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-8">
        <h4>{{ post.title }} / {{ post.owner }}</h4>
        <a href="#" @click="getBack()" class="card-link">Return</a>
        <div class="card">
          <div class="card-body">
            <img :src="`/uploads/${post.imageName}`" alt="">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-subtitle mb-2 text-muted">{{ new Date(post.created_at).toLocaleDateString() }}</p>
            <p class="card-text">{{ post.body }}</p>
            <a href="#" @click="getBack()" class="card-link">Return</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {}
    }
  },
  mounted() {
    this.getPost()
  },
  methods: {
    async getPost() {
      await axios.get(`/api/client/${this.post.owner}/post/${this.$route.params.id}`).then(res => {
        if (res.status == 200) {
          this.post = res.data.post
        }
      })
    },
    getBack(){
      window.history.back()
    }
  }
}

</script>

<style>
.container{
  min-width: 80%;
}
.card {
  box-shadow: 2px 2px 5px #ddd, 2px 2px 5px #ddd;
  margin: 5px;
}
.card img{
  max-height: 400px;
}
</style>