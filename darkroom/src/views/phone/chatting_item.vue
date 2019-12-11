<template>
  <div class="chatting_item_bg">
    <div v-if="message_type_flag==1">
      <div v-if="is_mime" class></div>
      <div v-else></div>
    </div>
    <div v-if="message_type_flag == 2">
        
    </div>
  </div>
</template>

<script>
export default {
  name: "chatting_item",
  props: {
    message: {
      type: Object
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.init(this.message);
  },
  methods: {
    init(data) {}
  }
};
</script>

<style scoped>
</style>
