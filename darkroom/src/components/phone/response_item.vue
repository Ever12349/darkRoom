<template>
    <div class='response_item_bg'>
        <div class='response_item_container'>
            <div class='response_item_header'>
                <div>
                    {{ user_name }}
                </div>
                <i class='cubeic-arrow'></i>
                <div>
                    {{ to_user_name }}
                </div>
                <div class='placeholder'></div>
                <div class='response_botton'>
                    回复
                </div>

            </div>
            <div class='response_item_body'>
                {{ content }}
            </div>
            <div class='response_item_footer'>
                <div class='response_item_time'>
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
            <div v-if='!show_more_flag'>
                <response-item :key='index' v-for='(item,index) in response_list'></response-item>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
export default {
  name: "response_item",
  components: {
    responseItem: () => import("@/components/phone/response_item.vue")
  },
  data() {
    return {
      response_list: [1],
      user_name: "正式",
      to_user_name: "谎言",
      content: "我不好",
      time: "2019-11-03 08:52",
      show_more_flag: true
    };
  },
  methods: {
    showMore() {
      this.show_more_flag = false;
    },
    hiddenMore() {
      this.show_more_flag = true;
    }
  }
};
</script>

<style scoped>
.response_item_bg {
  background-color: #09fffa47;
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
</style>


<style>
</style>
