<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="需求列表"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group>
      <van-cell :title="item.name" v-for="item in list" :key="item.id">
        <van-button size="mini" @click="show = true">绑定分类</van-button>
      </van-cell>
    </van-cell-group>
    <van-popup v-model="show" round position="bottom" :style="{ minHeight: '30vh' }">
      <van-checkbox-group v-model="result" direction="horizontal">
        <van-checkbox name="a">复选框 a</van-checkbox>
        <van-checkbox name="b">复选框 b</van-checkbox>
      </van-checkbox-group>
      <div>
        <van-button block>确定</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import api from '@/api/management/demand'
import apiCate from '@/api/management/category'
export default {
  name: 'DemandList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      show: false,
      result: [],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    api.getDemandList().then(res => {
      this.list = res
    })
    apiCate.getHasGoodsCategory().then(res => {
      // console.log(res)
    })
  },

  destroyed() {},

  methods: {},
}
</script>

<style lang="less" scoped></style>
