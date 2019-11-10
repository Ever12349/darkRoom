<template>
    <div>
        <div class='bg'>
            <div class='header'>
                <div>
                    {{ user_name }}
                </div>
                <i v-show='to_user_code' class="cubeic-arrow"></i>
                <div v-show='to_user_code'>
                    {{ to_user_name }}
                </div>
                <div class='placeholder'></div>
                <div class='response_botton'>
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
                <div v-if='show_more_flag' class='check-response' @click='showMore'>
                    <i class='cubeic-pulldown'></i>
                    <span>查看回复</span>
                </div>
                <div v-else class='check-response' @click='hiddenMore'>
                    <i class='cubeic-pullup'></i>
                    <span>收起回复</span>
                </div>
            </div>
            <div class='response_div' v-if='!show_more_flag'>
                <response-item :key='index' v-for='(item,index) in response_list'></response-item>
            </div>

        </div>
        <!-- <transition enter-active-class='animated fadeInDown' leave-active-class="animated fadeOutUp" class='transition_div'> -->
        <!-- </transition> -->
    </div>
</template>

<script>
import moment from 'moment';
moment.locale('zh-cn');
export default {
  name: "message_item",
  components: {
    responseItem: () => import("@/components/phone/response_item.vue")
  },
  props:{
    messageData:{
      type:Object
    }
  },
  data() {
    return {
      message_id: '',
      to_message_id:'',
      response_list: [1],
      user_code:null,
      to_user_code:null,
      show_more_flag: true,
      user_name: "",
      to_user_name: "",
      content: "",
      time: ""
    };
  },
  created(){
    this.render(this.messageData)
  },
  methods: {
    render(renderData){
      this.message_id = renderData.order_id;
      this.to_message_id = renderData.to_order_id;
      this.user_code = renderData.user_code;
      this.to_user_code = renderData.to_user_code;
      const user_info_obj = this.$store.state.user_info_state
      this.user_name = user_info_obj[this.user_code]?user_info_obj[this.user_code].user_name:null;
      // window.console.log(this.$store.state.user_info_state,'this.$store.state')
      this.to_user_name = user_info_obj[this.to_user_code]?user_info_obj[this.to_user_code].user_name:null;
      this.content = renderData.content;
      this.time = moment(renderData.create_time).fromNow();

    },
    showMore() {
      window.console.log(this.messageData,'messageData')
      // this.show_more_flag = false;
      this.$nextTick(() => {
        // this.response_list.splice(0,0,1,1,1,1,1);
      });
    },
    hiddenMore() {
      this.show_more_flag = true;
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
  background-color: #aff3e5;
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
  display: flex;
  padding: 4vw;
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
</style>

