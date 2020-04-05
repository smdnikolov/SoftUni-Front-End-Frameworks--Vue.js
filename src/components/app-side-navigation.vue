<template>
  <div class="sidenav">
    <router-link to="/hot">
      <span>
        <img class="hot" src="../assets/hot.png" width="24" height="24" />
      </span> Hot
    </router-link>
    <router-link to="/trending">
      <span>
        <img src="../assets/trending-up-1486430-1257239.png" width="24" height="24" />
      </span> Trending
    </router-link>
    <router-link to="/fresh">
      <span>
        <img src="../assets/fresh.png" width="24" height="24" />
      </span>
      Fresh
    </router-link>
  </div>
</template>

<script>
export default {
  name: "appSideNavigation",
  props: {}
};
</script>


<style scoped>
.sidenav {
  display: inline;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: gray;
  display: inline-block;
}
.sidenav a:hover {
  color: #f5860a;
}
.router-link-active {
  color: #f5860a!important;
}

</style>
