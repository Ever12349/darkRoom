<template>
    <div>
        <div class='bg'>
            <div class='header'>
                <div>
                    {{ user_name }}
                </div>
                <i class="cubeic-arrow"></i>
                <div>
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
export default {
  name: "message_item",
  components: {
    responseItem: () => import("@/components/phone/response_item.vue")
  },
  data() {
    return {
      message_id: "",
      to_message_id:'',
      response_list: [1],
      show_more_flag: true,
      user_name: "真实之泪",
      to_user_name: "谎言",
      content: "我是谁？",
      time: "2019-10-5 08:30"
    };
  },
  methods: {
    showMore() {
      this.show_more_flag = false;
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

