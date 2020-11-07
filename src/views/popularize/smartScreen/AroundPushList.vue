<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="同城联盟推广列表"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
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
    openPicker() {},
  },
}
</script>

<style lang="less" scoped></style>
