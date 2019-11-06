import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import pcHall from '../views/pc/pc_hall.vue'
// import phoneHall from '../views/phone/phone_hall.vue'
import {isPc} from '../util'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('../views/default.vue'),
    beforeEnter:(to,from,next)=>{
      if(isPc()){
        next('/pc_home')
      }else{
        next('/phone_hall')
      }
    }
  },
  {
    path:'/phone',
    name:'phone_hall',
    component:()=>import('../views/phone/phone.vue'),
    children:[{
      path:'/phone_hall',
      name:'phone_hall',
      component:()=>import('../views/phone/phone_hall.vue')
    },{
      path:'/friends',
      name:'friends',
      component:()=>import('../views/phone/friends.vue')
    },{
      path:'/my',
      name:'my',
      component:()=>import('../views/phone/my.vue')
    }],
  },
  {
    path:'/pc',
    name:'pc_home',
    component:()=>import('../views/pc/pc.vue'),
    children:[{
      path:'/pc_home',
      name:'pc_hall',
      component:()=>import('../views/pc/pc_home.vue')
    }],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
