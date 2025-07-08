<template>
  <div class="container">
    <h2>Vue Pagination</h2>
    <ul class="pagination">
    </ul>
    <!-- mongodb -->
    <!-- <table>
      <thead>
        <tr class="table-header">
          <th class="table-header-item">ID</th>
          <th class="table-header-item">Name</th>
          <th class="table-header-item">Gender</th>
          <th class="table-header-item">Country</th>
        </tr>
      </thead>
      <tr class="table-list" v-for="(item, index) in persons" :key="index">
        <td class="table-list-item">{{ item.index }}</td>
        <td class="table-list-item">{{ item.name }}</td>
        <td class="table-list-item">{{ item.gender }}</td>
        <td class="table-list-item">{{ item.company.location.country }}</td>
      </tr>
    </table> -->
    <!-- mysql -->
    <table>
      <thead>
        <tr class="table-header">
          <th class="table-header-item">ID</th>
          <th class="table-header-item">Name</th>
          <th class="table-header-item">Age</th>
        </tr>
      </thead>
      <tr class="table-list" v-for="(item, index) in persons" :key="index">
        <td class="table-list-item">{{ item.index }}</td>
        <td class="table-list-item">{{ item.name }}</td>
        <td class="table-list-item">{{ item.age }}</td>
      </tr>
    </table>
    <ul class="pagination">
      <li v-for="(item, index) in parseInt(pages)" :key="index">
        <span @click="nextPage(item)">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      persons: {},
      pages: 1,
    };
  },
  mounted() {
    this.getPersons();
  },
  methods: {
    async getPersons() {
      await axios.post("http://localhost:3000/").then((result) => {
        this.persons = result.data.result;
        this.pages = result.data.length[0].count / 5
      })
    },
    async nextPage(page = 1) {
      await axios.post("http://localhost:3000/" , {page}).then((result) => {
        this.persons = result.data.result;
        window.scrollTo(0, 0)
      })
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.pagination{margin-top: 30px;}
.pagination li{
  margin: 0 10px;
}
.pagination li span{
  display: inline-block;
  min-width: 30px;
  background-color: #ddd;
  padding: 3px 6px;
  border-radius: 3px;
  cursor: pointer;
}
.pagination li span:hover{
  background-color: cadetblue;
}
</style>
