import Vue from 'vue'
import {
    Header,
    Tabbar, 
    TabItem,
    Button,
    Field
  } from 'mint-ui'
  import 'mint-ui/lib/style.css'

  const compoment_list = [
    Header,
    Tabbar, 
    TabItem,
    Button,
    Field
  ]
  
  compoment_list.forEach((item)=>{
    Vue.component(item.name,item)
  })