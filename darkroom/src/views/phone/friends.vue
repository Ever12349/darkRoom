<template>
  <div>
    <cube-tab-bar
      v-model="selectedLabel"
      show-slider
      :use-transition="disabled"
      ref="tabNav"
      :data="tabLabels"
    ></cube-tab-bar>
    <div class="tab-slide-container">
      <cube-slide
        ref="slide"
        :loop="loop"
        :auto-play="autoPlay"
        :show-dots="showDots"
        :options="slideOptions"
        :initial-index="initialIndex"
        @scroll="scroll"
        @change="changePage"
      >
        <!-- 关注 -->
        <cube-slide-item>
          <!-- <div class="scroll-box">
            <cube-scroll ref="scroll" :options="scrollOptions">

            </cube-scroll>
          </div> -->
          <friends-list></friends-list>
        </cube-slide-item>
        <!-- 推荐 -->
        <cube-slide-item>
          <!-- <cube-scroll :options="scrollOptions">

          </cube-scroll> -->
          <message-list></message-list>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>
<script >
const selected_word = ["好友", "消息"];
const initia_index_obj = (function(arr) {
  let obj = {};
  arr.forEach((word, index) => {
    obj[word] = index;
  });
  return obj;
})(selected_word);
export default {
  name:'friends',
  components:{
    friendsList:()=>import('@/components/phone/friends_list'),
    messageList:()=>import('@/components/phone/message_list')
  },
  data() {
    return {
      // initialIndex: 0,
      selectedLabel: selected_word[0],
      disabled: false,
      tabLabels: [
        {
          label: selected_word[0]
        },
        {
          label: selected_word[1]
        }
      ],
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        /* lock y-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      },
      // scrollOptions: {
      //   /* lock x-direction when scrolling horizontally and  vertically at the same time */
      //   directionLockThreshold: 0
      // }
    };
  },
  watch: {
    // selectedLabel(value) {
    //   this
    // }
  },
  methods: {
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label;
      window.console.log(current);
    },
    scroll(pos) {
      const x = Math.abs(pos.x);
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth;
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
      const deltaX = (x / slideScrollerWidth) * tabItemWidth;
      this.$refs.tabNav.setSliderTransform(deltaX);
    }
  },
  computed: {
    //可能少一个initialIndex
    initialIndex(){
      return initia_index_obj[this.selectedLabel]
    }
  }
};
</script>
<style>
.scroll-box {
  height: 96vh;
}
</style>