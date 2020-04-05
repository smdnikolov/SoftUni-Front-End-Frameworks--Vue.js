import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import firebase from 'firebase/app'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;


const firebaseConfig = {
  apiKey: "AIzaSyDb-AH9RNKENgxVFymLm2wEV2xA857LAqw",
  authDomain: "memes-587f6.firebaseapp.com",
  databaseURL: "https://memes-587f6.firebaseio.com",
  projectId: "memes-587f6",
  storageBucket: "memes-587f6.appspot.com",
  messagingSenderId: "326487037070",
  appId: "1:326487037070:web:03ec35523c27c6273665df"
};
firebase.initializeApp(firebaseConfig);


let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app')
  }
});


