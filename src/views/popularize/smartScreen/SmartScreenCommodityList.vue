<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="_addCommodity"
      fixed
      left-arrow
      right-text="添加"
      title="智能屏推广商品"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <!-- 弹出层 -->
    <!-- 绑定产品列表 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCommodityPopup">
      <van-tabs sticky>
        <van-tab title="电商">
          <!-- 电商 -->
          <van-list
            :finished="eFinished"
            :finished-text="eFinishText"
            :immediate-check="false"
            @load="_eOnLoad"
            v-model="loading"
          >
            <van-radio-group v-model="result_id">
              <van-cell-group>
                <van-cell @click="result_id = '1'" clickable title="单选框 1">
                  <van-radio name="1" slot="right-icon" />
                </van-cell>
                <van-cell @click="result_id = '2'" clickable title="单选框 2">
                  <van-radio name="2" slot="right-icon" />
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </van-list>
        </van-tab>
        <van-tab title="团购">
          <!-- 团购 -->
          <van-list
            :finished="gFinished"
            :finished-text="gFinishText"
            :immediate-check="false"
            @load="_gOnLoad"
            v-model="loading"
          >
            <van-radio-group v-model="result_id">
              <van-cell-group>
                <van-cell @click="result_id = '3'" clickable title="单选框 3">
                  <van-radio name="3" slot="right-icon" />
                </van-cell>
                <van-cell @click="result_id = '4'" clickable title="单选框 4">
                  <van-radio name="4" slot="right-icon" />
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </van-list>
        </van-tab>
        <van-tab title="服务">
          <!-- 服务 -->
          <van-list
            :finished="sFinished"
            :finished-text="sFinishText"
            :immediate-check="false"
            @load="_sOnLoad"
            v-model="loading"
          >
            <van-radio-group v-model="result_id">
              <van-cell-group>
                <van-cell @click="result_id = '3'" clickable title="单选框 3">
                  <van-radio name="3" slot="right-icon" />
                </van-cell>
                <van-cell @click="result_id = '4'" clickable title="单选框 4">
                  <van-radio name="4" slot="right-icon" />
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </van-list>
        </van-tab>
        <van-tab title="套餐">
          <!-- 套餐 -->
          <van-list
            :finished="pFinished"
            :finished-text="pFinishText"
            :immediate-check="false"
            @load="_pOnLoad"
            v-model="loading"
          >
            <van-radio-group v-model="result_id">
              <van-cell-group>
                <van-cell @click="result_id = '5'" clickable title="单选框 5">
                  <van-radio name="5" slot="right-icon" />
                </van-cell>
                <van-cell @click="result_id = '6'" clickable title="单选框 6">
                  <van-radio name="6" slot="right-icon" />
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </van-list>
        </van-tab>
      </van-tabs>
      <van-button @click="showCommodityPopup = false" class="close-btn">关闭</van-button>
      <van-button @click="_submit" class="add-btn" type="primary">加入推广</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'smartScreenCommodityList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      active: 0,
      showCommodityPopup: false,
      loading: false,
      result_id: '',
      // 电商
      eList: [],
      ePage: 1,
      eFinished: false,
      // 团购
      gList: [],
      gPage: 1,
      gFinished: false,
      // 服务
      sList: [],
      sPage: 1,
      sFinished: false,
      // 套餐
      pList: [],
      pPage: 1,
      pFinished: false,
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
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', [
      'getNotPopularizedECommerceList',
      'getNotPopularizedGroupList',
      'getNotPopularizedServiceList',
      'getNotPopularizedPackageList',
    ]),
    _eOnRefresh() {
      const { id } = this.$route.params
      this.getNotPopularizedECommerceList({
        imax_id: id,
        page: 1,
      }).then(res => {
        this.ePage = 2
        this.eList = res
        if (res.length < 10) {
          this.eFinished = true
        } else {
          this.eFinished = false
        }
      })
    },
    _eOnLoad() {
      const { id } = this.$route.params
      this.getNotPopularizedECommerceList({
        imax_id: id,
        page: this.ePage,
      }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.eFinished = true
        } else {
          this.ePage += 1
        }
        this.eList.push(...res)
      })
    },
    _gOnRefresh() {
      const { id } = this.$route.params
      this.getNotPopularizedGroupList({
        imax_id: id,
        page: 1,
      }).then(res => {
        this.gPage = 2
        this.gList = res
        if (res.length < 10) {
          this.gFinished = true
        } else {
          this.gFinished = false
        }
      })
    },
    _gOnLoad() {
      const { id } = this.$route.params
      this.getNotPopularizedGroupList({
        imax_id: id,
        page: this.gPage,
      }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.gFinished = true
        } else {
          this.gPage += 1
        }
        this.gList.push(...res)
      })
    },
    _sOnRefresh() {
      const { id } = this.$route.params
      this.getNotPopularizedServiceList({
        imax_id: id,
        page: 1,
      }).then(res => {
        this.sPage = 2
        this.sList = res
        if (res.length < 10) {
          this.sFinished = true
        } else {
          this.sFinished = false
        }
      })
    },
    _sOnLoad() {
      const { id } = this.$route.params
      this.getNotPopularizedServiceList({
        imax_id: id,
        page: this.sPage,
      }).then(res => {
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
      this.getNotPopularizedPackageList({
        imax_id: id,
        page: 1,
      }).then(res => {
        this.pPage = 2
        this.pList = res
        if (res.length < 10) {
          this.pFinished = true
        } else {
          this.pFinished = false
        }
      })
    },
    _pOnLoad() {
      const { id } = this.$route.params
      this.getNotPopularizedPackageList({
        imax_id: id,
        page: this.pPage,
      }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.pFinished = true
        } else {
          this.pPage += 1
        }
        this.pList.push(...res)
      })
    },
    _addCommodity() {
      this.showCommodityPopup = true
    },
    _submit() {
      if (!this.result_id) {
        this.$notify({
          type: 'warning',
          message: '请选择加入推广的商品',
        })
        return
      }
      console.log(this.result_id)
      this.result_id = ''
      this.showCommodityPopup = false
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
    width: 50%;
  }

  .add-btn {
    position: fixed;
    bottom: 0;
    left: 50%;
    width: 50%;
    margin: 0;
  }
}
</style>
