<template>
  <div class="bg">
    <mt-header :title="tittle_message"></mt-header>
    <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :options="options"
        @pulling-down="pullingDown"
        @pulling-up="pullingUp"
      >
        <message-item
          @response="response"
          :key="index"
          :messageData="item"
          v-for="(item,index) in message_list"
        ></message-item>
      </cube-scroll>
    </div>
    <mt-button size="small" @click="showInput" class="transmit_message" type="primary">发送信息</mt-button>
    <message-input-box
      :orderId="response_order_id"
      v-if="show_input_box_flag"
      @hidden="hiddenInput"
      @sendMessage="sendMessage"
    ></message-input-box>
  </div>
</template>

<script>
const xss = require("xss");
export default {
  data() {
    return {
      response_order_id: null, //回复别人是的id
      message_list: [],
      show_input_box_flag: false,
      tittle_message: `大厅(在线人数:100)`,
      options: Object.freeze({
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
      }),

      pageSize: 10,
      pageNo: 1
    };
  },
  components: {
    messageItem: () => import("@/components/phone/message_item.vue"),
    messageInputBox: () => import("@/components/phone/message_input_box.vue")
  },
  created() {
    this.getMessageList();
  },
  activated() {
    // this.$refs.scroll.forceUpdate({
    //   dirty: true
    // });
  },
  methods: {
    pullingDown() {
      window.console.log("pullingDown");
      this.pageNo = 1;
      this.getMessageList();
    },
    pullingUp() {
      this.pageNo++;
      this.getMessageList();
    },
    response(order_id) {
      this.response_order_id = order_id;
      this.show_input_box_flag = true;
    },
    getMessageList() {
      const user_code = localStorage.user_code,
        pageSize = this.pageSize,
        pageNo = this.pageNo;
      // window.console.log(pageNo, "pageNo");
      if (user_code) {
        this.$myapi
          .getPublicMessageList({
            user_code,
            pageSize,
            pageNo
          })
          .then(res => {
            // window.console.log(res.data, "getMessageList");
            if (res.data.code == 200) {
              this.$store.commit("addNewUserInfo", res.data.data.user_info);
              if (this.pageNo == 1) {
                this.message_list = [];
              }
              this.$nextTick(() => {
                this.message_list = this.message_list.concat(
                  res.data.data.message_list
                );
                this.$nextTick(() => {
                  if (res.data.data.message_list.length > 0) {
                    this.$refs.scroll.forceUpdate({
                      dirty: true
                    });
                  } else {
                    this.$refs.scroll.forceUpdate();
                  }
                });
              });
            } else {
              this.$refs.scroll.forceUpdate();
            }
          });
      } else {
        setTimeout(this.getMessageList, 200);
      }
    },
    showInput() {
      this.show_input_box_flag = true;
      // this.$router.push({
      //   path:'/chatting/6666666666666'
      // })
    },
    hiddenInput() {
      this.show_input_box_flag = false;
      this.response_order_id = null;
    },
    sendMessage(message) {
      this.$myapi
        .sendPublicMessage({
          user_code: localStorage.user_code,
          to_order_id: this.response_order_id,
          content: xss(message)
        })
        .then(res => {
          window.console.log(res.data);
          this.hiddenInput();
        });
    }
  }
};
</script>

<style>
</style>
<style scoped>
.scroll-list-wrap {
  width: 100vw;
  height: 85vh;
}
.bg {
  background-color: #f5f5f5;
}
.transmit_message {
  position: fixed;
  right: 4vw;
  bottom: 10vh;
  z-index: 99;
}
</style>

