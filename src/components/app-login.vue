<template>
  <div class="row">
    <div class="col-sm-4 center">
      <div v-if="error" class="error">{{error.message}}</div>
      <form @submit.prevent="logIn()">
        <div class="container">
          <h1>Login</h1>
          <div class="email">
            <input type="email" v-model="email" placeholder="email" />
          </div>
          <div class="password">
            <input type="password" v-model="password" placeholder="password" />
          </div>
          <button type="submit" class="login">Login</button>
        </div>
        <div style="color:#f5860a">
          Don't have an account ?
          <div div style="color:#f5860a;padding:10px">
            <router-link class="button" to="/register">Register</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>

<style>
.error {
  color: red;
}

.container {
  width: 100%;
  color: #f5860a;
}
::placeholder {
  color: #f5860a;
  opacity: 0.5;
}
input:focus {
  color: #f5860a;
  outline-color: #f5860a;
}
.login {
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
  margin: 10px;
}
.login:hover {
  opacity: 0.7;
}
.login:focus {
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
  text-decoration: none !important;
  opacity: 0.7;
  color: #f5860a;
}
</style>