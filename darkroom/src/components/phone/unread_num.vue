<template>
  <div class="unread_num_bg" :style="{fontSize:`${font_size}%`}">{{ unread_num }}</div>
</template>

<script>
export default {
  name: "unread_num",
  props: {
    num: {
      type: [Number, String]
    }
  },
  created() {},
  mounted() {
    if (this.num > 99) {
      this.font_size = 60;
    } else {
      this.font_size = 80;
    }
  },
  computed: {
    unread_num() {
      let num = parseInt(this.num) > 99 ? "99+" : parseInt(this.num);
      return num;
    }
  },
  data() {
    return {
      font_size: 3.5
      //   num: 0
    };
  },
  methods: {
    //   init(){
    //   }
  }
};
</script>

<style scoped>
.unread_num_bg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f00;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.5vw;
}
</style>
