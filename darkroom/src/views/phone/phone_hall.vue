<template>
  <div class='bg'>
    <mt-header :title='tittle_message'></mt-header>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll" :options="options">
        <message-item :key='index' v-for='(item,index) in message_list'></message-item>
      </cube-scroll>
    </div>
    <mt-button size="small" @click='showInput' class='transmit_message' type="primary">发送信息</mt-button>
    <message-input-box :orderId='response_order_id' v-if='show_input_box_flag' @hidden='hiddenInput' @sendMessage='sendMessage'></message-input-box>
  </div>
</template>

<script>
const xss = require("xss");
export default {
  data() {
    return {
      response_order_id: null, //回复别人是的id
      message_list: [1, 1, 1, 1, 1],
      show_input_box_flag: false,
      tittle_message: "大厅(在线人数:1)",
      options: Object.freeze({}),

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
  methods: {
    getMessageList() {
      const user_code = localStorage.user_code,
        pageSize = this.pageSize,
        pageNo = this.pageNo;
      if (user_code) {
        this.$myapi
          .getPublicMessageList({
            user_code,
            pageSize,
            pageNo
          })
          .then(res => {
            window.console.log(res.data, "getMessageList");
          });
      }else{
        setTimeout(this.getMessageList,200)
      }
    },
    showInput() {
      this.show_input_box_flag = true;
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
          // this.hiddenInput();
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

