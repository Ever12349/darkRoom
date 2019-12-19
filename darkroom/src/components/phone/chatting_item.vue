<template>
  <div class="chatting_item_bg">
    <div class="create_time_div" v-show="show_time_flag">{{ create_time }}</div>
    <div class="message_type_one" v-if="message_type_flag==1">
      <div v-if="is_mine" class="chatting_item chatting_item_right">
        <div class="placeholder"></div>
        <div class="chatting_content chatting_content_right">{{ chatting_content }}</div>
        <img class="user_heading_img user_heading_img_right" src="@/assets/chatting/头像一.jpeg" />
      </div>
      <div v-else class="chatting_item chatting_item_left">
        <img class="user_heading_img user_heading_img_left" src="@/assets/chatting/头像二.jpg" />
        <div class="chatting_content chatting_content_left">{{ chatting_content }}</div>
        <div class="placeholder"></div>
      </div>
    </div>
    <div class="message_type_two" v-if="message_type_flag == 2">
      <div class="message_notice">
        <div class="message_notice_top" v-if="is_mine">正在向对方打招呼</div>
        <div class="message_notice_top" v-else>Ta向你打招呼：{{ message_content }}</div>
        <div v-if="is_mine" class="message_notice_bottom bottom_mine">{{ watting_result }}</div>
        <div v-else class="message_notice_bottom bottom_no_mine">
          <div @click="refuse" class="refuse">拒绝</div>
          <div @click="agree" class="agree">同意</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "chatting_item",
  props: {
    message: {
      type: Object
    },
    preCreateTime: {
      type: [Date, Object, String]
    }
  },
  data() {
    return {
      is_mine: true,
      to_user_code: null,
      message_type_flag: 1,
      chatting_content: "",
      message_content: "",
      watting_result: `等待对方的回复。。。`,
      show_time_flag: true,
      create_time: null
    };
  },
  mounted() {
    this.init(this.message);
    // window.console.log("this.message", this.message);
  },
  methods: {
    agree() {
      // window.console.log(this.to_user_code);
      window.$phoneApp.showConfrim({ message: "请确认！" }, action => {
        if (action === "confirm") {
          // window.console.log('确认')
          this.$myapi
            .agreeFriendsApplication({
              user_code: localStorage.user_code,
              to_user_code: this.to_user_code
            })
            .then(res => {
              window.console.log(res.data, "agree");
            });
        }
      });
    },
    refuse() {},
    init(data) {
      this.is_mine =
        parseInt(data.user_code) === parseInt(localStorage.user_code);
      this.to_user_code = this.is_mine ? data.to_user_code : data.user_code;
      // window.console.log("$$$$+++++++", data, this.preCreateTime);
      this.create_time = moment(data.create_time).calendar();
      let diff_time = moment(data.create_time).diff(moment(this.preCreateTime));
      window.console.log("diff", diff_time, !diff_time || diff_time > 3600000);
      this.show_time_flag = !diff_time || diff_time > 3600000;
      this.message_type_flag = parseInt(data.message_type_flag);
      this.chatting_content = data.message;
    }
  }
};
</script>

<style scoped>
.chatting_item_bg {
  width: 100vw;
  padding-top: 3vw;
  padding-bottom: 3vw;
}
.create_time_div {
  font-size: 3vw;
  color: #707070;
}
.message_type_one {
  width: 100vw;
  min-height: 12vw;
  /* margin-top: 2vw; */
}
.chatting_item {
  width: 100vw;
  min-height: 12vw;
  display: flex;
  /* justify-content: flex-start; */
  align-items: flex-start;
  padding-top: 2vw;
  padding-bottom: 2vw;
}
.user_heading_img {
  width: 12vw;
  height: 12vw;
  border-radius: 6vw;
}
.chatting_content {
  max-width: 60vw;
  padding-left: 4vw;
  padding-right: 4vw;
  padding-top: 2vw;
  padding-bottom: 2vw;
  background-color: #fff;
  font-size: 4vw;
  border-radius: 3vw;
  margin-top: 4vw;
  text-align: left;
  line-height: 6vw;
  word-break: break-word;
}
.chatting_content_right {
  background-color: #53cd20;
  color: #fff;
  border-top-right-radius: 0vw;
}
.chatting_content_left {
  border-top-left-radius: 0;
}
.chatting_item_right {
  justify-content: flex-end;
}
.user_heading_img_right {
  margin-left: 3vw;
  margin-right: 4vw;
}
.user_heading_img_left {
  margin-left: 4vw;
  margin-right: 3vw;
}
.message_type_two {
  margin: 0 auto;
  width: 70vw;
  margin-top: 2vw;
}
.message_notice {
  width: 100%;
  height: 25vw;
  border-radius: 2vw;
  box-shadow: 2vw 2vw 2vw #ccc;
  border: 1px solid #ccc;
  background-color: #fff;
  overflow: hidden;
}
.message_notice_top {
  width: 100%;
  height: 15vw;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.5vw;
}
.message_notice_bottom {
  display: flex;
  color: #000;
  height: 9.5vw;
  width: 100%;
}
.bottom_mine {
  justify-content: center;
  align-items: center;
  font-size: 4vw;
  color: #ea1879;
}
.bottom_no_mine {
  justify-content: space-around;
}
.refuse {
  width: 49%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #ccc;
}
.agree {
  width: 50%;
  height: 100%;
  color: #ea1879;
  display: flex;
  justify-content: center;
  align-items: center;
}
.placeholder {
  flex: 1;
}
</style>
