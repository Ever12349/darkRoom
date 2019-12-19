<template>
  <div @click="hidden" class="login_in_item_bg">
    <div @click.stop class="login_item">
      <mt-field v-model="user_name" :state="user_name_state" placeholder="用户名/用户编号"></mt-field>
      <mt-field v-model="password" type="password" :state="password_state" placeholder="密码"></mt-field>
      <mt-field placeholder="验证码" :state="captcha_state" v-model="captcha">
        <verify @pushVeriftyCode="setVeriftyCode"></verify>
      </mt-field>
      <div class="placeholder"></div>
      <div class="login_div" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
const state_word = ["error", "success", "warning", null];
const xss = require("xss");
import { Encrypt } from "@/api/secret.js";
import { setAjaxToken } from "@/api";
export default {
  name: "login_in_item",
  components: {
    verify: () => import("@/components/verify.vue")
  },
  data() {
    return {
      user_name: "",
      password: "",
      verify_code: "",
      captcha: "",
      user_name_state: state_word[3],
      password_state: state_word[3],
      captcha_state: state_word[3]
    };
  },
  watch: {
    password(value) {
      this.password_state = state_word[Number(Boolean(value))];
    },
    captcha(value) {
      this.captcha_state =
        state_word[
          Number(value.toLowerCase() === this.verify_code.toLowerCase())
        ];
    }
  },
  methods: {
    setVeriftyCode(code) {
      this.verify_code = code;
    },
    hidden() {
      this.$emit("hidden");
    },
    login() {
      //数据验证
      window.console.log("login");
      if (!this.user_name) {
        //用户名不能为空
        window.$phoneApp.showToast("用户名不能为空");
        this.user_name_state = state_word[0];
        return;
      }

      if (!this.password) {
        //密码不能为空
        window.$phoneApp.showToast("密码不能为空");
        this.password_state = state_word[0];
        return;
      }

      if (!this.captcha) {
        //验证码不能为空
        window.$phoneApp.showToast("验证码不能为空");
        this.captcha_state = state_word[0];
        return;
      }

      if (
        // this.user_name_state == state_word[0] &&
        this.password_state == state_word[1] &&
        this.captcha_state == state_word[1]
      ) {
        const user_id = xss(this.user_name),
          password = Encrypt(this.password);

        this.$myapi
          .userLogin({
            user_id,
            password
            // socket_id:localStorage.socketId,
          })
          .then(res => {
            window.console.log(res.data, "uuuuuuuuuu");
            if (res.data.code == 200) {
              const reqData = res.data;

              const user_info = reqData.user_info;

              localStorage.user_name = user_info.user_name;
              localStorage.user_code = user_info.user_code;
              localStorage.user_status = user_info.user_status;
              window.console.log(reqData.token, "reqData.token");
              localStorage.token = reqData.token;
              setAjaxToken(reqData.token);
              this.$myapi.reConnectionSocket();
              this.$emit("success");
            }
          });
      } else {
        window.$phoneApp.showToast("请输入正确的数据");
      }
    }
  }
};
</script>

<style scoped>
.placeholder {
  flex: 1;
}
.login_in_item_bg {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}
.login_item {
  margin: 0 auto;
  margin-top: 50vw;
  width: 80%;
  height: 60vw;
  background-color: #fff;
  border-radius: 3vw;
  padding-top: 4vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.login_div {
  width: 100%;
  height: 10vw;
  background-color: #00ccff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 4.5vw;
}
</style>
