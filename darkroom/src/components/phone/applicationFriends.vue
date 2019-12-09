<template>
  <div @click="hidden" class="application_bg">
    <div @click.stop class="app_item">
      <mt-button @click="showUserInfoDetail" size="large">查看详情</mt-button>
      <mt-button type="primary" size="large">好友申请</mt-button>
      <div class="placeholder_div"></div>
    </div>
    <user-info-detail
      @hidden="hiddenUserInfoDetail"
      :userCode="currentUserCode"
      v-if="show_user_info_detail_flag"
    ></user-info-detail>
  </div>
</template>

<script>
export default {
  props: {
    currentUserCode: {
      type: [String, Number]
    }
  },
  data() {
    return {
      show_user_info_detail_flag: false
    };
  },
  components: {
    userInfoDetail: () => import("@/components/phone/user_info_detail.vue")
  },
  mounted() {
    window.console.log(this.currentUserCode, "currentUserCodecurrentUserCode");
  },
  methods: {
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