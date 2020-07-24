<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { isPc } from "./util";
export default {
  name: "app",
  data() {
    return {
      message_list: {},
      message_record: [],
      // message_detail: {},
      isPC: isPc()
    };
  },
  created() {
    window.$app = this;
  },
  methods: {
    addNewMessageItem(user_code, message_list) {
      window.console.log(user_code, message_list, this.message_record);
      if (this.message_list[user_code]) {
        this.message_list[user_code] = [
          ...this.message_list[user_code],
          ...message_list
        ];
        // this.$set(this.message_list,user_code,[])
      } else {
        // this.message_list[user_code] = message_list;
        this.$set(this.message_list, user_code, message_list);
      }
    }
  }
};
</script>

<style>
</style>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
