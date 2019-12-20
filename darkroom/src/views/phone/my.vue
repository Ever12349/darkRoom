<template>
  <div class="my_bg">
    <!-- {{ message }} -->
    <div class="my_header">
      <div class="my_header_item">
        {{ user_name }}
        <div class='item_layer'>ID: {{ user_code }}</div>
        <div class="item_layer login_in_item" v-show="!is_login">（未登录）</div>
        <div class="item_layer" v-show="is_login">（已登录）</div>
      </div>
    </div>
    <div class="my_body">
      <div class="my_body_item">
        <mt-button class="my_body_item_button" type="primary" v-show="is_login">修改信息</mt-button>
        <mt-button
          class="my_body_item_button"
          type="primary"
          @click="showLoginDiv"
          v-if="!is_login"
        >用户登录</mt-button>
        <mt-button
          class="my_body_item_button"
          type="primary"
          @click="showSigninDiv"
          v-if="!is_login"
        >用户注册</mt-button>
        <mt-button class="my_body_item_button" type="danger" v-else>注销</mt-button>
        <mt-button @click="testDemo">测试按钮</mt-button>
      </div>
    </div>
    <!-- 登录 -->
    <!-- <div v-if="show_login_in_div_flag" @click="hiddenLoginDiv" class="login_in_div">
      <div @click.stop class="login_in_div_item">
        <mt-field label="用户ID" placeholder="输入用户ID" type="number" v-model="login_user_code"></mt-field>
      </div>  
    </div>-->
    <login-in-item v-if="show_login_in_div_flag" @hidden="hiddenLoginDiv" @success="loginSuccess"></login-in-item>
    <signin-item
      v-if="show_sign_in_div_flag"
      @signinSucess="signinSucess"
      @hiddenSigninDiv="hiddenSigninDiv"
    ></signin-item>
  </div>
</template>

<script>
// const state_word = ["error", "success", "warning", null];
export default {
  name: "my",
  components: {
    // verify: () => import("@/components/verify.vue")
    signinItem: () => import("@/components/phone/sign_in_item.vue"),
    loginInItem: () => import("@/components/phone/login_in_item.vue")
  },
  data() {
    return {
      user_code: localStorage.user_code,
      user_name: localStorage.user_name,
      is_login: !!parseInt(localStorage.user_status),
      show_login_in_div_flag: false,
      show_sign_in_div_flag: false
    };
  },
  watch: {},
  methods: {
    testDemo() {
      //测试开发用
      window.console.log("test_demo");
      // this.$myapi.reConnectionSocket();
    },
    loginSuccess() {
      this.renderData();
      this.hiddenLoginDiv();
    },
    renderData() {
      this.user_name = localStorage.user_name;
      this.is_login = !!parseInt(localStorage.user_status);
    },
    showSigninDiv() {
      this.show_sign_in_div_flag = true;
    },
    hiddenSigninDiv() {
      this.show_sign_in_div_flag = false;
    },
    signinSucess() {
      //注册成功需要重新渲染数据
      window.console.log("注册成功！！！");
      this.renderData();
      // this.user_name = localStorage.user_name;
      // this.is_login = !!localStorage.user_status;
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
  justify-content: space-around;
  align-items: center;
  font-size: 8vw;
}
.my_body_item_button {
  margin-bottom: 3vw;
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
