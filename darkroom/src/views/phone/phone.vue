<template>
  <div class="phoneApp">
    <keep-alive :max="10">
      <router-view v-if="!!$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <mt-button @click='doss'>aaaaaaaaaaa</mt-button> -->
    <application-friends
      @hidden="hiddenApplication"
      :currentUserCode="current_user_code"
      v-if="show_application_friends_flag"
    ></application-friends>

    <mt-tabbar v-show="show_tabbar_flag" v-model="selected">
      <mt-tab-item id="tab1">
        <div v-if="public_message_unread_num>0" class="public_message_unread_num_div">
          <unread-num :num="public_message_unread_num"></unread-num>
        </div>

        <img slot="icon" src="@/assets/底部导航/动态圈.gif" /> 大厅
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <div v-if="message_unread_num>0" slot="icon" class="num_layer_div">
          <unread-num :num="message_unread_num"></unread-num>
        </div>

        <img slot="icon" src="@/assets/底部导航/连麦吧.gif" /> 好友
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <img slot="icon" src="@/assets/底部导航/我的.gif" /> 我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
// import unreadNum from "@/components/phone/unread_num.vue";
const option_path = {
  tab1: "/phone_hall",
  tab2: "/friends",
  tab3: "/my"
};
const selected_path = {
  "/phone_hall": "tab1",
  "/friends": "tab2",
  "/my": "tab3"
};
// var merge = function(target) {
//   for (var i = 1, j = arguments.length; i < j; i++) {
//     var source = arguments[i];
//     for (var prop in source) {
//       if (source.hasOwnProperty(prop)) {
//         var value = source[prop];
//         if (value !== undefined) {
//           target[prop] = value;
//         }
//       }
//     }
//   }

//   return target;
// };
import { message_record_key } from "../../store/message/message_module.js";
export default {
  data() {
    return {
      selected: "tab1",
      show_application_friends_flag: false,
      current_user_code: null,
      show_tabbar_flag: false

      // option_path: Object.freeze({
      //   tab1: "/phone_hall",
      //   tab2: "/friends",
      //   tab3: "/my"
      // })
    };
  },
  created() {
    window.$phoneApp = this;
    this.show_tabbar_flag = !!selected_path[this.$route.path];
  },
  components: {
    applicationFriends: () =>
      import("@/components/phone/applicationFriends.vue"),
    unreadNum: () => import("@/components/phone/unread_num.vue")
  },
  computed: {
    fullPath() {
      return this.$route.fullPath;
    },
    message_unread_num() {
      let num = 0;
      this.$store.state.messageRecord.message_resord_list.forEach(user_code => {
        num += parseInt(
          this.$store.state.messageRecord[message_record_key(user_code)]
            .unread_num
        );
      });
      return num;
    },
    public_message_unread_num() {
      window.console.log(this.$store.state.public_message.public_message_num,'this.$store.statethis.$store.statethis.$store.state')
      let num = this.$store.state.public_message.public_message_num;

      return num;
    }
  },
  mounted() {
    const route = this.$route.path;
    window.console.log(route, "route", selected_path[route], this.selected);
    this.selected = selected_path[route];
  },
  watch: {
    fullPath(path) {
      window.console.log(path);
      this.selected = selected_path[path];
      // if (this.selected) {
      this.show_tabbar_flag = !!this.selected;
      // } else {
      //   this.show_tabbar_flag = false;
      // }
    },
    // $route(route) {
    //   // window.console.log(value)
    //   // this.selected = selected_path[route.path];
    //   // if (this.selected) {
    //   //   this.show_tabbar_flag = true;
    //   // } else {
    //   //   this.show_tabbar_flag = false;
    //   // }
    // },
    selected(selected) {
      window.console.log(option_path[selected]);
      const router_path = option_path[selected];
      if (router_path) {
        this.$router.replace({
          path: option_path[selected]
        });
      }
    }
    // $route(route) {
    //   // window.console.log(route.meta.keepAlive);
    // }
  },
  methods: {
    // doss(){
    //   this.$router.push({
    //     url:'/my'
    //   })
    // },
    showApplication(user_code) {
      // const user_info = this.$
      this.current_user_code = user_code;
      this.show_application_friends_flag = true;
    },
    hiddenApplication() {
      this.show_application_friends_flag = false;
      this.current_user_code = null;
    },
    showToast(message, time) {
      Toast({
        message: message,
        // position: "bottom",
        duration: time || 1500
      });
    },
    showPrompt(data, callback) {
      MessageBox(
        {
          title: data.title || "提示信息",
          message: data.message || "提示",
          showConfirmButton: true,
          showCancelButton: true,
          showInput: true,
          inputValue: null,
          inputPlaceholder: data.input_placeholder || "请输入",
          $type: "prompt"
        },
        () => {
          window.console.log(arguments, "[[[[[[[[[[[[[[[[");
        }
      ).then(({ value, action }) => {
        callback &&
          callback({
            value: value || data.input_placeholder || "请输入",
            action
          });
      });
    },
    showConfrim(data, callback) {
      MessageBox({
        title: data.title || "提示信息",
        message: data.message || "提示",
        showConfirmButton: true,
        showCancelButton: true,
        $type: "alert"
      }).then(res => {
        // window.console.log(222222, res);
        callback && callback(res);
      });
    }
  }
};
</script>

<style>
.phoneApp {
  width: 100vw;
  height: 100vh;
  position: relative;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}
.num_layer_div {
  width: 5.2vw;
  height: 5.2vw;
  position: absolute;
  top: 1vw;
  right: 40vw;
}
.public_message_unread_num_div {
  width: 5.2vw;
  height: 5.2vw;
  position: absolute;
  top: 1vw;
  left: 20vw;
}
/* #tab2 {
  position: relative;
} */
</style>
