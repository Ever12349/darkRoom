<template>
  <div @click="hiddenSigninDiv" class="show_sign_in_div">
    <div @click.stop class="sign_in_div_item">
      <mt-field
        readonly
        label="用户ID"
        :placeholder="sign_in_user_code_placeholder"
        type="number"
        v-model="sign_in_user_code"
      ></mt-field>
      <mt-field
        label="用户名"
        placeholder="请输入用户名"
        :state="sign_in_user_name_state"
        v-model="sign_in_user_name"
      ></mt-field>
      <mt-field
        label="密码"
        placeholder="请输入密码"
        type="password"
        :state="password_state"
        v-model="sign_in_password"
      ></mt-field>
      <mt-field
        label="密码确认"
        placeholder="请再次输入密码"
        type="password"
        :state="second_password_state"
        v-model="sign_in_second_password"
      ></mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" :state="captcha_state" v-model="captcha">
        <verify @pushVeriftyCode="setVeriftyCode"></verify>
      </mt-field>
      <div class="placeholder"></div>
      <mt-button size="large" @click="register" type="primary">注册</mt-button>
    </div>
  </div>
</template>

<script>
const state_word = ["error", "success", "warning", null];
const xss = require("xss");
import { Encrypt } from "@/api/secret.js";
import { setAjaxToken } from "@/api";
export default {
  name: "sign_in_item",
  components: {
    verify: () => import("@/components/verify.vue")
  },
  data() {
    return {
      captcha: null,
      captcha_state: state_word[3],
      password_state: state_word[3],
      second_password_state: state_word[3],
      sign_in_user_code_placeholder: localStorage.user_code,
      sign_in_user_code: "",
      sign_in_user_name: localStorage.user_name,
      sign_in_user_name_state: null,
      sign_in_password: "",
      sign_in_second_password: "",
      show_sign_in_div_flag: false,
      current_verifty_code: null
    };
  },
  watch: {
    sign_in_password(password) {
      if (password) {
        this.password_state =
          state_word[Number(password.length >= 6 && password.length <= 32)];

        this.second_password_state &&
          (this.second_password_state =
            state_word[Number(password === this.sign_in_second_password)]);
      } else {
        this.password_state = state_word[0];
      }
    },
    sign_in_second_password(password) {
      if (password === this.sign_in_password) {
        this.second_password_state =
          state_word[Number(password.length >= 6 && password.length <= 32)];
      } else {
        this.second_password_state = state_word[0];
      }
    },
    captcha(code) {
      this.captcha_state =
        state_word[
          Number(code.toLowerCase() === this.current_verifty_code.toLowerCase())
        ];
    },
    sign_in_user_name(user_name) {
      window.console.log(user_name);
      if (user_name) {
        this.checkUserName(user_name, localStorage.user_code).then(is_legal => {
          this.sign_in_user_name_state = state_word[Number(is_legal)];
        });
      } else {
        this.sign_in_user_name_state = state_word[0];
      }
    }
  },
  methods: {
    register() {
      //表单验证
      // window.$phoneApp.showToast('非法')
      if (this.sign_in_user_name) {
        //检查用户名
        if (this.sign_in_user_name_state === state_word[0]) {
          window.$phoneApp.showToast("用户名已经被别人注册了哦！！！");
          return;
        }
      } else {
        window.$phoneApp.showToast("用户名不能为空");
        return;
      }
      if (this.sign_in_password) {
        //检查密码
        if (this.password_state !== state_word[1]) {
          // window.$phoneApp.showToast('密码长度')
          const p_length = this.sign_in_password.length;
          if (p_length < 6) {
            window.$phoneApp.showToast("密码长度不能小于6！！");
          } else if (p_length > 32) {
            window.$phoneApp.showToast("密码长度不能大于32！！");
          }
          return;
        }
      } else {
        window.$phoneApp.showToast("密码不能为空");
        return;
      }

      if (this.sign_in_second_password !== this.sign_in_password) {
        window.$phoneApp.showToast("两次密码不一致！！！");
        return;
      }

      if (this.captcha) {
        if (this.captcha_state !== state_word[1]) {
          window.$phoneApp.showToast("验证码错误！！！");
          return;
        }
      } else {
        window.$phoneApp.showToast("请输入验证码");
        return;
      }

      this.$myapi
        .userRegister({
          user_code: xss(this.sign_in_user_code_placeholder),
          user_name: xss(this.sign_in_user_name),
          password: Encrypt(this.sign_in_password),
          second_password: Encrypt(this.sign_in_password)
        })
        .then(res => {
          window.console.log(res.data);
          if (res.data.code === 200) {
            window.$phoneApp.showToast("注册成功！！！");
            const new_user_info = res.data.user_info,
              token = res.data.token;
            localStorage.token = token;
            setAjaxToken(token);

            localStorage.user_name = new_user_info.user_name;
            localStorage.user_code = new_user_info.user_code;
            localStorage.user_status = new_user_info.user_status;

            this.sign_in_success();
            this.hiddenSigninDiv();
          }
        });
    },
    setVeriftyCode(verify_code) {
      this.current_verifty_code = verify_code;
    },
    checkUserName(user_name, user_code) {
      return new Promise(async (resolve, reject) => {
        this.$myapi.checkUserNameLegality(user_name, user_code).then(res => {
          window.console.log(res.data);
          if (res.data.code == 200) {
            resolve(res.data.is_legal);
          } else {
            reject(false);
          }
        });
      });
    },
    hiddenSigninDiv(event, data) {
      window.console.log(event);
      this.$emit("hiddenSigninDiv", data || null);
    },
    sign_in_success() {
      this.$emit("signinSucess");
    }
  }
};
</script>

<style>
.login_in_div,
.show_sign_in_div {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
}
.login_in_div_item,
.sign_in_div_item {
  margin: 0 auto;
  width: 90vw;
  height: 90vw;
  margin-top: 20vw;
  background-color: #fff;
  border-radius: 2vw;
  padding-top: 5vw;
  display: flex;
  flex-direction: column;
}
.placeholder {
  flex: 1;
}
</style>