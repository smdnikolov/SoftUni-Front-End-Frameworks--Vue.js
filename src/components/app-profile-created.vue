<template>
  <div>
    <button class="button" @click="goBack()">Profile</button>
    <div v-if="memes.length===0 && !loading">
      <h2>You have not created any memes yet</h2>
      <router-link class="button txt" :to="'/share'">Share one</router-link>
    </div>
    <div v-else>
      <h2>Created Memes</h2>
    </div>
    <div class="row row2">
      <div v-if="loading" class="col-sm-4 center">
        <h1 style="text-align:center">
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </h1>
        <h1 style="color:#f5860a;text-align:center">Loading...</h1>
      </div>
      <div v-else>
        <div v-if="memes.length>0" class="col-sm-4 center">
          <div v-for="meme in memes" :key="meme.id" class="post">
            <router-link :to="meme.link">
              <img :src="meme.catSrc" width="25px" height="25px" />
              {{meme.category}}
            </router-link>
            <h4>{{meme.title}}</h4>
            <router-link
              :to="'/meme/'+meme.id"
              class="card overflow-hidden postPlaceholder post-details"
            >
              <img class="card-image" :src="meme.imageURL" />
            </router-link>
            <div class="post-info">
              <span>
                <router-link :to="'/meme/'+meme.id">{{meme.upvotes}} points</router-link>
              </span> ·
              <span>
                <router-link :to="'/meme/'+meme.id+'#comments'">{{meme.comments.length-1}} comments</router-link>
              </span>
            </div>

            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
export default {
  beforeCreate() {
    axios
      .get("https://memes-587f6.firebaseio.com/memes/.json")
      .then(data => {
        if (data.data) {
          data = Object.entries(Object.values(data)[0]);
          data.forEach(element => {
            if (element[1].creator === firebase.auth().currentUser.email) {
              this.memes.push({
                id: element[0],
                category: element[1].category,
                imageURL: element[1].imageURL,
                title: element[1].title,
                upvotes: element[1].upvotes,
                catSrc: element[1].catSrc,
                link: `/category${element[1].catLink}`,
                voted: element[1].voted,
                comments: element[1].comments
              });
            }
            this.loading = false;
            this.memes = this.memes.sort((a, b) => {
              return b.upvotes - a.upvotes;
            });
          });
        } else {
          this.loading = false;
          this.memes = [];
        }
      })
      .catch(err => {
        this.$toastr.defaultPosition = "toast-top-center";
        this.$toastr.e(err.message);
      });
  },

  props: {},
  data() {
    return {
      loading: true,
      memes: []
    };
  },
  methods: {
    goBack() {
      this.$parent.$data.clickTrigger = false;
      this.$parent.$data.btnCrtClicked = false;
    }
  }
};
</script>

<style scoped>
.card-image {
  display: inline-block;
  width: 100%;
}
.post-info {
  padding-top: 10px;

  display: block;
}
.button-container {
  padding-top: 10px;

  display: block;
  font-size: 35px;
  font-weight: bold;
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
h2 {
  color: #f5860a;
}
a:hover {
  color: black;
}
a {
  text-decoration: none;
  font-size: 15px;
  color: gray;
}
a:hover {
  color: #f5860a;
}
.msg {
  text-align: center;
}
.voted {
  color: #f5860a;
  opacity: 0.5;
}
.lds-ripple {
  text-align: center;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #f5860a;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
.line {
  width: 730px;
  border-bottom: 2px solid #ddd;
  display: inline-block;
}
.row2 {
  margin-top: 15px;
  text-align: left;
}
.post {
  padding-top: 10px;
}
</style>