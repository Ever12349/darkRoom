<template>
  <div v-tap="{methods : jumpToChat}" class="message_list_item_bg">
    <div class="list_left">
      <div class="item_user_name">{{ user_name }}</div>
      <div class="item_content">{{ content }}</div>
    </div>
    <div class="placeholder"></div>
    <div class="list_right">
      <!--  -->
      <div class="list_right_time">{{create_time}}</div>
      <div class="placeholder"></div>
      <div class="list_right_message_num">
        <unread-num v-show="unread_num>0" :num="unread_num"></unread-num>
      </div>
    </div>
  </div>
</template>

<script>
// const right_words = {
//     'application':'添加好友'
// }
import moment from "moment";
moment.locale("zh-cn");
export default {
  name: "message_list_item",
  props: {
    messageListItem: {
      type: Object
    }
  },
  mounted() {
    window.console.log(this.messageListItem);
    this.init(this.messageListItem);
  },
  components: {
    unreadNum: () => import("@/components/phone/unread_num.vue")
  },
  data() {
    return {
      is_mine: false,
      user_name: null,
      content: null,
      user_code: null,
      message_type_flag: null,
      create_time: null,
      unread_num: 999
    };
  },
  methods: {
    jumpToChat() {
      window.console.log(1111111111111);
      this.$router.push({
        path: `/chatting/${this.user_code}`
        // path:'/my'
      });
    },
    init(data) {
      this.is_mine = !!(
        parseInt(localStorage.user_code) == parseInt(data.user_code)
      );

      this.user_code = this.is_mine ? data.to_user_code : data.user_code;
      this.content = data.message;
      const user_info = this.$store.state.user_info_state[this.user_code];
      this.message_type_flag = data.message_type_flag;
      this.user_name = user_info.user_name;
      this.create_time = moment(data.create_time).fromNow();
    }
  }
};
</script>

<style scoped>
.message_list_item_bg {
  width: 100vw;
  height: 16vw;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  font-size: 4vw;
  padding-left: 4vw;
  padding-right: 4vw;
}
.placeholder {
  flex: 1;
}
.item_user_name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 4.5vw;
  height: 8vw;
}
.item_content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 3vw;
  height: 4vw;
}
.list_right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-bottom: 2vw;
  padding-top: 3vw;
}
.list_right_time {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.5vw;
}
.list_right_message_num {
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex:1; */
  width: 5vw;
  height: 5vw;
}
.list_right_item {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  background-color: #1488db;
  width: 20vw;
  height: 6vw;
  font-size: 3vw;
  color: #fff;
  border-radius: 2vw;
}
</style>