<template>
  <div class="row">
    <div class="col-sm-4 center">
      <div class="form">
        <div v-if="error" class="error">{{error.message}}</div>
        <form @submit.prevent="shareMeme()">
          <div class="container">
            <h1 style="text-align:center;color:#f5860a;">Share A Meme</h1>
            <div>
              <label for="title">Meme Title</label>
              <input type="text" v-model="meme.title" placeholder="Title" name="title" />
            </div>
            <div>
              <label for="imageUrl">Meme URL</label>
              <input type="text" v-model="meme.imageURL" placeholder="URL" name="ImageUrl" />
            </div>
            <div>
              <label for="category">Select Category</label>
              <select id="category" name="category" v-model="meme.category">
                <option value="Animals">Animals</option>
                <option value="Anime">Anime</option>
                <option value="Awesome">Awesome</option>
                <option value="Coronavirus">Coronavirus</option>
                <option value="Funny">Funny</option>
                <option value="Gaming">Gaming</option>
                <option value="NSFW">NSFW</option>
                <option value="WTF">WTF</option>
              </select>
            </div>
            <button class="share" type="submit">Share</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import categories from "../categories";

export default {
  data() {
    return {
      categories: categories,
      user: "",
      userMail: "",
      error: "",
      loggedIn: false,
      meme: {
        title: "",
        imageURL: "",
        category: "",
        upvotes: 0,
        catSrc: "",
        catLink: "",
        voted: ["test"],
        comments: [["test", "test"]],
        creator: ""
      }
    };
  },
  methods: {
    shareMeme() {
      let currentCat = this.categories.filter(
        x => x.name === this.meme.category
      );
      this.meme.catSrc = currentCat[0].src;
      this.meme.catLink = currentCat[0].link;
      this.meme.creator = this.userMail;
      axios
        .post("https://memes-587f6.firebaseio.com/memes.json", this.meme)
        .then(data => {
          this.$router.push(`/meme/${data.data.name}`);
        })
        .catch(err => (this.error = err));
    }
  }
};
</script>

<style>
input:focus {
  color: #f5860a;
  outline-color: #f5860a;
}

.error {
  color: red;
}
.container {
  width: 100%;
  color: #f5860a;
}
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;

  border-radius: 4px;
  box-sizing: border-box;
}

form {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  text-align: center;
  border: 2px solid #f5860a;
}
.share {
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
.share:hover {
  opacity: 0.7;
}
.share:focus {
  text-decoration: none;
  border: 1px #f5860a;
  color: #f5860a;
  outline: none;
  opacity: 0.7;
}
::placeholder {
  color: #f5860a;
  opacity: 0.5;
}
select,
option-slected {
  background-attachment: fixed;
}
</style>