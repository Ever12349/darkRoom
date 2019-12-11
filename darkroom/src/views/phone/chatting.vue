<template>
  <div>
    <mt-header :title="user_name">
      <div slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="chatting_body">
      <div class="chatting_area"></div>
      <div class="chatting_footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chatting",
  props: {
    userCode: {
      type: [String, Number]
    }
  },

  data() {
    return {
      user_name: null
    };
  },
  mounted() {
    this.init(this.userCode);
  },
  methods: {
    init(user_code) {
      window.console.log(user_code, "----------------");
      this.$myapi.getUserInfoByUserCode(user_code).then(user_info => {
        window.console.log(user_info, "get______________get");
        this.user_name = user_info.user_name;
      });
    }
  }
};
</script>

<style scoped>
.chatting_body {
  width: 100vw;
  height: 92vh;
  background-color: #f5f5f5;
}
.chatting_area {
  width: 100%;
}
.chatting_footer {
  width: 100%;
  height: 15vw;
  background-color: #f0f;
  position: absolute;
  bottom: 0;
}
</style>
