export default {
    mounted() {
        this.forceUpdate('scroll')
    },
    activated() {
        this.forceUpdate('scroll')
    },

    methods: {
        forceUpdate(scroll) {//强制更新
            this.$refs[scroll] && this.$refs[scroll].forceUpdate({
                dirty: true
            });

        },
        jumpToBack() {//返回上一级的方法
            window.console.log('jumpToBack', this);
            this.$router.back(-1);
        }
    }
}