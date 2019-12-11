import Vue from 'vue'
import {
    Header,
    Tabbar, 
    TabItem,
    Button,
    Field,
    Spinner,
    Search,
    MessageBox,
  } from 'mint-ui'
  import 'mint-ui/lib/style.css'

  const compoment_list = [
    Header,
    Tabbar, 
    TabItem,
    Button,
    Field,
    Spinner,
    Search,
    MessageBox
  ]
  
  compoment_list.forEach((item)=>{
    Vue.component(item.name,item)
  })