<template>
    <div @click='hidden' class='input_box_bg'>
        <div @click.stop class='input_box_item'>
            <textarea class='message_textarea' v-model='input_message' name="message_textarea_input" id="message_textarea_input"></textarea>
            <div ref='mtField' @click='send' class='send_message'>
                发送
            </div>
        </div>
    </div>
</template>

<script>
import { autoTextarea } from "@/util";
export default {
  name: "message_input_box",
  data() {
    return {
      input_message: "",
      rows: "1"
    };
  },
  components: {

  },
  mounted() {
    const ele = document.querySelector("#message_textarea_input");
    autoTextarea(ele);
  },
  watch: {
    // input_message(str) {

    // }
  },
  methods: {
    send() {
      if(this.input_message){
        this.$emit("sendMessage", this.input_message);
      }else{
        window.console.log('空')
      }
    },
    hidden() {
      this.$emit("hidden");
    }
  }
};
</script>
<style scoped>
.input_box_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
}
.input_box_item {
  width: 100vw;
  min-height: 10vw;
  display: flex;
  position: absolute;
  bottom: 0;
  /* border-radius:2vw; */
  overflow: hidden;
}
.send_message {
  font-size: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-left: 1px solid #ccc;
  width: 15vw;
}
.message_textarea {
  display: block;
  /* margin:0 auto; */
  overflow: auto;
  width: 85vw;
  height: 10vw;
  line-height: 6vw;
  font-size: 5vw;
  padding: 1vw;
}
.input_area {
  width: 85vw;
}
</style>

<style>
</style>
