<template>
  <div @click.stop="hidden" class="user_info_detail_bg">
    <div @click.stop class="user_info_detail_item">
      <div class="user_info_detail_item_list">
        <span>用户名:</span>
        <span>{{ user_name }}</span>
      </div>
      <div class="user_info_detail_item_list">
        <span>用户状态:</span>
        <span>{{ user_status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
const states_word = ["离线", "在线"];
export default {
  props: {
    userCode: {
      type: [String, Number]
    }
  },
  data() {
    return {
      user_name: null,
      is_online: false
    };
  },
  computed: {
    user_status() {
      return states_word[Number(this.is_online)];
    }
  },
  mounted() {
    this.$myapi.getUserInfoByUserCode(this.userCode).then(user_info => {
      window.console.log(user_info, "eeeeeeeeee");

      this.user_name = user_info.user_name;
      this.is_online = !!user_info.is_online;
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

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.user_info_detail_item_list {
  font-size: 6vw;
  width: 100%;
  height: 10vw;
  margin-top: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom:1px solid #ccc;
}
</style>>


<style>
</style>