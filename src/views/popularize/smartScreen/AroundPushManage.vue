<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="goList"
      fixed
      left-arrow
      right-text="选择"
      title="当前推广内容"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
  </div>
</template>

<script>
export default {
  name: 'AroundPushManage',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '佣金最高', value: 'b' },
        { text: '距离最近', value: 'c' },
        { text: '销量最多', value: 'd' },
      ],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    goList() {
      this.$router.push('/smartScreen/aroundPushList')
    },
  },
}
</script>

<style lang="less" scoped></style>
