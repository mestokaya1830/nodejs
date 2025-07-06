<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <h2>{{ $store.state.auth.name }} Posts</h2>
      <router-link to="/admin/create"><button class="btn btn-success">Create New Post</button></router-link>
    </div>
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
              <p class="card-text" v-html="(item.body).substring(0, 20)"></p>
              <a :href="`/admin/post/${item._id}`" class="card-link">Read more...</a>
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
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      await axios.get(`/api/admin/posts`).then(res => {
        if (res.status == 200) {
          this.posts = res.data.posts
        }
      })
    }
  }
}

</script>