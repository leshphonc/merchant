<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="_controlCommodityPopup(true)"
      fixed
      left-arrow
      right-text="添加"
      title="店铺下商品管理"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky v-model="active">
      <van-tab title="零售">
        <e-commerce-list ref="ecommerce"></e-commerce-list>
      </van-tab>
      <van-tab title="服务">
        <service-list ref="service"></service-list>
      </van-tab>
      <van-tab title="套餐">
        <package-list ref="package"></package-list>
      </van-tab>
      <van-tab title="组合卡">
        <combination-card-list ref="combinationCard"></combination-card-list>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 -->
    <!-- 绑定产品列表 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCommodityPopup">
      <van-tabs sticky>
        <van-tab title="零售">
          <!-- 零售 -->
          <van-list
            :finished="eFinished"
            :finished-text="eFinishText"
            :immediate-check="false"
            @load="_eOnLoad"
            v-model="loading"
          >
            <van-checkbox-group v-model="eResult">
              <van-cell-group>
                <van-cell
                  :icon="item.list_pic"
                  :key="item.goods_id"
                  :title="item.name"
                  @click="toggleE(index)"
                  clickable
                  v-for="(item, index) in eList"
                >
                  <van-checkbox :name="item.goods_id" ref="checkboxesE" slot="right-icon" />
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
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
            <van-checkbox-group v-model="sResult">
              <van-cell-group>
                <van-cell
                  :icon="item.pic"
                  :key="item.appoint_id"
                  :title="item.appoint_name"
                  @click="toggleS(index)"
                  clickable
                  v-for="(item, index) in sList"
                >
                  <van-checkbox :name="item.appoint_id" ref="checkboxesS" slot="right-icon" />
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
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
            <van-checkbox-group v-model="pResult">
              <van-cell-group>
                <van-cell
                  :icon="item.pic"
                  :key="item.package_id"
                  :title="item.name"
                  @click="toggleP(index)"
                  clickable
                  v-for="(item, index) in pList"
                >
                  <van-checkbox :name="item.package_id" ref="checkboxesP" slot="right-icon" />
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
          </van-list>
        </van-tab>
        <van-tab title="组合卡">
          <!-- 组合卡 -->
          <van-list
            :finished="pFinished"
            :finished-text="pFinishText"
            :immediate-check="false"
            @load="_pOnLoad"
            v-model="loading"
          >
            <van-checkbox-group v-model="pResult">
              <van-cell-group>
                <van-cell
                  :icon="item.pic"
                  :key="item.meal_id"
                  :title="item.meal_name"
                  @click="toggleC(index)"
                  clickable
                  v-for="(item, index) in cList"
                >
                  <van-checkbox :name="item.meal_id" ref="checkboxesC" slot="right-icon" />
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
          </van-list>
        </van-tab>
      </van-tabs>
      <van-button @click="_controlCommodityPopup()" class="close-btn">关闭</van-button>
      <van-button @click="_submit" class="add-btn" type="primary">加入店铺</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ECommerceList from './components/ECommerceBindList'
import ServiceList from './components/ServiceBindList'
import PackageList from './components/PackageBindList'
import CombinationCardList from './components/CombinationCardList'

export default {
  name: 'storeFrontCommodityManagement',

  mixins: [],

  components: {
    ECommerceList,
    ServiceList,
    PackageList,
    CombinationCardList,
  },

  props: {},

  data() {
    return {
      active: 0,
      showCommodityPopup: false,
      eList: [],
      ePage: 1,
      eFinished: false,
      eResult: [],
      sList: [],
      sPage: 1,
      sFinished: false,
      sResult: [],
      pList: [],
      pPage: 1,
      pFinished: false,
      pResult: [],
      cList: [],
      cPage: 1,
      cFinished: false,
      cResult: [],
      loading: false,
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    eFinishText() {
      return this.eList.length ? '没有更多了' : '暂无商品'
    },
    sFinishText() {
      return this.sList.length ? '没有更多了' : '暂无商品'
    },
    pFinishText() {
      return this.pList.length ? '没有更多了' : '暂无商品'
    },
    cFinishText() {
      return this.cList.length ? '没有更多了' : '暂无商品'
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('storeFront', [
      'getStoreFrontUnBindECommerceList',
      'getStoreFrontUnBindServiceList',
      'getStoreFrontUnBindPackageList',
      'getStoreFrontUnBindCombinationCardList',
      'bindECommerceToStoreFront',
      'bindServiceToStoreFront',
      'bindPackageToStoreFront',
      'bindCombinationCardToStoreFront',
    ]),
    _controlCommodityPopup(flag) {
      if (flag) {
        this._eOnRefresh()
        this._sOnRefresh()
        this._pOnRefresh()
        this._cOnRefresh()
      }
      this.eResult = []
      this.sResult = []
      this.pResult = []
      this.cResult = []
      this.showCommodityPopup = !this.showCommodityPopup
    },
    _eOnRefresh() {
      const { id } = this.$route.params
      this.getStoreFrontUnBindECommerceList({
        store_id: id,
        page: 1,
      }).then(res => {
        this.ePage = 2
        this.eList = res
        this.eResult = []
        if (res.length < 10) {
          this.eFinished = true
        } else {
          this.eFinished = false
        }
      })
    },
    _eOnLoad() {
      const { id } = this.$route.params
      this.getStoreFrontUnBindECommerceList({
        store_id: id,
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
    toggleE(index) {
      this.$refs.checkboxesE[index].toggle()
    },
    _sOnRefresh() {
      const { id } = this.$route.params
      this.getStoreFrontUnBindServiceList({
        store_id: id,
        page: 1,
      }).then(res => {
        this.sPage = 2
        this.sList = res
        this.sResult = []
        if (res.length < 10) {
          this.sFinished = true
        } else {
          this.sFinished = false
        }
      })
    },
    _sOnLoad() {
      const { id } = this.$route.params
      this.getStoreFrontUnBindServiceList({
        store_id: id,
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
    toggleS(index) {
      this.$refs.checkboxesS[index].toggle()
    },
    _pOnRefresh() {
      const { id } = this.$route.params
      this.getStoreFrontUnBindPackageList({
        store_id: id,
        page: 1,
      }).then(res => {
        this.pPage = 2
        this.pList = res
        this.pResult = []
        if (res.length < 10) {
          this.pFinished = true
        } else {
          this.pFinished = false
        }
      })
    },
    _pOnLoad() {
      const { id } = this.$route.params
      this.getStoreFrontUnBindPackageList({
        store_id: id,
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
    toggleP(index) {
      this.$refs.checkboxesP[index].toggle()
    },
    _cOnRefresh() {
      const { id } = this.$route.params
      this.getStoreFrontUnBindCombinationCardList({
        store_id: id,
        page: 1,
      }).then(res => {
        this.cPage = 2
        this.cList = res
        this.cResult = []
        if (res.length < 10) {
          this.cFinished = true
        } else {
          this.cFinished = false
        }
      })
    },
    _cOnLoad() {
      const { id } = this.$route.params
      this.getStoreFrontUnBindCombinationCardList({
        store_id: id,
        page: this.cPage,
      }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.cFinished = true
        } else {
          this.cPage += 1
        }
        this.cList.push(...res)
      })
    },
    toggleC(index) {
      this.$refs.checkboxesC[index].toggle()
    },
    _submit() {
      if (!this.eResult.length && !this.sResult.length && !this.pResult.length) return
      if (this.loading) return
      this.loading = true
      const { id } = this.$route.params
      const promiseArr = []
      if (this.eResult.length) {
        promiseArr.push(
          this.bindECommerceToStoreFront({
            store_id: id,
            goods_ids: JSON.stringify(this.eResult),
          })
        )
      }
      if (this.sResult.length) {
        promiseArr.push(
          this.bindServiceToStoreFront({
            store_id: id,
            appoint_ids: JSON.stringify(this.sResult),
          })
        )
      }
      if (this.pResult.length) {
        promiseArr.push(
          this.bindPackageToStoreFront({
            store_id: id,
            package_ids: JSON.stringify(this.pResult),
          })
        )
      }
      if (this.cResult.length) {
        promiseArr.push(
          this.bindCombinationCardToStoreFront({
            store_id: id,
            meal_ids: JSON.stringify(this.cResult),
          })
        )
      }
      Promise.all(promiseArr)
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this._controlCommodityPopup()
              if (this.$refs.ecommerce) {
                this.$refs.ecommerce._onRefresh()
              }
              if (this.$refs.service) {
                this.$refs.service._onRefresh()
              }
              if (this.$refs.package) {
                this.$refs.package._onRefresh()
              }
              if (this.$refs.combinationCard) {
                this.$refs.combinationCard._onRefresh()
              }
              this.loading = false
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
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

.van-cell__left-icon {
  font-size: 60px;
  height: 60px;
}
</style>
