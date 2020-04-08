# SoftUni-Front-End-Frameworks-Vue-Project
 A single page application for the respective course in Softuni, realized with Vue.js

## Project assignment
VueJS - Project Assignment

1.1 Public Part:

The public part of your projects should be visible without authentication. This public part could be the application start page, the user login and user registration forms, as well as the public data of the users, e.g. the blog posts in a blog system, the public offers in a bid system, the products in an e-commerce system, etc.

1.2 Private Part (User Area):

Registered users should have personal area in the web application accessible after successful login. This area could hold for example the user's profiles management functionality, the user's offers in a bid system, the user's posts in a blog system, the user's photos in a photo sharing system, the user's contacts in a social network, etc.

General Requirements

Your Web application should use the following technologies, frameworks and development techniques:
At least 3 different dynamic pages (pages like about, contacts, login, register do not count towards that figure).
Use VueJS for the client-side
Communicate to a remote service (via REST, sockets, GraphQL, or a similar client-server technique).
Implement well known authentication method – Kinvey/Firebase or with JSON Web Tokens (JWT's)
Use a source control system like GitHub, Bitbucket etc. Commit inside the repository for at least 3 days. Follow the best practices when committing to a repository (commit different features partially and create branches)

Other Requirements:

Apply error handling and data validation to avoid crashes when invalid data is entered
Brief documentation on the project and project architecture (as .md file)
Good usability (easy to use UI)

## Project description and functionalites

The application simmulates meme sites like 9gag. he visitor is able to browse the memes which are located in different categories or browse them in three sections hot, trending and fresh. If a user choses to log in then he has the options to vote on memes. This can happen only once per meme. Also he/she can comment in a meme's dedicated page, delete the comments created by him/her or delete them. Also a logged user can share memes. In the profile section a user is able to see the memes created by him/her and also every meme in which he/she has commented. The memes in every section are sorted in descending order based on the upvotes they have(points). For a meme to reach hot it should have at least 20 points, for trending at least 10, everything else is in fresh. In the categories section a user will see only the memes of the respective category again sorted in descending order based on points. When clicking the comment link or button the user will be redirected straight to the comment section of the meme. The forms in the site are validated so the user should not be able to send incorrect data. The profile and share routes are guarded so guests don't have access to them unless they login. For database and authentication I used firebase.

For any questions or suggestions contact me at smdnikolov@gmail.com

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).