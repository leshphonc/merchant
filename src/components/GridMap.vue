<!--
  功能：渲染首页grid工具
  作者：cc
  时间：2019年10月12日
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
  props：
    data<Object>：用于渲染grid的数据，详细格式见 @/common/gird
    size<String>：图标大小px
-->
<template>
  <div class="container">
    <div class="title" v-if="data.title">{{ data.title }}</div>
    <van-grid :border="false" :clickable="true" :icon-size="size">
      <van-grid-item :icon="item.enable" :key="i" :text="item.name" :to="item.path" v-for="(item, i) in data.list" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: '',

  mixins: [],

  components: {},

  props: {
    data: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      default: '35',
    },
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {},
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
}

.title {
  font-size: 18px;
  padding: 14px;
}
</style>
