<template>
  <div class="scroll-box">
    <cube-scroll
      ref="scroll"
      @pulling-down="pullingDown"
      @pulling-up="pullingUp"
      :options="scrollOptions"
    >
      <message-list-item
        :itemIndex="index"
        :messageListItem="item"
        v-for="(item,index) in message_record_list"
        :key="item.order_id"
        @cleanUnreadNum="cleanUnreadNum"
      ></message-list-item>
    </cube-scroll>
  </div>
</template>

<script>
// import { message_record_key } from "../../store/message/message_module.js";
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
  activated() {},
  mounted() {},
  computed: {
    message_record_list() {
      window.console.log(
        this.$store.state.messageRecord.message_resord_list,
        "this.$stroe.state.messageRecord.message_resord_list"
      );
      return this.$store.state.messageRecord.message_resord_list;
    }
  },
  // watch: {
  //   message_record: {
  //     deep: true,
  //     handler(value) {
  //       window.console.log(value, "message_record");
  //     }
  //   }
  // },
  methods: {
    cleanUnreadNum(data) {
      const vm = this;
      const order_id = data.order_id,
        index = data.index;

      let message_item = this.message_list[index],
        current_index = index;

      if (message_item.order_id === order_id) {
        // message_item.unread_num = 0;
        message_item = this.message_list.filter((item, index) => {
          let result = false;
          if (item.order_id === order_id) {
            current_index = index;
            return true;
          }
          return result;
        })[0];
      }
      message_item.unread_num = 0;
      this.$set(vm.message_list, current_index, message_item);
      window.console.log(
        "..............",
        this.message_list[current_index],
        current_index,
        message_item
      );
    },
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
              // this.message_list = this.message_list.concat(list);
              this.$store.commit("messageRecordInit", list);
              // window.$app.message_record = list;
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