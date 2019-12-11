<template>
  <div @click="hidden" class="application_bg">
    <div @click.stop class="app_item">
      <mt-button @click="showUserInfoDetail" size="large">查看详情</mt-button>
      <mt-button @click="application" type="primary" size="large">好友申请</mt-button>
      <div class="placeholder_div"></div>
    </div>
    <user-info-detail
      @hidden="hiddenUserInfoDetail"
      :userCode="currentUserCode"
      v-if="show_user_info_detail_flag"
    ></user-info-detail>
    <signin-item
      @signinSucess="signinSucess"
      @hiddenSigninDiv="hiddenSigninDiv"
      v-if="show_sign_in_item_flag"
    ></signin-item>
  </div>
</template>

<script>
const mt_message_action_word = ["cancel", "confirm", "alert"];
const xss = require("xss");
export default {
  props: {
    currentUserCode: {
      type: [String, Number]
    }
  },
  data() {
    return {
      show_user_info_detail_flag: false,
      show_sign_in_item_flag: false
    };
  },
  components: {
    userInfoDetail: () => import("@/components/phone/user_info_detail.vue"),
    signinItem: () => import("@/components/phone/sign_in_item.vue")
  },
  mounted() {
    window.console.log(this.currentUserCode, "currentUserCodecurrentUserCode");
  },
  methods: {
    signinSucess() {
      this.hiddenSigninDiv();
    },
    showSigninItem() {
      this.show_sign_in_item_flag = true;
    },
    hiddenSigninDiv() {
      this.show_sign_in_item_flag = true;
    },
    application() {
      const user_status = !!parseInt(localStorage.user_status);
      if (user_status) {
        window.$phoneApp.showPrompt(
          {
            title: "好友申请",
            message: "我要对Ta说：",
            input_placeholder: "你好！"
          },
          data => {
            window.console.log(
              "5555555555",
              data,
              data.action === mt_message_action_word[1],
              data.action,
              mt_message_action_word[1]
            );
            if (data.action === mt_message_action_word[1]) {
              const user_code = localStorage.user_code,
                to_user_code = this.currentUserCode;

              window.console.log(user_code, to_user_code);
              this.$myapi
                .friendsApplication({
                  user_code,
                  to_user_code,
                  message: xss(data.value)
                })
                .then(res => {
                  window.console.log(res.data, "riendsApplication");
                });
            }
          }
        );
      } else {
        this.showSigninItem();
        // window.$phoneApp.showToast()
        // this.$router.push({
        // })
      }
    },
    showUserInfoDetail() {
      // window.$phoneApp.
      this.show_user_info_detail_flag = true;
    },
    hidden() {
      this.$emit("hidden");
    },
    hiddenUserInfoDetail() {
      this.show_user_info_detail_flag = false;
    }
  }
};
</script>

<style scoped>
.application_bg {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
}
.app_item {
  width: 95vw;
  height: 50vw;
  border-top-left-radius: 4vw;
  border-top-right-radius: 4vw;
  background-color: #fff;
  /* margin: 0 auto; */
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.placeholder_div {
  /* flex: 1; */
  height: 10vw;
}
</style>

<style>
</style>