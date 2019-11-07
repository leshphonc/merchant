<template>
  <div>
    <div :key="index" v-for="(item, index) in list">
      <div class="white-space"></div>
      <van-cell-group>
        <van-cell :title="item.name" :value="item.count" is-link to="/order/groupList" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'order',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      map: {
        团购订单: '/order/groupList',
      },
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this._getOrderTypeList()
  },

  destroyed() {},

  methods: {
    ...mapActions('order', ['getOrderTypeList']),
    _getOrderTypeList() {
      this.getOrderTypeList().then(res => {
        console.log(res)
        res.push({ name: '到店消费订单', count: '0' })
        this.list = res
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
