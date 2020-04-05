<template>
  <div class="row">
    <div class="col-sm-4 center">
      <div v-if="error" class="error">{{error.message}}</div>
      <form @submit.prevent="register()">
        <div class="container">
          <h1>Register</h1>
          <div class="email">
            <input type="email" v-model="email" placeholder="email" />
          </div>
          <div class="password">
            <input type="password" v-model="password" placeholder="password" />
          </div>
          <button class="register" style="padding 10px" type="submit">Register</button>
        </div>
        <div style="color:#f5860a">
          Already have an account ?
          <div style="color:#f5860a;padding:10px">
            <router-link class="button" to="/login">Login</router-link>
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
      error: "",
      loggedIn: false
    };
  },
  methods: {
    async register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace({ name: "appHome" });
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
.error {
  color: red;
}
input:focus {
  color: #f5860a;
  outline-color: #f5860a;
}
::placeholder {
  color: #f5860a;
  opacity: 0.5;
}
.container {
  width: 100%;
  color: #f5860a;
}
.register {
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
.register:hover {
  opacity: 0.7;
}
.register:focus {
  text-decoration: none;
  border: 1px #f5860a;
  color: #f5860a;
  outline: none;
  opacity: 0.7;
}

.button:focus {
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
.button:hover {
  text-decoration: none !important;
  opacity: 0.7;
  color: #f5860a;
}
</style>