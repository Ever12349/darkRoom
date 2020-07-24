<template>
  <div @click="hidden" class="chatting_input_box_bg">
    <div @click.stop class="input_div">
      <div class="input_div_left">
        <div class="input_textarea_left"></div>
        <textarea
          class="input_textarea"
          v-model="input_message"
          name="textarea_input"
          id="chatting_textarea_input"
          autofocus
        ></textarea>
        <div class="input_textarea_right">
          <i @click="clearInput" v-show="show_icon_flag" class="cubeic-wrong"></i>
        </div>
      </div>
      <div class="input_div_right" @click="sendMessage">发送</div>
    </div>
  </div>
</template>
<script>
import { autoTextarea } from "@/util";
export default {
  model: {
    prop: "message",
    event: "change"
  },
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      show_icon_flag: !!this.message,
      input_message: this.message
    };
  },
  watch: {
    input_message(value) {
      this.show_icon_flag = !!value;
      this.$emit("change", value);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      window.console.log(this.message, "input_message", this.input_message);
      const textAreaDom = document.querySelector("#chatting_textarea_input");
      textAreaDom.focus();
      autoTextarea(textAreaDom);
    },
    sendMessage() {
      this.$emit("messageSend", this.input_message);
      this.input_message = null;
    },
    hidden() {
      this.$emit("hidden");
    },
    clearInput() {
      this.input_message = "";
      const textAreaDom = document.querySelector("#chatting_textarea_input");
      textAreaDom.focus();
    }
  }
};
</script>
<style scoped>
.chatting_input_box_bg {
  width: 100vw;
  height: 90vh;
  position: absolute;
  bottom: 0;
  left: 0;
  /* background-color: rgba(0, 0, 0, 0.5); */
  z-index: 2;
}
.input_div {
  width: 100%;
  /* height: 12%; */
  background-color: #00ccff;
  position: absolute;
  bottom: 0;
  padding-top: 2.5vw;
  padding-bottom: 2.5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.input_div_left {
  width: 75%;
  padding-left: 4vw;
  display: flex;
  justify-content: space-around;
}
.input_div_right {
  width: 25%;
  height: 100%;
  color: #fff;
  font-size: 4vw;
}
.input_textarea {
  display: block;
  /* margin:0 auto; */
  overflow: auto;
  width: 70%;
  height: 10vw;
  line-height: 6vw;
  font-size: 4vw;
  padding: 1vw;
  /* white-space： */
  word-break: break-word;
  padding-top: 2vw;
}
.input_textarea_left {
  width: 15%;
  background-color: #fff;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
}
.input_textarea_right {
  width: 15%;
  background-color: #fff;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>