<template>
  <div class="container">
    <h2>{{ owner }} Posts</h2>
    <a href="#" @click="getBack()">Return</a>
    <div class="row">
    <template v-for="item in posts" :key="item._id">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <img :src="`/uploads/${item.imageName}`" alt="">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-subtitle mb-2 text-muted">
                {{ new Date(item.created_at).toLocaleDateString() }}
                <strong>{{ item.owner }}</strong>
              </p>
              <p class="card-text">{{ String(item.body).substring(0, 200) }}</p>
              <a :href="`/${item.owner}/post/${item._id}`" class="card-link">Read more...</a>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: {},
      owner: ''
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      await axios.get(`/api/client/${this.$route.params.user}/posts`).then(res => {
        if (res.status == 200) {
          this.posts = res.data.posts
          this.owner = res.data.posts[0].owner
        }
      })
    },
    getBack(){
      window.history.back()
    }
  }
}

</script>
