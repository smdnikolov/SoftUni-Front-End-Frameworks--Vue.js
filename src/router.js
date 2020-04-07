import Vue from 'vue'
import Router from 'vue-router'
import appHot from './components/app-hot.vue'
import appTrending from './components/app-trending.vue'
import appFresh from './components/app-fresh.vue'
import appLogin from './components/app-login.vue'
import appRegister from './components/app-register.vue'
import appHome from './components/app-home.vue'
import appShare from './components/app-share.vue'
import appMeme from './components/app-meme.vue'
import appNotFound from './components/app-not-found.vue'
import appProfile from './components/app-profile.vue'
import appCategory from './components/app-category.vue'
import * as firebase from "firebase/app";
import "firebase/auth";



Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'appHome',
        component: appHome
    },
    {
        path: '/category/:id',
        name: 'appCategory',
        component: appCategory
    },
    {
        path: '/hot',
        name: 'appHot',
        component: appHot
    },
    {
        path: '/trending',
        name: 'appTrending',
        component: appTrending
    },
    {
        path: '/fresh',
        name: 'appFresh',
        component: appFresh
    },
    {
        path: '/login',
        name: 'appLogin',
        component: appLogin,
        meta: { requriesNotAuth: true }
    },
    {
        path: '/register',
        name: 'appRegister',
        component: appRegister,
        meta: { requriesNotAuth: true }
    },
    {
        path: '/share',
        name: 'appShare',
        component: appShare,
        meta: { requriesAuth: true }

    },
    {
        path: `/meme/:id`,
        name: 'appMeme',
        component: appMeme
    },
    {
        path: `/profile`,
        name: 'appProfile',
        component: appProfile,
        meta: { requriesAuth: true }
    },
    {
        path: "*",
        name: "appNotFound",
        component: appNotFound
    }
]


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    const requriesAuth = to.matched.some((record) => record.meta.requriesAuth);
    const requriesNotAuth = to.matched.some((record) => record.meta.requriesNotAuth)
    const isAuth = firebase.auth().currentUser;
    if (requriesAuth && !isAuth) {
        next('/login')
    } else {
        next()
    }
    if (requriesNotAuth && isAuth) {
        next('/')
    } else {
        next()
    }
})
export default router 
