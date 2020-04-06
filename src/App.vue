<template>
  <div>
    <app-navbar />
    <div class="container-fluid" id="app">
      <div class="row">
        <div class="col-sm-4 left">
          <app-side-navigation />
          <app-categories />
          <app-footer />
        </div>
        <div class="col-sm-4 right">
          <app-side-nav-right />
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import appNavbar from "./components/app-navbar.vue";
import appFooter from "./components/app-footer.vue";
import appSideNavRight from "./components/app-side-nav-right";
import appSideNavigation from "./components/app-side-navigation";
import appCategories from "./components/app-categories.vue";

export default {
  name: "App",
  components: {
    appNavbar,
    appFooter,
    appSideNavigation,
    appCategories,
    appSideNavRight
  }
};
</script>

<style>
body {
  font-family: "Oxanium", cursive;
}
.toast-container {
  margin-top: 90px;
}
.left {
  float: left;
  position: fixed;
  text-align: center;
  border: 2px #f5860a solid;
  border-radius: 10px;
  background: #f2f2f2;
  width: 14%;
  height: 820px;
  left: 6%;
}
.center {
  position: relative;
  left: 33.3333%;
}
.right {
  position: fixed;
  text-align: center;
  left: 80.2%;
  border: 2px #f5860a solid;
  border-radius: 10px;
  background: #f2f2f2;
  width: 14%;
  height: 820px;
}
.row {
  margin-top: 100px;
  margin-left: 0px;
  margin-right: 0px;
}
.line {
  width: 100% !important;
}
input {
  border: 1px solid #f5860a !important;
}
select:focus {
  outline-color: #f5860a;
}
select {
  border: 1px solid #f5860a !important;
}
.sidenav a {
  padding: 6px 8px 6px 16px;
  /* text-decoration: none; */
  font-size: 25px;
  color: gray;
  display: grid;
  /* display: inline-block; */
}
</style>
