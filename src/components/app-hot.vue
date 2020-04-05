<template>
  <div class="row">
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
      <div class="msg" v-if="!user">
        You should
        <router-link to="/login">Login&nbsp;</router-link>to comment or vote.
      </div>
      <div v-if="memes.length>0" class="col-sm-4 center">
        <div v-for="(meme,index) in memes" :key="meme.id" class="post">
          <router-link :to="meme.link">
            <img :src="meme.catSrc" width="25px" height="25px" />
            {{meme.category}}
          </router-link>
          <h2>{{meme.title}}</h2>
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
          <span v-if="user" class="button-container">
            <span v-if="!meme.voted.includes(userMail)">
              <button @click="upvote(meme.id,memes,index,$event)" class="upvote">⇧</button>
              <button @click="downvote(meme.id,memes,index,$event)" class="downvote">⇩</button>
              <button @click="goToComments(meme.id)">&#128172;</button>
            </span>
            <span v-else>
              <button @click="upvote(meme.id,memes,index,$event)" class="voted" disabled>⇧</button>
              <button @click="downvote(meme.id,memes,index,$event)" class="voted" disabled>⇩</button>
              <button @click="goToComments(meme.id)">&#128172;</button>
            </span>
          </span>

          <div class="line"></div>
        </div>
      </div>
      <div v-else class="col-sm-4 center" style="text-align:center">
        <p style="font-size:35px;color=gray">
          There are no hot memes yet, vote on
          <router-link to="/trending" style="font-size:35px">trending&nbsp;</router-link>or so they reach hot
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = !!user;
      if (this.user) {
        this.userMail = user.email;
      }
      axios
        .get("https://memes-587f6.firebaseio.com/memes/.json")
        .then(data => {
          data = Object.entries(Object.values(data)[0]);
          data.forEach(element => {
            if (element[1].upvotes > 21) {
              this.memes.push({
                id: element[0],
                category: element[1].category,
                imageURL: element[1].imageURL,
                title: element[1].title,
                upvotes: element[1].upvotes,
                catSrc: element[1].catSrc,
                link: element[1].catLink,
                voted: element[1].voted,
                comments: element[1].comments
              });
            }

            this.loading = false;
            this.memes = this.memes.sort((a, b) => {
              return b.upvotes - a.upvotes;
            });
          });
        })
        .catch(err => (this.error = err));
    });
  },

  props: {},
  data() {
    return {
      loading: true,
      memes: [],
      user: "",
      userMail: ""
    };
  },
  methods: {
    upvote(id, memes, index, e) {
      let upvotes;
      let voted = [];
      axios
        .get(`https://memes-587f6.firebaseio.com/memes/${id}.json`)
        .then(data => {
          upvotes = data.data.upvotes;
          if (data.data.voted !== undefined) {
            voted = [...data.data.voted];
            if (voted.indexOf(this.userMail) === -1) {
              voted.push(this.userMail);
            }
          } else {
            voted.push(this.userMail);
          }
          upvotes++;
          axios
            .patch(
              `https://memes-587f6.firebaseio.com/memes/${id}.json`,
              (id = {
                upvotes,
                voted
              })
            )
            .catch(err => console.log(err));
          memes[index].upvotes++;
          e.target.parentNode.children[0].disabled = true;
          e.target.parentNode.children[0].classList.add("voted");
          e.target.parentNode.children[1].disabled = true;
          e.target.parentNode.children[1].classList.add("voted");
        })
        .catch(err => console.log(err));
    },

    downvote(id, memes, index, e) {
      let upvotes;
      axios
        .get(`https://memes-587f6.firebaseio.com/memes/${id}.json`)
        .then(data => {
          upvotes = data.data.upvotes;
          upvotes--;
          axios
            .patch(
              `https://memes-587f6.firebaseio.com/memes/${id}.json`,
              (id = {
                upvotes
              })
            )
            .catch(err => console.log(err));
          memes[index].upvotes--;
          e.target.parentNode.children[0].disabled = true;
          e.target.parentNode.children[0].classList.add("voted");
          e.target.parentNode.children[1].disabled = true;
          e.target.parentNode.children[1].classList.add("voted");
        })
        .catch(err => console.log(err));
    },
    goToComments(id) {
      this.$router.push(`meme/${id}#comments`);
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
button {
  color: rgba(0, 0, 0, 0.25);
  width: 70px;
  height: 60px;
  margin-right: 10px;
  text-align: center;
}
.line {
  width: 730px;
  height: 47px;
  border-bottom: 2px solid #ddd;
  display: inline-block;
  margin-bottom: 35px;
}
h2 {
  float: none;
  text-align: left;
  word-wrap: break-word;
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
</style>
