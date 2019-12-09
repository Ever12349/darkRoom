<template>
  <div>
    <div :style='{"background-color":`${ismine?"#43df17ad":"#d6d8e1a1"}`}' class='bg'>
      <div class='header'>
        <div @click.stop='applicationFriends(user_code)'>
          {{ user_name }}
        </div>
        <i v-show='to_user_code' class="cubeic-arrow"></i>
        <div v-show='to_user_code' @click.stop='applicationFriends(to_user_code)'>
          {{ to_user_name }}
        </div>
        <div class='placeholder'></div>
        <div @click='response(message_id)' class='response_botton'>
          回复
        </div>
      </div>
      <div class='body'>
        {{ content }}
      </div>
      <div class='footer'>
        <div class='response-time'>
          {{ time }}
        </div>
        <div v-if='!show_more_flag' class='check-response' @click='showMore'>
          <i class='cubeic-pulldown'></i>
          <span>查看回复</span>
        </div>
        <div v-else class='check-response' @click='hiddenMore'>
          <i class='cubeic-pullup'></i>
          <span>收起回复</span>
        </div>
      </div>
      <!-- <mt-spinner type="triple-bounce" color='#524aa3' size="20"></mt-spinner> -->
      <div class='response_div' v-if='show_more_flag'>
        <response-item @childReply='response' @showAllMessage='showAllMessage' :responseData='item' :key='item.order_id||index' v-for='(item,index) in response_list'></response-item>
        <mt-spinner v-show='show_spinner_flag' type="triple-bounce" color='#524aa3' :size=20></mt-spinner>

        <!-- <div v-if='get_more_flag' @click='getMoreResponse' class='get_more'>
          点击加载更多
        </div> -->
        <div v-show='get_more_flag' class='get_more'>
          没有更多
        </div>
      </div>
    </div>
    <!-- <transition enter-active-class='animated fadeInDown' leave-active-class="animated fadeOutUp" class='transition_div'> -->
    <!-- </transition> -->
  </div>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn");
// const response_list_page_size = 5;
export default {
  name: "message_item",
  components: {
    responseItem: () => import("@/components/phone/response_item.vue"),
  },
  props: {
    messageData: {
      type: Object
    }
  },
  data() {
    return {
      message_id: "",
      to_message_id: "",
      response_list: [],
      user_code: null,
      to_user_code: null,
      show_more_flag: false,
      user_name: "",
      to_user_name: "",
      content: "",
      time: "",
      ismine: false,
      show_spinner_flag: false,
      get_more_flag: false
    };
  },
  created() {
    this.render(this.messageData);
  },
  mounted(){
    // this.
  },
  methods: {
    applicationFriends(user_code){
      // alert(user_code === parseInt(localStorage.user_code))
      if(user_code !== parseInt(localStorage.user_code)){
        // window.console.log(localStorage.user_code)
        window.$phoneApp.showApplication(user_code)
      }
    },
    doSomeTing(){
      this.friendsApplication({
        user_code:localStorage.user_code,
        to_user_code:this.user_code
      })
    },
    friendsApplication(data){
      this.$myapi.friendsApplication({
        user_code:data.user_code,
        to_user_code:data.to_user_code
      }).then(res=>{
        window.console.log(res,'friendsApplication')
      })
    },
    response(id) {
      let message_id = id || this.message_id;
      this.$emit("response", message_id);
    },
    render(renderData) {
      this.message_id = renderData.order_id;
      this.to_message_id = renderData.to_order_id;
      this.user_code = renderData.user_code;
      this.to_user_code = renderData.to_user_code;
      this.ismine = localStorage.user_code == this.user_code;
      const user_info_obj = this.$store.state.user_info_state;
      this.user_name = user_info_obj[this.user_code]
        ? user_info_obj[this.user_code].user_name
        : null;
      this.to_user_name = user_info_obj[this.to_user_code]
        ? user_info_obj[this.to_user_code].user_name
        : null;
      this.content = renderData.content;
      this.time = moment(renderData.create_time).fromNow();
    },
    showMore() {
      window.console.log(this.messageData, "messageData");
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
              this.response_list = this.response_list.concat(
                res.data.data.list
              );
              if (!res.data.data.list.length) {
                this.get_more_flag = true;
              }
            }
          });
      });
    },
    showAllMessage() {
      this.show_spinner_flag = true;
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
            }
          });
      });
    },
    getMoreResponse() {
      this.show_more_flag = true;
      this.show_spinner_flag = true;
    },
    hiddenMore() {
      this.show_more_flag = false;
    }
  }
};
</script>

<style>
</style>

<style scoped>
.bg {
  margin: 0 auto;
  width: 96vw;
  margin-top: 2vw;
  margin-bottom: 2vw;
  border: 1px solid #ccc;
  border-radius: 2vw;
  box-shadow: 1vw 1vw 1vw #ccc;
  display: flex;
  flex-direction: column;
  background-color: #d6d8e1a1;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 10vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 4vw;
  padding-left: 2vw;
}
.body {
  width: 100%;
  padding-left: 2vw;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  /* display: flex; */
  padding: 4vw;
  word-break: break-all;
  text-align: left;
}
.footer {
  width: 100%;
  height: 6vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2vw;
}
.response-time {
  font-size: 2vw;
}
.check-response {
  margin-right: 3vw;
  font-size: 3vw;
  display: flex;
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
.response_div {
  /* margin-top: 2vw; */
  /* background-color:#f50000; */
  overflow: hidden;
}
.transition_div {
  overflow: hidden;
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

