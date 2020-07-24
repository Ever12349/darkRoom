<template>
  <div class="scroll-box">
    <cube-scroll ref="scroll" :options="scrollOptions">
      <friends-list-item :key="index" :friendData="item" v-for="(item,index) in friends_list"></friends-list-item>
    </cube-scroll>
  </div>
</template>

<script>
export default {
  name: "friends_list",
  components: {
    friendsListItem: () => import("@/components/phone/friends_list_item.vue")
  },
  data() {
    return {
      friends_list: [],
      scrollOptions: Object.freeze({
        /* lock x-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0,
        bounce: {
          bottom: true
        }
        // pullUpLoad: {
        //   threshold: 0,
        //   txt: { more: "加载中", noMore: "没有数据了" }
        // },

        // pullDownRefresh: {
        //   threshold: 60,
        //   stop: 40,
        //   txt: "更新成功"
        // }
      })
    };
  },
  created() {
    this.getFriendsList(localStorage.user_code);
  },
  methods: {
    getFriendsList(user_code) {
      this.$myapi.getFriendsList({ user_code }).then(res => {
        window.console.log("getFriendsList", res.data);
        const friends_list = res.data.data.friends_list;
        this.friends_list = this.friends_list.concat(friends_list);
        window.console.log(res.data.friends_list,'this.friends_listthis.friends_list')
        const user_info = res.data.user_info;
        this.$store.commit("addNewUserInfo", user_info);
      });
    }
  }
};
</script>

<style scoped>
.scroll-box {
  width: 100vw;
  height: 94vh;
}
</style>