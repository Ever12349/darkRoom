<template>
  <div class="scroll-box">
    <cube-scroll ref="scroll" :options="scrollOptions">
      <friends-list-item></friends-list-item>
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
      scrollOptions: {
        /* lock x-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0,
        bounce: {
          bottom: true
        },
        pullUpLoad: {
          threshold: 0,
          txt: { more: "加载中", noMore: "没有数据了" }
        },

        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: "更新成功"
        }
      }
    };
  }
};
</script>

<style scoped>
.scroll-box {
  width: 100vw;
  height: 94vh;
}
</style>