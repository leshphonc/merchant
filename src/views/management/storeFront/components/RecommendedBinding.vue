<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="推荐商品绑定"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs v-model="active">
      <van-tab title="商品">
        <van-panel :icon="item.image" :key="index" :title="item.name" v-for="(item, index) in bindCList">
          <van-row>
            <van-col :span="12">
              <div :key="index2" v-for="(item2, index2) in item.bind_goods_list">{{ item2.name }}</div>
              <div v-if="item.bind_goods_list.length === 0">暂未绑定零售商品</div>
            </van-col>
            <van-col :span="12">
              <div :key="index2" v-for="(item2, index2) in item.bind_appoint_list">{{ item2.name }}</div>
              <div v-if="item.bind_appoint_list.length === 0">暂未绑定服务</div>
            </van-col>
          </van-row>
          <template #footer>
            <van-button
              @click="_controlCommodityPopup(item.goods_id, item.bind_goods_list, 1)"
              size="small"
              type="primary"
            >
              绑定零售商品
            </van-button>
            <van-button
              @click="_controlServicePopup(item.goods_id, item.bind_appoint_list, 1)"
              size="small"
              type="primary"
            >
              绑定服务项目
            </van-button>
          </template>
        </van-panel>
      </van-tab>
      <van-tab title="服务">
        <van-panel :icon="item.image" :key="index" :title="item.name" v-for="(item, index) in bindSList">
          <van-row>
            <van-col :span="12">
              <div :key="index2" v-for="(item2, index2) in item.bind_goods_list">{{ item2.name }}</div>
              <div v-if="item.bind_goods_list.length === 0">暂未绑定零售商品</div>
            </van-col>
            <van-col :span="12">
              <div :key="index2" v-for="(item2, index2) in item.bind_appoint_list">{{ item2.name }}</div>
              <div v-if="item.bind_appoint_list.length === 0">暂未绑定服务</div>
            </van-col>
          </van-row>
          <template #footer>
            <van-button
              @click="_controlCommodityPopup(item.appoint_id, item.bind_goods_list, 2)"
              size="small"
              type="primary"
            >
              绑定零售商品
            </van-button>
            <van-button
              @click="_controlServicePopup(item.appoint_id, item.bind_appoint_list, 2)"
              size="small"
              type="primary"
            >
              绑定服务项目
            </van-button>
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
              @click="toggleC(index, item.goods_id)"
              clickable
              v-for="(item, index) in cList"
            >
              <van-checkbox
                :name="item.goods_id"
                :disabled="curID == item.goods_id"
                ref="checkboxesC"
                slot="right-icon"
              />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-list>
      <div class="btn-group">
        <van-button @click="_controlCommodityPopup()" class="close-btn">关闭</van-button>
        <van-button @click="_bindCommodity" class="add-btn" type="primary">确认</van-button>
      </div>
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
              @click="toggleS(index, item.appoint_id)"
              clickable
              v-for="(item, index) in sList"
            >
              <van-checkbox
                :name="item.appoint_id"
                :disabled="curID == item.appoint_id"
                ref="checkboxesS"
                slot="right-icon"
              />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-list>
      <div class="btn-group">
        <van-button @click="_controlServicePopup()" class="close-btn">关闭</van-button>
        <van-button @click="_bindService" class="add-btn" type="primary">确认</van-button>
      </div>
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
      curID: '',
      curType: '',
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
      // 'getBindingCommodityList',
      // 'getBindingServiceList',
      'commodityBindService',
      'serviceBindCommodity',
      'bindRecommend',
      'getBindRelation',
    ]),
    ...mapActions('commodity', ['getECommerceList', 'getServiceList']),
    _controlCommodityPopup(id, list, type) {
      if (id) {
        this.curID = id
        this.curType = type
      }
      if (list && list.length) {
        this.cResult = list.map(item => item.id)
      } else {
        this.cResult = []
      }
      this.showCommodityPopup = !this.showCommodityPopup
    },
    _controlServicePopup(id, list, type) {
      if (id) {
        this.curID = id
        this.curType = type
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
      this.getBindRelation({
        store_id: id,
        type: 1,
        page: 1,
        size: 10,
      }).then(res => {
        this.bindCList = res
      })
    },
    _getBindingServiceList() {
      const { id } = this.$route.params
      this.getBindRelation({
        store_id: id,
        type: 2,
        page: 1,
        size: 10,
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
    toggleC(index, id) {
      if (id == this.curID) return
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
    toggleS(index, id) {
      if (id == this.curID) return
      this.$refs.checkboxesS[index].toggle()
    },
    _bindCommodity() {
      if (this.loading) return
      this.loading = true
      const { id } = this.$route.params
      var type = ''
      if (this.curType == 1) {
        type = 1
      } else if (this.curType == 2) {
        type = 3
      }
      this.bindRecommend({
        store_id: id,
        type: type,
        id: this.curID,
        ids: this.cResult,
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
      var type = ''
      if (this.curType == 1) {
        type = 0
      } else if (this.curType == 2) {
        type = 2
      }
      this.bindRecommend({
        store_id: id,
        type: type,
        id: this.curID,
        ids: this.sResult,
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
              this._getBindingServiceList()
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
  .van-list {
    padding-bottom: 44px;
  }

  .btn-group {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 10;

    .van-button {
      width: 50%;
      margin: 0;
    }
  }

  .van-cell__left-icon {
    font-size: 60px;
    height: 60px;
  }
}
</style>
