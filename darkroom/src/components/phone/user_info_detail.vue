<template>
  <div @click.stop="hidden" class="user_info_detail_bg">
    <div @click.stop class="user_info_detail_item"></div>
  </div>
</template>

<script>
export default {
  props: {
    userCode: {
      type: [String, Number]
    }
  },
  mounted() {
    this.$myapi.getUserInfoByUserCode(this.userCode).then(res => {
      window.console.log(res);
    });
  },
  methods: {
    hidden() {
      this.$emit("hidden");
    }
  }
};
</script>

<style scoped>
.user_info_detail_bg {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 12;
}
.user_info_detail_item {
  width: 90vw;
  height: 60vw;
  margin: 0 auto;
  background-color: #fff;
  margin-top: 50vw;
  border-radius: 3vw;
}
</style>>


<style>
</style>