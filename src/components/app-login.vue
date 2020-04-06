<template>
  <div class="row">
    <div class="col-sm-4 center">
      <form @submit.prevent="logIn()">
        <div class="container">
          <h1>Login</h1>
          <div class="email">
            <input
              type="email"
              v-model="email"
              placeholder="email"
              v-model.trim="$v.email.$model"
              :class="{'is-invalid':$v.email.$anyError && email !== '' , 'is-valid':!$v.email.$anyError && email !==''}"
            />
            <div class="invalid-feedback">
              <span v-if="!$v.email.email && this.email !==''">The email should be in valid format.</span>
            </div>
          </div>
          <div class="password">
            <input
              type="password"
              v-model="password"
              placeholder="password"
              v-model.trim="$v.password.$model"
              :class="{'is-invalid':$v.password.$anyError && password !=='' , 'is-valid':!$v.password.$anyError && password !==''}"
            />
            <div class="invalid-feedback">
              <span
                v-if="!$v.password.password && this.password !==''"
              >The password sholud have at least 6 characters, one number and one special character.</span>
            </div>
          </div>
          <button
            :disabled="$v.email.$error || $v.password.$error || (this.password === '' || this.email ==='')"
            type="submit"
            class="login"
          >Login</button>
        </div>
        <div style="color:#f5860a">
          Don't have an account ?
          <div div style="color:#f5860a;padding:10px">
            <router-link class="button" to="/register">Register</router-link>
            <div class="invalid">
              <span
                style="margin-top:10px"
                v-if="$v.password.$error || $v.email.$error || (this.password === '' || this.email ==='')"
              >Please fill the form correclty.</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import { email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  validations: {
    email: {
      email
    },
    password: {
      password(password) {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
          password
        );
      }
    }
  },
  methods: {
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/");
          this.$toastr.defaultPosition = "toast-top-center";
          this.$toastr.s("Successfully logged in!");
        })
        .catch(err => {
          this.$toastr.defaultPosition = "toast-top-center";
          this.$toastr.e(err.message);
        });
    }
  }
};
</script>

<style>
button[disabled],
html input[disabled] {
  cursor: not-allowed;
  opacity: 0.7;
}
.is-invalid {
  color: red !important;
  outline-color: red !important;
  border-color: red !important;
  background: radial-gradient(
    rgba(201, 22, 22, 0.1),
    rgba(245, 108, 108, 0.15)
  );
}
.is-valid {
  color: rgb(62, 143, 62) !important;
  outline-color: rgb(62, 143, 62) !important;
  border-color: rgb(62, 143, 62) !important;
  background: radial-gradient(
    rgba(22, 201, 30, 0.1),
    rgba(108, 245, 108, 0.15)
  );
}
.invalid-feedback {
  text-align: left;
  color: red;
}
.invalid {
  text-align: center;
  color: gray;
  margin-top: 20px;
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