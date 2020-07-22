<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="推荐商品绑定"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs v-model="active">
      <van-tab title="商品">
        <van-panel :icon="item.image" :key="index" :title="item.name" v-for="(item, index) in bindCList">
          <div :key="index2" v-for="(item2, index2) in item.bind_list">{{ item2.name }}</div>
          <div v-if="item.bind_list.length === 0">暂未绑定任何推广服务</div>
          <template #footer>
            <van-button @click="_controlServicePopup(item.goods_id, item.bind_list)" size="small" type="primary"
              >绑定服务项目</van-button
            >
          </template>
        </van-panel>
      </van-tab>
      <van-tab title="服务">
        <van-panel :icon="item.image" :key="index" :title="item.name" v-for="(item, index) in bindSList">
          <div :key="index2" v-for="(item2, index2) in item.bind_list">{{ item2.name }}</div>
          <div v-if="item.bind_list.length === 0">暂未绑定任何推广商品</div>
          <template #footer>
            <van-button @click="_controlCommodityPopup(item.appoint_id, item.bind_list)" size="small" type="primary"
              >绑定零售商品</van-button
            >
          </template>
        </van-panel>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 -->
    <!-- 绑定零售商品列表 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCommodityPopup">
      <van-list :finished="cFinished" :finished-text="cFinishText" @load="_cOnLoad" v-model="loading">
        <van-checkbox-group v-model="cResult">
          <van-cell-group>
            <van-cell
              :icon="item.list_pic"
              :key="item.goods_id"
              :title="item.name"
              @click="toggleC(index)"
              clickable
              v-for="(item, index) in cList"
            >
              <van-checkbox :name="item.goods_id" ref="checkboxesC" slot="right-icon" />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-list>
      <van-button @click="_controlCommodityPopup()" class="close-btn">关闭</van-button>
      <van-button @click="_bindCommodity" class="add-btn" type="primary">确认</van-button>
    </van-popup>
    <!-- 绑定服务商品列表 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showServicePopup">
      <van-list :finished="sFinished" :finished-text="sFinishText" @load="_sOnLoad" v-model="loading">
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
      <van-button @click="_controlServicePopup()" class="close-btn">关闭</van-button>
      <van-button @click="_bindService" class="add-btn" type="primary">确认</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'recommendedBinding',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      active: 0,
      bindCList: [],
      cList: [],
      cPage: 1,
      cFinished: false,
      cResult: [],
      bindSList: [],
      sList: [],
      sPage: 1,
      sFinished: false,
      sResult: [],
      showCommodityPopup: false,
      showServicePopup: false,
      curCommodityID: '',
      curServiceID: '',
      loading: false,
    }
  },

  computed: {
    cFinishText() {
      return this.cList.length ? '没有更多了' : '暂无商品'
    },
    sFinishText() {
      return this.sList.length ? '没有更多了' : '暂无商品'
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getBindingCommodityList()
    this._getBindingServiceList()
  },

  destroyed() {},

  methods: {
    ...mapActions('storeFront', [
      'getBindingCommodityList',
      'getBindingServiceList',
      'commodityBindService',
      'serviceBindCommodity',
    ]),
    ...mapActions('commodity', ['getECommerceList', 'getServiceList']),
    _controlCommodityPopup(id, list) {
      if (id) {
        this.curServiceID = id
      }
      if (list && list.length) {
        this.cResult = list.map(item => item.id)
      } else {
        this.cResult = []
      }
      this.showCommodityPopup = !this.showCommodityPopup
    },
    _controlServicePopup(id, list) {
      if (id) {
        this.curCommodityID = id
      }
      if (list && list.length) {
        this.sResult = list.map(item => item.id)
      } else {
        this.sResult = []
      }
      this.showServicePopup = !this.showServicePopup
    },
    _getBindingCommodityList() {
      const { id } = this.$route.params
      this.getBindingCommodityList({
        store_id: id,
        page: 1,
      }).then(res => {
        this.bindCList = res
      })
    },
    _getBindingServiceList() {
      const { id } = this.$route.params
      this.getBindingServiceList({
        store_id: id,
        page: 1,
      }).then(res => {
        this.bindSList = res
      })
    },
    _cOnRefresh() {
      const { id } = this.$route.params
      this.getECommerceList({ page: 1 }).then(res => {
        this.cPage = 2
        this.cList = res.lists
        this.cResult = []
        if (res.lists.length < 10) {
          this.cFinished = true
        } else {
          this.cFinished = false
        }
      })
    },
    _cOnLoad() {
      const { id } = this.$route.params
      this.getECommerceList({ page: this.cPage }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.cFinished = true
        } else {
          this.cPage += 1
        }
        this.cList.push(...res.lists)
      })
    },
    toggleC(index) {
      this.$refs.checkboxesC[index].toggle()
    },
    _sOnRefresh() {
      const { id } = this.$route.params
      this.getServiceList({ page: 1 }).then(res => {
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
    toggleS(index) {
      this.$refs.checkboxesS[index].toggle()
    },
    _bindCommodity() {
      if (this.loading) return
      this.loading = true
      const { id } = this.$route.params
      this.commodityBindService({
        store_id: id,
        appoint_id: this.curServiceID,
        goods_ids: this.cResult,
      })
        .then(res => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._getBindingServiceList()
              this._controlCommodityPopup()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    _bindService() {
      if (this.loading) return
      this.loading = true
      const { id } = this.$route.params
      this.serviceBindCommodity({
        store_id: id,
        goods_id: this.curCommodityID,
        appoint_ids: this.sResult,
      })
        .then(res => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._getBindingCommodityList()
              this._controlServicePopup()
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
.van-panel {
  margin-top: 4px;

  .van-panel__content {
    font-size: 14px;
    padding: 14px;
  }
  .van-panel__footer {
    text-align: right;
  }

  .van-cell__left-icon {
    height: auto;
    .van-icon__image {
      width: 3.5em;
      height: 3.5em;
    }
  }
}

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
  .van-cell__left-icon {
    font-size: 60px;
    height: 60px;
  }
}
</style>
