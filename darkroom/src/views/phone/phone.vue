<template>
    <div>
        <router-view></router-view>
        <mt-tabbar v-model="selected">
            <mt-tab-item id="tab1">
                <img slot="icon" src="@/assets/底部导航/动态圈.gif"> 大厅
            </mt-tab-item>
            <mt-tab-item id="tab2">
                <img slot="icon" src="@/assets/底部导航/连麦吧.gif"> 好友
            </mt-tab-item>
            <mt-tab-item id="tab3">
                <img slot="icon" src="@/assets/底部导航/我的.gif"> 我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "tab1",
      option_path: Object.freeze({
        tab1: "/phone_hall",
        tab2: "/friends",
        tab3: "/my"
      })
    };
  },
  watch: {
    selected(selected) {
      this.$router.push({
        path: this.option_path[selected]
      });
    }
  }
};
</script>

<style>
</style>
