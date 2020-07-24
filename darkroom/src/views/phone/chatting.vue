<template>
  <div>
    <mt-header :title="user_name">
      <div slot="left">
        <mt-button v-tap="{methods:jumpToBack}" icon="back">返回</mt-button>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="chatting_body">
      <div class="chatting_area">
        <cube-scroll
          id="chatting_scroll"
          ref="scroll"
          :scroll-events="['scroll','scroll-end','before-scroll-start']"
          :options="options"
          @pulling-down="onPullingDown"
        >
          <!-- @scroll="onScrollHandle"
          @scroll-end="onscrollEnd"
          @before-scroll-start="onBeforeScrollStart"-->

          <div class="more_message_layer" v-if="show_more_message_layer_flag">下拉查看更多信息</div>
          <chatting-item
            :style="{opacity:`${div_opacity}`}"
            :key="item.order_id"
            :preCreateTime="message_list[parseInt(index)>0 ?parseInt(index)-1:0].create_time"
            :message="item"
            v-for="(item,index) in message_list"
          ></chatting-item>
        </cube-scroll>
      </div>
      <div v-if="!show_input_box" class="chatting_footer">
        <div @click.stop="showMessageInputBox" class="input_box">
          <!-- <div class="input_box_left"></div> -->
          <div class="input_box_middle">{{ message_content }}</div>
          <!-- <div class="input_box_right"></div> -->
        </div>
        <div class="input_submit" @click.stop="sendMessage">发送</div>
      </div>
    </div>
    <chatting-input-box
      v-model="message"
      @messageSend="sendMessage"
      @hidden="hiddenInputBox"
      v-if="show_input_box"
    ></chatting-input-box>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn");
import xss from "xss";
import { getMessageListKey } from "../../util/index.js";

import { addNewMessage } from "../../api/index.js";

const MESSAGE_PLACEHOLDER = "请输入！";

const MAX_MESSAGE_LIST_LENGTH = 30; //聊天界面最大信息的条数

let frist_in = true;

let scroll_direction,
  scorll_num = 0,
  max_message_list_length = 0;

export default {
  name: "chatting",
  props: {
    userCode: {
      type: [String, Number]
    }
  },
  data() {
    return {
      show_input_box: false,
      user_name: null,
      message: "",
      show_more_message_layer_flag: false,
      message_data: window.$app.message_list,
      message_list: [],
      div_opacity: 0,
      options: Object.freeze({
        bounce: {
          bottom: true
        },
        // pullUpLoad: {
        //   threshold: 0,
        //   txt: { more: "加载中", noMore: "没有数据了" }
        // },

        pullDownRefresh: {
          threshold: 90,
          stop: 60,
          txt: "更新成功"
        }
      })
    };
  },
  components: {
    chattingItem: () => import("@/components/phone/chatting_item.vue"),
    chattingInputBox: () => import("@/components/phone/chatting_input_box.vue")
  },
  created() {
    this.cleanMessageUnreadNum();
  },
  beforeDestroy() {
    this.cleanMessageUnreadNum();
  },
  mounted() {
    this.init(this.userCode);
  },
  computed: {
    // message_list_length() {
    //   const len = this.$store.state.message_state[this.userCode].length;
    //   window.console.log(len, "message_list_length");
    //   return len;
    // },
    // message_list() {
    //   const key = `message_list!${this.userCode}`;
    //   return this.$store.state[key];
    // },
    message_content() {
      return this.message || MESSAGE_PLACEHOLDER;
    }
  },

  watch: {
    message_data: {
      deep: true,
      handler: function(value) {
        window.console.log(value[this.userCode]);
        if (!frist_in) {
          let m_len = value[this.userCode].length;
          max_message_list_length = parseInt(m_len);
          let index_start =
            m_len > MAX_MESSAGE_LIST_LENGTH
              ? m_len - MAX_MESSAGE_LIST_LENGTH
              : 0;
          this.message_list = value[this.userCode].slice(index_start);
          this.scrollToBottom();
        }
      }
    }
  },
  // mixins:[jumpToback],
  methods: {
    init(user_code) {
      window.console.log(user_code, "----------------");
      // const message_key = getMessageListKey(user_code)
      this.getMessageList(user_code).then(list => {
        window.console.log("chatting_list_init", list);
        let m_len = list && list.length;
        max_message_list_length = parseInt(m_len);

        let index_start =
          m_len > MAX_MESSAGE_LIST_LENGTH ? m_len - MAX_MESSAGE_LIST_LENGTH : 0;

        this.message_list = list && list.slice(index_start);
        // this.forceUpdate("scroll");
        this.$nextTick(() => {
          // this.$refs.scroll.refresh();
          this.scrollToBottom();
          this.forceUpdate("scroll");
          frist_in = false;
        });
      });
      this.$myapi.getUserInfoByUserCode(user_code).then(user_info => {
        // window.console.log(user_info, "get______________get");
        this.user_name = user_info.user_name;
      });
      // this.scrollToBottom();

      // this.$myapi
      //   .getMessageListToSomeOne({
      //     user_code: localStorage.user_code,
      //     to_user_code: user_code
      //   })
      //   .then(res => {
      //     window.console.log(res);
      //   });
    },
    cleanMessageUnreadNum() {
      this.$myapi
        .cleanMessageUnreadNum({
          user_code: localStorage.user_code,
          to_user_code: this.userCode
        })
        .then();
      this.$store.commit("messageRecordUnreadNumClean", this.userCode);
    },
    onPullingDown() {
      const all_list = window.$app.message_list[this.userCode];

      const current_list_length = this.message_list.length;
      const end_index = all_list.length - current_list_length;

      const start_index =
        end_index - MAX_MESSAGE_LIST_LENGTH > 0
          ? end_index - MAX_MESSAGE_LIST_LENGTH
          : 0;
      const add_list = all_list.slice(start_index, end_index);

      // this.message_list = [...add_list, ...this.message_list];
      setTimeout(() => {
        this.message_list.splice(0, 0, ...add_list);
        this.$nextTick(() => {
          this.show_more_message_layer_flag = false;
          scorll_num = 0;
          this.forceUpdate("scroll");
        });
      }, 500);
    },
    onScrollHandle(result) {
      window.console.log("onScrollHandle", result, arguments[1]);
      scroll_direction = result.y > 0 ? "up" : "down";
    },
    onBeforeScrollStart() {
      window.console.log("onBeforeScrollStart", arguments[0]);
      // if (this.show_more_message_layer_flag) {
      //   //添加新的数据

      //   const all_list = window.$app.message_list[this.userCode];

      //   const current_list_length = this.message_list.length;
      //   const end_index = all_list.length - current_list_length;

      //   const start_index =
      //     end_index - MAX_MESSAGE_LIST_LENGTH > 0
      //       ? end_index - MAX_MESSAGE_LIST_LENGTH
      //       : 0;
      //   const add_list = all_list.slice(start_index, end_index);

      //   // this.message_list = [...add_list, ...this.message_list];
      //   this.message_list.splice(0, 0, ...add_list);
      //   this.$nextTick(() => {
      //     this.show_more_message_layer_flag = false;
      //     this.forceUpdate("scroll");
      //   });
      // }
    },
    onscrollEnd(result) {
      window.console.log("onscrollEnd", result);
      if (result.y >= 0 && max_message_list_length > this.message_list.length) {
        //此处表示以到达顶部，并且是第一次滑动
        this.show_more_message_layer_flag = true;
        scorll_num++; //该flag表示第一次滑动
      } else {
        this.show_more_message_layer_flag = false;
        return;
      }

      if (
        scorll_num > 1 &&
        this.show_more_message_layer_flag &&
        scroll_direction == "up"
      ) {
        // if (this.show_more_message_layer_flag) {
        //添加新的数据

        const all_list = window.$app.message_list[this.userCode];

        const current_list_length = this.message_list.length;
        const end_index = all_list.length - current_list_length;

        const start_index =
          end_index - MAX_MESSAGE_LIST_LENGTH > 0
            ? end_index - MAX_MESSAGE_LIST_LENGTH
            : 0;
        const add_list = all_list.slice(start_index, end_index);

        // this.message_list = [...add_list, ...this.message_list];
        this.message_list.splice(0, 0, ...add_list);
        this.$nextTick(() => {
          this.show_more_message_layer_flag = false;
          scorll_num = 0;
          this.forceUpdate("scroll");
        });
        // }
      }
    },
    getMessageList(user_code) {
      return new Promise(async resolve => {
        const message_key = getMessageListKey(user_code);
        let message_list;
        try {
          message_list = this.$store.state[message_key];
          if (message_list) {
            resolve(message_list);
          } else {
            throw new Error("555");
          }
        } catch (e) {
          window.console.log(e);
          let temp_list = localStorage[`message!${user_code}!message`];
          if (temp_list) {
            message_list = JSON.parse(
              localStorage[`message!${user_code}!message`]
            );
            resolve(message_list);
          } else {
            this.$myapi
              .getMessageListToSomeOne({
                user_code: localStorage.user_code,
                to_user_code: user_code
              })
              .then(res => {
                window.console.log(res.data.list, "getMessageList");
                if (res.data.code == 200) {
                  resolve(res.data.list);
                  localStorage[`message!${user_code}!message`] = JSON.stringify(
                    res.data.list
                  );
                }
              });
          }
        }
      });
    },
    sendMessage() {
      let message = this.message;
      window.console.log(message, "ssssssssss");
      if (message) {
        let message_item = {
          user_code: localStorage.user_code,
          to_user_code: this.userCode,
          message_type_flag: 1,
          message: xss(message)
        };
        this.message = MESSAGE_PLACEHOLDER;
        this.message_list.push(message_item);
        this.$nextTick(() => {
          this.scrollToBottom();
          // this.forceUpdate("scroll");
          this.hiddenInputBox();
          let message_list_index = this.message_list.length - 1;
          this.$myapi.sendMessage(message_item).then(res => {
            window.console.log("sendMessage", res.data);
            if (res.data.code == 200) {
              window.console.log(message_list_index);
              this.$set(this.message_list, message_list_index, res.data.data);
              addNewMessage({
                user_code: this.userCode,
                message_list: [res.data.data]
              });
              let temp = localStorage[`message!${this.userCode}!message`];
              localStorage[`message!${this.userCode}!message`] = JSON.stringify(
                [...JSON.parse(temp), res.data.data]
              );
            } else {
              this.$phoneApp.showToast("消息发送失败！");
            }
          });
        });
      } else {
        window.$phoneApp.showToast("不能为空！");
      }
    },
    showMessageInputBox() {
      this.show_input_box = true;
    },
    hiddenInputBox() {
      this.show_input_box = false;
    },
    scrollToBottom() {
      const scrollDom = this.$refs.scroll;
      const dom = document.getElementById("chatting_scroll");
      const chid_dom = dom.childNodes[0];
      setTimeout(() => {
        // const parent_height = parseInt(window.getComputedStyle(dom).height);
        this.$nextTick(() => {
          this.div_opacity = 1;
          const parent_height = parseInt(window.getComputedStyle(dom).height);
          const child_height = parseInt(
            window.getComputedStyle(chid_dom).height
          );
          window.console.log(
            child_height,
            parent_height,
            "++++++++++++++++++++++llllllllllll"
          );
          if (child_height > 0) {
            if (child_height > parent_height) {
              scrollDom.scrollTo(0, parent_height - child_height, 0, 0);
              this.$nextTick(() => {
                this.forceUpdate("scroll");
              });
            }
          } else if (this.message_list.length > 0) {
            setTimeout(this.scrollToBottom, 100);
          }
        });
      }, 100);
    }
    // renderMessage() {
    //   const message_list = this.$store.state.message_state[this.userCode];
    // }
  }
};
</script>

<style scoped>
.chatting_body {
  width: 100vw;
  height: 92vh;
  background-color: #f5f5f5;
  /* position: absolute;
  bottom: 0;
  left: 0; */
}
.chatting_area {
  width: 100%;
  padding-top: 2vw;
  height: 85vh;
  position: relative;
  bottom: 0;
}
.chatting_footer {
  width: 100%;
  min-height: 15vw;
  padding-top: 2.5vw;
  padding-bottom: 2.5vw;
  background-color: #00ccff;
  border-top: 1px solid #ccc;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.input_box {
  width: 75%;
  min-height: 10vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 4vw;
}
.input_box_left {
  width: 15%;
  /* height: 100%; */
  background-color: #fff;
  margin-left: 4vw;
  border-top-left-radius: 45%;
  border-bottom-left-radius: 45%;
}
.input_box_middle {
  flex: 1;
  min-height: 10vw;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #ccc;
  font-size: 4vw;
  word-break: break-all;
  text-align: left;
  line-height: 5vw;
  padding: 1vw 5vw 1vw 5vw;
  border-radius: 5vw;
}
.input_box_right {
  width: 15%;
  /* height: 100%; */
  background-color: #fff;
  border-top-right-radius: 45%;
  border-bottom-right-radius: 45%;
}

.input_submit {
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vw;
  color: #fff;
}
</style>
