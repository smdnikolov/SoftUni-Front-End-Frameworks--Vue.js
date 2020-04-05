<template>
  <div>
    <h1 v-if="loggedIn">Hello Friend</h1>
    <div class="row">
      <div class="col-sm-4 center">
        <div class="container" v-if="loggedIn">
          <div>
            <span>
              <router-link class="button" to="/share">Share a Meme</router-link>
            </span>
            <span>
              <router-link class="button" to="/profile">Profile</router-link>
            </span>
            <span>
              <button class="button" @click="logOut()">Log Out</button>
            </span>
          </div>

          <img
            class="greeter"
            src="https://media3.giphy.com/media/ggtpYV17RP9lTbc542/giphy.gif?cid=ecf05e472d6dc11e7f979a31c6602cfc1917e88518cde26a&rid=giphy.gif"
            alt
          />
        </div>
        <div class="container" v-else>
          <div>
            <div>
              <p>
                <span>Well you have found the fun. Now pick a category and Enjoy !</span>

                <img
                  src="https://media1.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif?cid=ecf05e4710d6b1f7d88c72c2f2408ddf59ed3021881c7b77&rid=giphy.gif"
                  height="400px"
                  alt
                />
              </p>
            </div>
            <div>
              <p>
                <span>Got some MEMES to share or some COMMENTS to throw. Wait no more! Join now</span>
              </p>
              <span>
                <router-link class="button" to="/login">Login</router-link>
              </span>

              <span>
                <router-link class="button" to="/register">Register</router-link>
              </span>
            </div>
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
  beforeCreate() {
    console.log(1);
    firebase
      .auth()
      .onAuthStateChanged(data => {
        if (data.email) {
          this.loggedIn = true;
        }
      })
      .catch(err => console.log(err));
  },
  props: {},
  data() {
    return {
      loggedIn: false
    };
  },
  methods: {
    logOut() {
      this.loggedIn = false;
      firebase.auth().signOut();
    }
  }
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
h1 {
  text-align: center;
  color: #f5860a;
}
</style>
