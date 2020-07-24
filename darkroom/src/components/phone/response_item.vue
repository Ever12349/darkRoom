<template>
  <div class="response_item_bg">
    <div @click="showAllMessage" class="show_all_message" v-if="show_all_message_flag">点击展开全部信息</div>

    <div v-else class="response_item_container">
      <div class="response_item_header">
        <div>{{ user_name }}</div>
        <i v-show="to_user_code" class="cubeic-arrow"></i>
        <div v-show="to_user_code">{{ to_user_name }}</div>
        <div class="placeholder"></div>
        <div class="response_botton" @click="response">回复</div>
      </div>
      <div class="response_item_body">{{ content }}</div>
      <div class="response_item_footer">
        <div class="response_item_time">{{ time }}</div>
        <div v-if="!show_more_flag" class="check-response" @click="showMore">
          <i class="cubeic-pulldown"></i>
          <span>查看回复</span>
        </div>
        <div v-else class="check-response" @click="hiddenMore">
          <i class="cubeic-pullup"></i>
          <span>收起回复</span>
        </div>
      </div>
      <div v-if="show_more_flag">
        <mt-spinner v-show="show_spinner_flag" type="triple-bounce" color="#524aa3" :size="20"></mt-spinner>
        <response-item
          @showAllMessage="getAllMessage"
          @childReply="response"
          :responseData="item"
          :key="index"
          v-for="(item,index) in response_list"
        ></response-item>
        <!-- <div v-if='get_more_flag' class='get_more'>
          点击加载更多
        </div>-->
        <div v-show="get_more_flag" class="get_more">没有更多</div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn");
// const response_list_page_size = 5;
import { isNumber, isString } from "@/util/dataType.js";
export default {
  name: "response_item",
  props: {
    responseData: {
      type: [Object, String, Number]
    }
  },
  components: {
    responseItem: () => import("@/components/phone/response_item.vue")
  },
  data() {
    return {
      message_id: "",
      to_message_id: "",
      response_list: [],
      user_code: "",
      to_user_code: "",
      user_name: "",
      to_user_name: "",
      content: "",
      time: "",
      get_more_flag: false,
      show_all_message_flag: false,
      show_more_flag: false
    };
  },
  created() {},
  mounted() {
    this.render(this.responseData);
  },
  methods: {
    render(data) {
      if (isNumber(data)) {
        // window.console.log(isObject(data),'datadatadatadata')
        this.show_all_message_flag = true;
        return;
      }
      // window.console.log(data, "responseItem");
      this.message_id = data.order_id;
      this.to_message_id = data.to_order_id;
      this.user_code = data.user_code;
      this.to_user_code = data.to_user_code;
      const user_info = this.$store.state.user_info_state;
      // window.console.log(user_info, "user_info");
      this.user_name = user_info[this.user_code]
        ? user_info[this.user_code].user_name
        : "";
      this.to_user_name = user_info[this.user_code]
        ? user_info[this.user_code].user_name
        : "";
      this.content = data.content;
      this.time = moment(data.create_time).fromNow();
    },
    response(id) {
      let message_id;
      if (isString(id)) {
        message_id = id;
      } else {
        message_id = this.message_id;
      }
      window.console.log(message_id, "message_idmessage_id");
      this.$emit("childReply", message_id);
      // alert(message_id)
    },
    showAllMessage() {
      this.$emit("showAllMessage");
    },
    getAllMessage() {
      // window.console.log("yyyyyyyyyyy");
      this.show_spinner_flag = true;
      this.response_list = [];
      this.$nextTick(() => {
        this.$myapi
          .getReponseMessageList({
            order_id: this.message_id,
            pageNo: 2
          })
          .then(res => {
            window.console.log(res.data, "showAllMessage");
            this.show_spinner_flag = false;
            if (res.data.code == 200) {
              this.$store.commit("addNewUserInfo", res.data.data.user_info);
              const list = res.data.data.list;
              this.response_list.splice(
                3,
                1,
                ...list.slice(3, list.length - 2)
              );
              // this.response_list = this.response_list.concat(
              //   res.data.data.list
              // );
            }
          });
      });
    },
    showMore() {
      this.show_more_flag = true;
      this.show_spinner_flag = true;
      this.get_more_flag = false;
      this.response_list = [];
      this.$nextTick(() => {
        this.$myapi
          .getReponseMessageList({
            order_id: this.message_id,
            pageNo: 1
          })
          .then(res => {
            window.console.log(res.data, "showMore");
            this.show_spinner_flag = false;
            if (res.data.code == 200) {
              this.$store.commit("addNewUserInfo", res.data.data.user_info);
              // this.$store.commit("addNewUserInfo", res.data.data.user_info);
              const list = res.data.data.list;
              this.response_list = this.response_list.concat(list);
              // this.response_list.splice(3,1,...list.slice(3,list.length-2));
              if (!list.length) {
                this.get_more_flag = true;
              }
              // if (res.data.data.list.length >= response_list_page_size) {
              //   this.get_more_flag = true;
              // } else {
              //   this.get_more_flag = false;
              // }
            }
          });
      });
    },
    hiddenMore() {
      this.show_more_flag = false;
    }
  }
};
</script>

<style scoped>
.response_item_bg {
  background-color: rgba(9, 255, 210, 0.3);
  width: 96vw;
  border-top: 1px solid #ccc;
  /* border-radius: 2vw; */
  font-size: 4vw;
  margin: 0 auto;
}
.response_item_container {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
.response_item_header {
  width: 100%;
  height: 10vw;
  padding-left: 4vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 3.5vw;
}
.placeholder {
  flex: 1;
}
.response_botton {
  margin-right: 3vw;
  font-size: 3.5vw;
  width: 10vw;
  height: 6vw;
  background-color: #26a2ff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1vw;
}

.response_item_body {
  width: 100%;
  padding-left: 2vw;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding: 4vw;
}
.response_item_footer {
  width: 100%;
  height: 6vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2vw;
}
.response_item_time {
  font-size: 2vw;
}
.check-response {
  margin-right: 3vw;
  font-size: 3vw;
  display: flex;
}
.show_all_message {
  padding-top: 2vw;
  padding-bottom: 2vw;
  background-color: #fff;
  font-size: 4vw;
}
.get_more {
  width: 100%;
  height: 6vw;
  border-top: 1px solid #ccc;
  font-size: 3vw;
  color: #807979;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


<style>
</style>
