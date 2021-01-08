<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="需求列表"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group>
      <van-cell :title="item.name" v-for="item in list" :key="item.id">
        <van-button size="mini" @click="openBindPopup(item.id, item.categoryList)">绑定分类</van-button>
      </van-cell>
    </van-cell-group>
    <van-popup v-model="show" safe-area-inset-bottom round position="bottom" :style="{ minHeight: '30vh' }">
      <div class="category">
        <van-checkbox-group v-model="result" direction="horizontal">
          <van-checkbox :name="item.id" v-for="item in category" :key="item.id">{{ item.name }}</van-checkbox>
        </van-checkbox-group>
      </div>
      <div>
        <van-button block type="primary" @click="bindCategory">确定</van-button>
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
      category: [],
      result: [],
      curId: '',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.getList()
    apiCate.getHasGoodsCategory().then(res => {
      if (typeof res == 'string') {
        this.$toast.fail(res)
      } else {
        this.category = res
      }
    })
  },

  destroyed() {},

  methods: {
    getList() {
      api.getDemandList().then(res => {
        if (typeof res == 'string') {
          this.$toast.fail(res)
        } else {
          this.list = res
        }
      })
    },
    openBindPopup(id, arr) {
      this.result = arr.map(item => {
        return item.id
      })
      this.curId = id
      this.show = true
    },
    bindCategory() {
      api
        .bindCategory({
          demand_id: this.curId,
          class_ids: this.result,
        })
        .then(res => {
          if (typeof res == 'string') {
            this.$toast.fail(res)
          } else {
            this.show = false
            this.getList()
            this.$toast.success('操作成功')
          }
        })
    },
  },
}
</script>

<style lang="less" scoped>
.category {
  min-height: 200px;
  padding: 15px 10px;
  box-sizing: border-box;
}
</style>
