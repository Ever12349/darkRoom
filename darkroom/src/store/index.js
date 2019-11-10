import Vue from 'vue'
import Vuex from 'vuex'

import {
  user_info_state,
  user_info_mutations,
} from './userInfo/user_info.js';
import {
  public_message_state
} from './publicMessage/public_message.js'

Vue.use(Vuex)
const store_obj = {
  state: {
    user_info:user_info_state,
    public_message:public_message_state,
  },
  mutations: {
    ...user_info_mutations
  },
  actions: {
  },
  modules: {
  }
}
window.console.log(store_obj,'store_objstore_obj')
export default new Vuex.Store(store_obj)
