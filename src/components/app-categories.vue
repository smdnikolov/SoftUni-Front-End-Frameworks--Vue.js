<template>
  <div class="catnav">
    <h3>Categories</h3>
    <ul style="list-style:none;">
      <li v-for="(category,index) in categories" :key="index">
        <router-link :to="category.link">
          <img :src="category.src" />
          <p>{{category.name}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import categories from "../categories.js";
export default {
  name: "appCategories",
  props: {},
  data() {
    return {
      categories: categories
    };
  }
};
</script>


<style scoped>
.catnav {
  z-index: 1;
  overflow-x: hidden;
  padding: 10px 0;
  display: flow-root;
  text-align: center;
}

.catnav a {
  text-decoration: none;
  font-size: 15px;
  color: gray;
  display: block;
  text-align: center;
}

.catnav a:hover {
  color: #f5860a;
}
.catnav a:active {
  color: #f5860a;
  text-decoration-style: dashed;
}
img {
  width: 86px;
}
ul {
  width: 100%;
  text-align: center;
  font-size: 20px;
  display: table;
  padding: 0;
}
li {
  text-align: center;
  display: inline-table;
  padding: 5px;
  width: 100px;
}
p {
  padding-top: 5px;
}
.router-link-active {
  color: #f5860a !important;
}
</style>
