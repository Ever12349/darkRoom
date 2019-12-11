<template>
  <div class="scroll-box">
    <cube-scroll
      ref="scroll"
      @pulling-down="pullingDown"
      @pulling-up="pullingUp"
      :options="scrollOptions"
    >
      <message-list-item :messageListItem="item" v-for="(item,index) in message_list" :key="index"></message-list-item>
    </cube-scroll>
  </div>
</template>

<script>
export default {
  name: "message_list",
  components: {
    messageListItem: () => import("@/components/phone/message_list_item.vue")
  },
  data() {
    return {
      pageSize: 30,
      pageNo: 1,
      message_list: [],
      scrollOptions: Object.freeze({
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
      })
    };
  },
  created() {
    this.getMessageRecordList();
  },
  mounted() {},
  methods: {
    pullingUp() {
      this.pageNo = this.pageNo + 1;
      //   this.pageSize = 30;
      this.getMessageRecordList(this.pageNo, this.pageSize);
    },
    pullingDown() {
      this.pageNo = 1;
      //   this.pageSize = 30;
      this.getMessageRecordList(this.pageNo, this.pageSize);
    },
    getMessageRecordList(pageNo = this.pageNo, pageSize = this.pageSize) {
      this.$myapi
        .getMessageRecordList({
          user_code: localStorage.user_code,
          pageNo,
          pageSize
        })
        .then(res => {
          window.console.log(res.data, "getMessageRecordList");
          if (res.data.code == 200) {
            pageNo == 1 && (this.message_list = []);
            const list = res.data.list;
            const user_info = res.data.user_info;
            // this.$nextTick(() => {
            // })
            this.$nextTick(() => {
              this.message_list = this.message_list.concat(list);
              this.$store.commit("addNewUserInfo", user_info);
              this.$nextTick(() => {
                if (list.length > 0) {
                  this.$refs.scroll.forceUpdate({
                    dirty: true
                  });
                } else {
                  this.$refs.scroll.forceUpdate();
                }
              });
            });
            // });
          }
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