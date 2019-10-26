<template>
  <div>
    <van-nav-bar @click-left="_goBack" @click-right="_create" fixed left-arrow right-text="创建" title="运费模版"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group title="模版列表">
      <van-swipe-cell :key="item.value" v-for="item in list">
        <van-cell :title="item.label" :to="`/freight/freightTemplateCRU/${item.value}`" is-link />
        <template slot="right">
          <van-button square text="删除" type="danger" />
        </template>
      </van-swipe-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this._getFreightTemPlateList()
  },

  destroyed() {},

  methods: {
    ...mapActions('freight', ['getFreightTemPlateList']),
    _getFreightTemPlateList() {
      this.getFreightTemPlateList().then(res => {
        this.list = res
      })
    },
    _create() {
      this.$router.push('/freight/freightTemplateCRU')
    },
  },
}
</script>

<style lang="less" scoped></style>
