<template>
  <div ref="verify_bg" class="verify_bg">
    <canvas :width="container_width" :height="container_height" ref="verify_container"></canvas>
  </div>
</template>
<script>
// import Verify from "vue2-verify";
import CaptchaMini from "captcha-mini";
export default {
  name: "verify", //验证码
  data() {
    return {
      container_width: null,
      container_height: null
    };
  },
  mounted() {
    const container_div_style = window.getComputedStyle(this.$refs.verify_bg);
    // window.console.log(container_div_style.width);
    this.container_width = parseInt(container_div_style.width);
    this.container_height = parseInt(container_div_style.height);
    this.$nextTick(() => {
      const dom = this.$refs.verify_container;
      const captcha = new CaptchaMini({
        length: 5
      });
      captcha.draw(dom, verifty_code => {
        window.console.log(verifty_code, "verifty_code");
        this.$emit('pushVeriftyCode',verifty_code)
      });
    });
  },
  methods: {
    verifySuccess() {
      //   alert("success");
    },
    verifyError() {
      //   alert("error");
    }
  }
};
</script>
<style scoped>
.verify_bg {
  width: 25vw;
  height: 10vw;
}
</style>