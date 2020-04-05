<template>
  <div>
    <div class="row">
      <img
        class="greeter"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKFmgrxjUQda1BgI7YSa9ka-RlUZIh2MQpFfTk6i_SsQxJLh8J&usqp=CAU"
        style="width:300px;height:300px;border-radius:10px"
        alt
      />
      <h2>
        User email:
        <b>{{user}}</b>
      </h2>

      <div class="col-sm-4 center">
        <div class="container">
          <h2>Check the memes which you have</h2>
          <div>
            <span>
              <router-link class="button" to="/created">Created</router-link>
            </span>
            <span>
              <router-link class="button" to="/commented">Commented</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = !!user;
        this.user = user.email;
      }
    });
  },
  name: "appHome",
  props: {},
  data() {
    return {
      loggedIn: false,
      user: "test"
    };
  },
  methods: {}
};
</script>


<style lang="scss" scoped>
div {
  text-align: center;
}
.greeter {
  padding-top: 30px;
}
.container {
  text-align: center;
  display: inline;
}
.button-large {
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  width: 115px;
  background: black;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  color: #f5860a;
  font-weight: bold;
}
.button-large:hover {
  text-decoration: none;
  opacity: 0.7;
}
.button-large:focus {
  text-decoration: none;
  border: 1px #f5860a;
  color: #f5860a;
  outline: none;
  opacity: 0.7;
}
.button {
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  width: 115px;
  background: black;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  color: #f5860a;
  font-weight: bold;
  border: none;
}
.button:focus {
  text-decoration: none;
  border: 1px #f5860a;
  color: #f5860a;
  outline: none;
  opacity: 0.7;
}
.button:hover {
  text-decoration: none;
  opacity: 0.7;
}
span {
  padding: 20px;
}
p {
  text-transform: uppercase;
  letter-spacing: 0.5em;
  display: inline-block;

  span {
    font: 700 2em/1 "Oxanium", cursive;
    letter-spacing: 0;
    padding: 0.25em 0 0.325em;
    display: block;
    margin: 0 auto;
    text-shadow: 0 0 80px rgba(255, 255, 255, 0.5);
    background: url(http://f.cl.ly/items/010q3E1u3p2Q0j1L1S1o/animated_text_fill.png)
      repeat-y;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: #ca6b126e;
    -webkit-animation: aitf-data-v-00ddd0ca 80s linear infinite;
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;
  }
}
@-webkit-keyframes aitf {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
h2 {
  text-align: center;
  color: #f5860a;
}
</style>
