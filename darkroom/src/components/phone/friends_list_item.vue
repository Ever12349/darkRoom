<template>
  <div class="friends_list_item_bg">
    <!-- qqqqqqqq -->
    <div class="user_name">{{ user_name }}</div>
    <div class="placeholder"></div>
    <div class="is_online" v-if="is_login">在线</div>
    <div class="is_onlione" v-else>离线</div>
  </div>
</template>

<script>
export default {
  name: "friends_list_item",
  props: {
    friendData: {
      type: Object
    }
  },
  data() {
    return {
      user_code: null,
      user_name: "",
      is_login: true
    };
  },
  mounted() {
    this.init(this.friendData);
  },
  methods: {
    init(data) {
      this.user_code =
        parseInt(localStorage.user_code) === parseInt(data.user_code)
          ? data.to_user_code
          : data.user_code;

      this.$myapi.getUserInfoByUserCode(this.user_code).then(res => {
        window.console.log("friends_friends", res);
        this.user_name = res.user_name;
      });
    }
  }
};
</script>

<style scoped>
.friends_list_item_bg {
  width: 100vw;
  height: 12vw;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
}
</style>