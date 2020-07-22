<template>
  <div>
    <van-cell
      @click="_controlCommodityPopup"
      arrow-direction="down"
      is-link
      title="推广商品"
      value="点击选择"
    ></van-cell>
    <van-cell :icon="_commodityImg" :title="_commodityLabel" :value="_commodityType" center v-if="result_id"></van-cell>
    <!-- 弹出层 -->
    <!-- 绑定产品列表 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCommodityPopup">
      <van-tabs sticky>
        <!-- 零售 -->
        <van-tab title="零售">
          <van-pull-refresh @refresh="_eOnRefresh" v-model="eRefreshing">
            <van-list
              :finished="eFinished"
              :finished-text="eFinishText"
              :immediate-check="false"
              @load="_eOnLoad"
              v-model="loading"
            >
              <van-radio-group v-model="result_id">
                <van-cell-group>
                  <van-cell
                    :key="index"
                    :title="item.name"
                    @click="_selectCommodity(item.goods_id, 0)"
                    clickable
                    v-for="(item, index) in eList"
                  >
                    <van-image :src="item.list_pic" lazy-load slot="icon" />
                    <van-radio :name="item.goods_id" slot="right-icon" />
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <!-- 团购 -->
        <van-tab title="团购">
          <van-pull-refresh @refresh="_gOnRefresh" v-model="gRefreshing">
            <van-list
              :finished="gFinished"
              :finished-text="gFinishText"
              :immediate-check="false"
              @load="_gOnLoad"
              v-model="loading"
            >
              <van-radio-group v-model="result_id">
                <van-cell-group>
                  <van-cell
                    :key="index"
                    :title="item.name"
                    @click="_selectCommodity(item.group_id, 1)"
                    clickable
                    v-for="(item, index) in gList"
                  >
                    <van-image :src="item.list_pic" lazy-load slot="icon" />
                    <van-radio :name="item.group_id" slot="right-icon" />
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <!-- 服务 -->
        <van-tab title="服务">
          <van-pull-refresh @refresh="_sOnRefresh" v-model="sRefreshing">
            <van-list
              :finished="sFinished"
              :finished-text="sFinishText"
              :immediate-check="false"
              @load="_sOnLoad"
              v-model="loading"
            >
              <van-radio-group v-model="result_id">
                <van-cell-group>
                  <van-cell
                    :key="index"
                    :title="item.appoint_name"
                    @click="_selectCommodity(item.appoint_id, 2)"
                    clickable
                    v-for="(item, index) in sList"
                  >
                    <van-image :src="item.list_pic" lazy-load slot="icon" />
                    <van-radio :name="item.appoint_id" slot="right-icon" />
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <!-- 套餐 -->
        <van-tab title="套餐">
          <van-pull-refresh @refresh="_pOnRefresh" v-model="pRefreshing">
            <van-list
              :finished="pFinished"
              :finished-text="pFinishText"
              :immediate-check="false"
              @load="_pOnLoad"
              v-model="loading"
            >
              <van-radio-group v-model="result_id">
                <van-cell-group>
                  <van-cell
                    :key="index"
                    :title="item.name"
                    @click="_selectCommodity(item.package_id, 4)"
                    clickable
                    v-for="(item, index) in pList"
                  >
                    <van-image :src="item.pic" lazy-load slot="icon" />
                    <van-radio :name="item.package_id" slot="right-icon" />
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
      <van-button @click="showCommodityPopup = false" class="close-btn">关闭</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'commodityRadio',

  mixins: [],

  components: {},

  props: {
    pickCommodity: {
      required: true,
      type: Function,
    },
    id: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    cacheImg: {
      required: true,
      type: String,
    },
  },

  data() {
    return {
      active: 0,
      showCommodityPopup: false,
      loading: false,
      result_id: '',
      result_type: '',
      // 零售
      eList: [],
      ePage: 1,
      eFinished: false,
      eRefreshing: false,
      // 团购
      gList: [],
      gPage: 1,
      gFinished: false,
      gRefreshing: false,
      // 服务
      sList: [],
      sPage: 1,
      sFinished: false,
      sRefreshing: false,
      // 套餐
      pList: [],
      pPage: 1,
      pFinished: false,
      pRefreshing: false,
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    eFinishText() {
      return this.eList.length ? '没有更多了' : '暂无商品'
    },
    gFinishText() {
      return this.gList.length ? '没有更多了' : '暂无商品'
    },
    sFinishText() {
      return this.sList.length ? '没有更多了' : '暂无商品'
    },
    pFinishText() {
      return this.pList.length ? '没有更多了' : '暂无商品'
    },
    _commodityLabel() {
      let name
      switch (this.result_type - 0) {
        case 0:
          let e = this.eList.find(item => item.goods_id === this.result_id)
          name = e ? e.name : this.name
          break
        case 1:
          let g = this.gList.find(item => item.group_id === this.result_id)
          name = g ? g.name : this.name
          break
        case 2:
          let s = this.sList.find(item => item.appoint_id === this.result_id)
          name = s ? s.appoint_name : this.name
          break
        // case 3:
        //   let p = this.pList.find(item => item.meal_id === this.result_id)
        //   img = p && p.pic
        //   break
        case 4:
          let p = this.pList.find(item => item.package_id === this.result_id)
          name = p ? p.name : this.name
          break
      }
      return name
    },
    _commodityImg() {
      let img
      switch (this.result_type - 0) {
        case 0:
          let e = this.eList.find(item => item.goods_id === this.result_id)
          img = e && e.list_pic
          break
        case 1:
          let g = this.gList.find(item => item.group_id === this.result_id)
          img = g && g.list_pic
          break
        case 2:
          let s = this.sList.find(item => item.appoint_id === this.result_id)
          img = s && s.pic
          break
        // case 3:
        //   let p = this.pList.find(item => item.meal_id === this.result_id)
        //   img = p && p.pic
        //   break
        case 4:
          let p = this.pList.find(item => item.package_id === this.result_id)
          img = p && p.pic
          break
      }
      return img || this.cacheImg
    },
    _commodityType() {
      let type
      switch (this.result_type - 0) {
        case 0:
          type = '零售'
          break
        case 1:
          type = '团购'
          break
        case 2:
          type = '服务'
          break
        // case 3:
        //   type = '次卡'
        //   break
        case 4:
          type = '套餐'
          break
      }
      return type
    },
  },

  watch: {
    id() {
      this.result_id = this.id
    },
    type() {
      this.result_type = this.type
    },
  },

  created() {},

  mounted() {
    this._eOnRefresh()
    this._gOnRefresh()
    this._sOnRefresh()
    this._pOnRefresh()
  },

  destroyed() {},

  methods: {
    ...mapActions('commodity', ['getECommerceList', 'getGroupBuyList', 'getServiceList', 'getPackageList']),
    _eOnRefresh() {
      const { id } = this.$route.params
      this.getECommerceList({ page: 1 }).then(res => {
        this.ePage = 2
        this.eList = res.lists
        this.eRefreshing = false
        if (res.lists.length < 10) {
          this.eFinished = true
        } else {
          this.eFinished = false
        }
      })
    },
    _eOnLoad() {
      const { id } = this.$route.params
      this.getECommerceList({ page: this.ePage }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.eFinished = true
        } else {
          this.ePage += 1
        }
        this.eList.push(...res.lists)
      })
    },
    _gOnRefresh() {
      const { id } = this.$route.params
      this.getGroupBuyList().then(res => {
        this.gPage = 2
        this.gList = res.lists
        this.gRefreshing = false
        if (res.lists.length < 10) {
          this.gFinished = true
        } else {
          this.gFinished = false
        }
      })
    },
    _gOnLoad() {
      const { id } = this.$route.params
      this.getGroupBuyList(this.gPage).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.gFinished = true
        } else {
          this.gPage += 1
        }
        this.gList.push(...res.lists)
      })
    },
    _sOnRefresh() {
      const { id } = this.$route.params
      this.getServiceList({ page: 1 }).then(res => {
        this.sPage = 2
        this.sList = res
        this.sRefreshing = false
        if (res.length < 10) {
          this.sFinished = true
        } else {
          this.sFinished = false
        }
      })
    },
    _sOnLoad() {
      const { id } = this.$route.params
      this.getServiceList({ page: this.sPage }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.sFinished = true
        } else {
          this.sPage += 1
        }
        this.sList.push(...res)
      })
    },
    _pOnRefresh() {
      const { id } = this.$route.params
      this.getPackageList({ page: 1 }).then(res => {
        this.pPage = 2
        this.pList = res
        this.pRefreshing = false
        if (res.length < 10) {
          this.pFinished = true
        } else {
          this.pFinished = false
        }
      })
    },
    _pOnLoad() {
      const { id } = this.$route.params
      this.getPackageList({ page: this.pPage }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.pFinished = true
        } else {
          this.pPage += 1
        }
        this.pList.push(...res)
      })
    },
    _controlCommodityPopup() {
      this.showCommodityPopup = !this.showCommodityPopup
    },
    _addCommodity() {
      this.showCommodityPopup = true
    },
    _selectCommodity(id, type) {
      this.result_id = id
      this.result_type = type
      this.pickCommodity(id, type)
    },
  },
}
</script>

<style lang="less" scoped>
.van-popup {
  height: 100vh;
  .van-list {
    padding-bottom: 44px;
  }

  .close-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .van-image {
    width: 60px;
    height: 60px;
    margin-right: 5px;
  }
}

.van-cell__left-icon {
  font-size: 60px;
  height: 60px;
}
</style>
