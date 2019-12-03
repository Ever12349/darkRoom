<template>
  <div class="my_bg">
    <!-- {{ message }} -->
    <div class="my_header">
      <div class="my_header_item">
        {{ user_name }}
        <div class="item_layer login_in_item" v-show="is_login">（未登录）</div>
        <div class="item_layer" v-show="!is_login">（已登录）</div>
      </div>
    </div>
    <div class="my_body">
      <div class="my_body_item">
        <mt-button type="primary" v-show="!is_login">修改信息</mt-button>
        <mt-button type="primary" @click="showLoginDiv" v-if="is_login">用户登录</mt-button>
        <mt-button type="primary" @click="showSigninDiv" v-if="is_login">用户注册</mt-button>
        <mt-button type="danger" v-else>注销</mt-button>
      </div>
    </div>
    <!-- 登录 -->
    <!-- <div v-if="show_login_in_div_flag" @click="hiddenLoginDiv" class="login_in_div">
      <div @click.stop class="login_in_div_item">
        <mt-field label="用户ID" placeholder="输入用户ID" type="number" v-model="login_user_code"></mt-field>
      </div>  
    </div> -->
    <!-- 注册 -->
    
    <!-- <div v-if="show_sign_in_div_flag" @click="hiddenSigninDiv" class="show_sign_in_div">
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
        <mt-field label="验证码" :state="captcha_state" v-model="captcha">
          <verify @pushVeriftyCode="setVeriftyCode"></verify>
        </mt-field>
        <div class="placeholder"></div>
        <mt-button size="large" type="primary">注册</mt-button>
      </div>
    </div> -->

    <signin-item></signin-item>
  </div>
</template>

<script>
// const state_word = ["error", "success", "warning", null];
export default {
  name: "my",
  components: {
    // verify: () => import("@/components/verify.vue")
    signinItem:()=>import('@/components/phone/sign_in_item.vue')
  },
  data() {
    return {
      // captcha: null,
      // captcha_state: state_word[3],
      // password_state: state_word[3],
      // second_password_state: state_word[3],
      // sign_in_user_code_placeholder: localStorage.user_code,
      // sign_in_user_code: "",
      // sign_in_user_name: localStorage.user_name,
      // sign_in_user_name_state: null,
      // sign_in_password: "",
      // sign_in_second_password: "",
      // login_user_code: "",
      user_name: localStorage.user_name,
      is_login: !!localStorage.user_status,
      show_login_in_div_flag: false,
      show_sign_in_div_flag: false,
      // current_verifty_code: null
    };
  },
  watch: {
    // sign_in_password(password) {
    //   if (password) {
    //     this.password_state =
    //       state_word[Number(password.length >= 6 && password.length <= 32)];
    //   } else {
    //     this.password_state = state_word[0];
    //   }
    // },
    // sign_in_second_password(password) {
    //   if (password === this.sign_in_password) {
    //     this.second_password_state =
    //       state_word[Number(password.length >= 6 && password.length <= 32)];
    //   } else {
    //     this.second_password_state = state_word[0];
    //   }
    // },
    // captcha(code) {
    //   this.captcha_state =
    //     state_word[
    //       Number(code.toLowerCase() === this.current_verifty_code.toLowerCase())
    //     ];
    // },
    // sign_in_user_name(user_name) {
    //   window.console.log(user_name);
    //   if (user_name) {
    //     this.checkUserName(user_name).then(is_legal => {
    //       this.sign_in_user_name_state = state_word[Number(is_legal)];
    //     });
    //   } else {
    //     this.sign_in_user_name_state = state_word[0];
    //   }
    // }
  },
  methods: {
    // setVeriftyCode(verify_code) {
    //   this.current_verifty_code = verify_code;
    // },
    // checkUserName(user_name) {
    //   return new Promise(async (resolve, reject) => {
    //     this.$myapi.checkUserNameLegality(user_name).then(res => {
    //       window.console.log(res.data);
    //       if (res.data.code == 200) {
    //         resolve(res.data.is_legal);
    //       } else {
    //         reject(false);
    //       }
    //     });
    //   });
    // },
    showSigninDiv() {
      this.show_sign_in_div_flag = true;
    },
    hiddenSigninDiv() {
      this.show_sign_in_div_flag = false;
    },
    showLoginDiv() {
      this.show_login_in_div_flag = true;
    },
    hiddenLoginDiv() {
      this.show_login_in_div_flag = false;
    }
  }
};
</script>

<style scoped>
.my_bg {
  width: 100vw;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  background-image: url("../../assets/我的/my_background_2.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #f5f5f5;
}
.my_header {
  width: 100vw;
  height: 60vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.my_body {
  /* margin-top:50vw; */
  width: 100vw;
  min-height: 100vw;
  background-color: #f5f5f5;
  border-top-left-radius: 5vw;
  border-top-right-radius: 5vw;
  display: flex;
  flex-direction: column;
  padding-top: 5vw;
}
.my_header_item {
  width: 80%;
  height: 50%;
  /* background-color:#f0f; */
  border-radius: 2vw 2vw;
  border: 1px solid #fff;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 8vw;
}
.item_layer {
  font-size: 4vw;
}
.login_in_item {
  text-decoration: underline;
}
.my_body_item {
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
}

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

.verify_div {
  margin: 0 auto;
  /* width:90%; */
  height: 12vw;
}
.placeholder {
  flex: 1;
}
</style>



<style>
</style>
