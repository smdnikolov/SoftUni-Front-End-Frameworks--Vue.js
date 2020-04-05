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
      <div class="col-sm-4 center">
        <div class="post">
          <router-link :to="this.meme.catLink">
            <img :src="this.meme.catSrc" width="25px" height="25px" />
            {{meme.category}}
          </router-link>
          <h2>{{this.meme.title}}</h2>
          <img class="card-image" :src="this.meme.imageURL" />
          <div class="post-info">
            <span>
              <p>{{this.meme.upvotes}} points · {{this.meme.comments.length-1}} comments</p>
            </span>
          </div>
          <span v-if="user" class="button-container">
            <span v-if="!this.meme.voted.includes(userMail)">
              <button @click="upvote($event)" class="upvote">⇧</button>
              <button @click="downvote($event)" class="downvote">⇩</button>
            </span>
            <span v-else>
              <button class="voted" disabled>⇧</button>
              <button class="voted" disabled>⇩</button>
            </span>
          </span>
          <span v-else>
            <p>
              <router-link to="/login">Login&nbsp;</router-link>to vote or comment
            </p>
          </span>

          <div class="line"></div>
          <div id="comments" style="text-align:center">
            <div v-if="user">
              <div style="color:#f5860a">
                User with email:
                <p style="font-weight:bold">{{userMail}}</p>
              </div>
              <form>
                <textarea
                  placeholder="Write a comment..."
                  style="resize:none"
                  v-model="comment"
                  name="comment"
                  id
                  cols="65"
                  rows="5"
                ></textarea>
                <button @click="postComment($event)" class="button">Post comment</button>
                <button @click="clearComment($event)" class="button">Clear</button>
              </form>
            </div>
            <div v-if="meme.comments.length>1">
              <div v-if="loadingComments" style="margin-bottom:200px">
                <h1 style="text-align:center">
                  <div class="lds-ripple">
                    <div></div>
                    <div></div>
                  </div>
                </h1>
                <h1 style="color:#f5860a;text-align:center">Loading...</h1>
              </div>
              <div v-else>
                <h1>Comments</h1>
                <div v-for="(comment,index) in meme.comments" :key="index">
                  <div v-if="comment[0]!=='test'" class="comment-container">
                    <p style="text-align:center;margin-top:20px">
                      Comment by
                      <b>{{comment[0]}}</b>:
                    </p>
                    <hr />
                    <p class="text">{{comment[1]}}</p>
                    <button
                      @click="deleteComment($event,index)"
                      v-if="comment[0]===userMail"
                      class="delBtn"
                    >Delete Comment</button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <h3>There are no comments yet for the meme</h3>
            </div>
          </div>
        </div>
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
    let memeId = this.$router.currentRoute.params.id;
    firebase.auth().onAuthStateChanged(user => {
      this.user = !!user;
      if (this.user) {
        this.userMail = user.email;
      }
      axios
        .get(`https://memes-587f6.firebaseio.com/memes/${memeId}.json`)
        .then(data => {
          if(data.data===null){
            this.$router.replace({ name: "appNotFound" });
          }
          data = data.data;
          this.meme = data;
          this.loading = false;
          this.loadingComments = false;
        })
        .catch(err => (this.error = err));
    });
  },

  props: {},
  data() {
    return {
      loading: true,
      meme: {},
      user: "",
      userMail: "",
      voters: [],
      loadingComments: true,
      comment: ""
    };
  },
  methods: {
    clearComment(event) {
      event.preventDefault();
      this.comment = "";
    },
    postComment(event) {
      event.preventDefault();
      if (this.comment !== "") {
        this.loadingComments = true;
        let id = this.$router.currentRoute.params.id;
        let comment = [];
        comment.push(this.userMail);
        comment.push(this.comment);
        let comments = [...this.meme.comments];
        comments.unshift(comment);
        axios
          .patch(
            `https://memes-587f6.firebaseio.com/memes/${id}.json`,
            (id = { comments })
          )
          .then(() => {
            this.loadingComments = false;
            this.meme.comments = comments;
          })
          .catch(err => console.log(err));
      } else {
        alert("You cannot post a blank comment. Please write something.");
      }
      this.comment = "";
    },
    deleteComment(event, index) {
      event.preventDefault();
      this.loadingComments = true;
      let id = this.$router.currentRoute.params.id;
      let comments = [...this.meme.comments];
      comments.splice(index, 1);
      axios
        .patch(
          `https://memes-587f6.firebaseio.com/memes/${id}.json`,
          (id = { comments })
        )
        .then(() => {
          this.loadingComments = false;
          this.meme.comments = comments;
        })
        .catch(err => console.log(err));
    },
    upvote(e) {
      let id = this.$router.currentRoute.params.id;
      let upvotes = this.meme.upvotes;
      let voted = [...this.meme.voted];
      voted.push(this.userMail);
      upvotes++;
      axios
        .patch(
          `https://memes-587f6.firebaseio.com/memes/${id}.json`,
          (id = { upvotes, voted })
        )
        .then(() => {
          this.meme.upvotes = upvotes;
          this.meme.voted = voted;
          e.target.parentNode.children[0].disabled = true;
          e.target.parentNode.children[0].classList.add("voted");
          e.target.parentNode.children[1].disabled = true;
          e.target.parentNode.children[1].classList.add("voted");
        })
        .catch(err => console.log(err));
    },
    downvote(e) {
      let id = this.$router.currentRoute.params.id;
      let upvotes = this.meme.upvotes;
      let voted = [...this.meme.voted];
      voted.push(this.userMail);
      upvotes--;
      axios
        .patch(
          `https://memes-587f6.firebaseio.com/memes/${id}.json`,
          (id = { upvotes, voted })
        )
        .then(() => {
          this.meme.upvotes = upvotes;
          this.meme.voted = voted;
          e.target.parentNode.children[0].disabled = true;
          e.target.parentNode.children[0].classList.add("voted");
          e.target.parentNode.children[1].disabled = true;
          e.target.parentNode.children[1].classList.add("voted");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.text {
  margin-left: 10px;
  text-align: left;
}
hr {
  border-top: 2px solid #f5860a !important;
}
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
.button {
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  width: 115px;
  background: black;
  height: 35px;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  color: #f5860a;
  font-weight: bold;
  border: none;
  margin-top: 15px;
}
.delBtn {
  width: 150px;
  background: black;
  height: 35px;
  border-radius: 5px;
  color: #f5860a;
  font-weight: bold;
  border: none;
  margin: 15px;
}
.delBtn:hover {
  opacity: 0.7;
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
textarea:focus {
  outline-color: #f5860a;
}
textarea {
  width: 100%;
  border: 1px solid #f5860a;
  color: #f5860a;
}
.comment-container {
  border: 2px #f5860a solid;
  border-radius: 5px;
  color: #f5860a;
  margin-bottom: 20px;
  background-color: #f2f2f2;
}
</style>
