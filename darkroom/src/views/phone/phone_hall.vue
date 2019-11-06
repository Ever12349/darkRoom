<template>
    <div class='bg'>
        <mt-header title="大厅"></mt-header>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll" :options="options">
                <message-item :key='index' v-for='(item,index) in message_list'></message-item>
            </cube-scroll>
        </div>
        <mt-button size="small" @click='showInput' class='transmit_message' type="primary">发送信息</mt-button>
        <message-input-box></message-input-box>
    </div>
</template>

<script>
export default {
  data() {
    return {
      message_list: [1, 1, 1, 1, 1],
      options: Object.freeze({})
    };
  },
  components: {
    messageItem: () => import("@/components/phone/message_item.vue"),
    messageInputBox:()=>import('@/components/phone/message_input_box.vue')
  },
  methods: {
    showInput() {}
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

