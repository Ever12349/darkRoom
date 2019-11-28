<template>
  <div>
    <keep-alive :max="10">
      <router-view v-if="!!$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <mt-tabbar v-model="selected">
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
export default {
  data() {
    return {
      selected: "tab1"
      // option_path: Object.freeze({
      //   tab1: "/phone_hall",
      //   tab2: "/friends",
      //   tab3: "/my"
      // })
    };
  },
  mounted() {
    const route = this.$route.path;
    window.console.log(route,'route',selected_path[route],this.selected)
    this.selected = selected_path[route];
  },
  watch: {
    selected(selected) {
      this.$router.push({
        path: option_path[selected]
      });
    }
    // $route(route) {
    //   // window.console.log(route.meta.keepAlive);
    // }
  }
};
</script>

<style>
</style>
