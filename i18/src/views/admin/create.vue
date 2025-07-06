<template>
  <div>
    <div class="container">
      <h1>Create New Post</h1>
      <h3 class="text text-success text-center">{{ message }}</h3>
      <form @submit.prevent id="form" class="border rounded p-4">
        <div class="mb-3 row">
          <label for="title">Title</label>
          <div>
            <input type="text" class="form-control" v-model="post.title">
            <div class="text text-danger mt-2" v-if="error.title">{{ error.title }}</div>
          </div>
          <label for="body">Body</label>
          <div>
            <textarea class="form-control" rows="10" v-model="post.body" id="body"></textarea>
            <div class="text text-danger mt-2" v-if="error.body">{{ error.body }}</div>
          </div>
          <label for="title">Image</label>
          <div>
            <input type="file" ref="file"  @change="selectImage($event)" accept="image/*">
            <div class="text text-danger mt-2" v-if="error.file">{{ error.file }}</div>
          </div>
          <div class="d-grid mt-3">
            <button class="btn btn-dark" @click="createPost()">Create</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  
</template>
<script>
import axios from 'axios'
export default {
  name: 'Index',
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
      data: '',
      message: '',
      error: {}
    }
  },
  methods: {
    selectImage(event){
      this.data = new FormData()
      this.data.append('file', event.target.files[0])
      this.data.append('post', JSON.stringify(this.post))
    },
    async createPost() {
    if(this.post.title == ''){
      this.error = {title: 'Title cant bu null!'}
    } else if(this.post.body == ''){
      this.error = {body: 'Body cant be null!'}
    } else if(this.post.imageName == ''){
      this.error = {file: 'No selected file!'}
    } else {
        await axios.post('/api/admin/create', this.data).then(res => {
          if (res.status == 200) {
            this.message = res.data
          }
        })
      }
    }
  },
}
</script>
<style></style>