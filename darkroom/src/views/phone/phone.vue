<template>
  <div>
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
        <img slot="icon" src="@/assets/底部导航/动态圈.gif" /> 大厅
      </mt-tab-item>
      <mt-tab-item id="tab2">
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

export default {
  data() {
    return {
      selected: "tab1",
      show_application_friends_flag: false,
      current_user_code: null,
      show_tabbar_flag: true
      // option_path: Object.freeze({
      //   tab1: "/phone_hall",
      //   tab2: "/friends",
      //   tab3: "/my"
      // })
    };
  },
  created() {
    window.$phoneApp = this;
  },
  components: {
    applicationFriends: () =>
      import("@/components/phone/applicationFriends.vue")
  },
  mounted() {
    const route = this.$route.path;
    window.console.log(route, "route", selected_path[route], this.selected);
    this.selected = selected_path[route];
  },
  watch: {
    $route(route) {
      // window.console.log(value)
      this.selected = selected_path[route.path];
      if (this.selected) {
        this.show_tabbar_flag = true;
      } else {
        this.show_tabbar_flag = false;
      }
    },
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
      // const mess = MessageBox.prompt(
      //   data.message || "提示",
      //   data.title || "提示信息",
      //   {}
      // ).then(res => {
      //   window.console.log(arguments, res);
      //   callback && callback();
      // });
      // window.console.log(mess,'messmess')
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
        window.console.log(
          arguments,
          value,
          action,
          "sssssssss",
          value || data.input_placeholder || "请输入"
        );
        callback &&
          callback({
            value: value || data.input_placeholder || "请输入",
            action
          });
      });
    }
  }
};
</script>

<style>
</style>
