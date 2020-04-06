<template>
  <div class="row">
    <div class="col-sm-4 center">
      <div class="form">
        <form @submit.prevent="shareMeme()">
          <div class="container">
            <h1 style="text-align:center;color:#f5860a;">Share A Meme</h1>
            <div>
              <label for="title">Meme Title</label>
              <input
                type="text"
                v-model.trim="$v.title.$model"
                :class="{'is-valid':!$v.title.$anyError && title !=='', 'is-invalid':$v.title.$anyError && title !== '' } "
                placeholder="Title"
                name="title"
              />
              <div class="invalid-feedback">
                <span
                  v-if="!$v.title.minLength"
                >The meme title must have at least {{$v.title.$params.minLength.min}} characters.</span>
              </div>
            </div>
            <div>
              <label for="imageUrl">Meme URL</label>
              <input
                type="text"
                v-model="url"
                placeholder="URL"
                name="url"
                v-model.trim="$v.url.$model"
                :class="{'is-valid':!$v.url.$anyError && url !=='','is-invalid':$v.url.$anyError && url !== ''}"
              />
              <div class="invalid-feedback">
                <span
                  v-if="!$v.url.url && this.url !==''"
                >The meme url should start with https:// and be in a valid image format.</span>
              </div>
            </div>
            <div>
              <label for="category">Select Category</label>
              <select id="category" name="category" v-model="meme.category">
                <option selected value="Animals">Animals</option>
                <option value="Anime">Anime</option>
                <option value="Awesome">Awesome</option>
                <option value="Coronavirus">Coronavirus</option>
                <option value="Funny">Funny</option>
                <option value="Gaming">Gaming</option>
                <option value="NSFW">NSFW</option>
                <option value="WTF">WTF</option>
              </select>
            </div>
            <button
              :disabled="$v.title.$error || $v.url.$error || (this.url === '' || this.title ==='')"
              class="share"
              type="submit"
            >Share</button>
            <div class="invalid">
              <span
                style="margin-top:10px"
                v-if="$v.title.$error || $v.url.$error || (this.url === '' || this.title ==='')"
              >Please fill the form correclty.</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
import categories from "../categories";
import { minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      categories: categories,
      title: "",
      url: "",
      meme: {
        title: "",
        imageURL: "",
        category: "Animals",
        upvotes: 0,
        catSrc: "",
        catLink: "",
        voted: ["test"],
        comments: [["test", "test"]],
        creator: ""
      }
    };
  },
  validations: {
    title: {
      minLength: minLength(6)
    },
    url: {
      url(url) {
        return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp)/.test(url);
      }
    }
  },
  methods: {
    shareMeme() {
      let currentCat = this.categories.filter(
        x => x.name === this.meme.category
      );
      this.meme.title = this.title;
      this.meme.imageURL = this.url;
      this.meme.catSrc = currentCat[0].src;
      this.meme.catLink = currentCat[0].link;
      this.meme.creator = firebase.auth().currentUser.email;

      axios
        .post("https://memes-587f6.firebaseio.com/memes.json", this.meme)
        .then(data => {
          this.$router.push(`/meme/${data.data.name}`);
          this.$toastr.defaultPosition = "toast-top-center";
          this.$toastr.s("Successfully shared a Meme!");
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

input:focus {
  color: #f5860a;
  outline-color: #f5860a;
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