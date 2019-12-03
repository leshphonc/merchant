<template>
  <div>
    <div v-if="active === 0">
      <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
        <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
          <van-card
            :key="item.group_id"
            :num="item.count_num - item.sale_count"
            :origin-price="item.old_price"
            :price="item.price"
            :tag="_getGroupBuyStatus(item)"
            :thumb="item.list_pic"
            :title="item.s_name"
            lazy-load
            v-for="item in list"
          >
            <div slot="tags">
              <van-tag plain type="danger">{{ item.status === '1' ? '开启状态' : '关闭状态' }}</van-tag>
            </div>
            <div slot="footer" v-if="$route.fullPath === '/commodity'">
              <van-button :to="`/order/groupBuyList/${item.group_id}`" size="small">订单列表</van-button>
              <van-button :to="`/commodity/groupBuyPreferential/${item.group_id}`" size="small">优惠</van-button>
              <van-button :to="`/commodity/groupBuyCRU/${item.group_id}`" size="small">编辑</van-button>
            </div>
            <div slot="footer" v-else>
              <van-button :to="`/reward/groupBuyReward/${item.group_id}`" size="small" type="primary">推广分佣设置</van-button>
            </div>
          </van-card>
        </van-list>
      </van-pull-refresh>
      <van-divider :hairline="false" v-show="!loading && !list.length && $route.fullPath === '/commodity'">点击右上角创建商品</van-divider>
    </div>
    <div v-if="active === 1">
      <van-sticky :offset-top="offsetTop">
        <div style="background-color: #f5f5f9;">
          <div class="white-space"></div>
          <van-cell @click="_controlPackageCRUPopup" center clickable title="新增团购套餐">
            <van-icon class="add-icon" color="#1989fa" name="add" slot="icon" />
          </van-cell>
          <div class="white-space"></div>
        </div>
      </van-sticky>
      <van-cell :key="item.value" v-for="item in groupBuyPackageList">
        <div @click.stop="_deletePackage(item.value)" slot="icon" v-show="navText[2] === '取消'">
          <van-icon class="delete-icon" name="close" />
        </div>
        {{ item.label }}
      </van-cell>
    </div>
    <div class="tab-bar-holder-sp" v-if="$route.fullPath === '/commodity'"></div>
    <van-tabbar @change="_changeTab" fixed v-if="$route.fullPath === '/commodity'" v-model="active">
      <van-tabbar-item icon="apps-o">商品</van-tabbar-item>
      <van-tabbar-item icon="label-o">团购套餐</van-tabbar-item>
    </van-tabbar>
    <!-- 弹出层 -->
    <!-- 团购套餐创建 -->
    <van-popup class="category-cru-popup" position="bottom" safe-area-inset-bottom v-model="showPackageCRUPopup">
      <ValidationObserver @submit.prevent="_submit" ref="observer" tag="form" v-slot="{ invalid }">
        <van-cell-group>
          <ValidationProvider name="套餐名称" rules="required" slim v-slot="{ errors }">
            <van-field :error-message="errors[0]" label="套餐名称" placeholder="请填写套餐名称" required v-model="formData.title"></van-field>
          </ValidationProvider>
          <ValidationProvider name="套餐简介" rules="required" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              autosize
              label="套餐简介"
              maxlength="100"
              placeholder="请填写套餐简介"
              required
              rows="3"
              show-word-limit
              type="textarea"
              v-model="formData.description"
            ></van-field>
          </ValidationProvider>
        </van-cell-group>
        <div class="white-space-lg"></div>
        <div class="wing-blank-lg">
          <van-button @click="_controlPackageCRUPopup" native-type="button">取消</van-button>
          <van-button native-type="submit" type="primary">保存</van-button>
        </div>
      </ValidationObserver>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'groupBuy',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        title: '',
        description: '',
      },
      list: [],
      page: 1,
      active: 0,
      categoryLabel: '无',
      loading: false,
      finished: false,
      refreshing: false,
      groupBuyPackageList: [],
      showPackageCRUPopup: false,
    }
  },

  computed: {
    ...mapState('commodity', ['navText']),
    finishText() {
      return this.list.length ? '没有更多了' : ''
    },
    offsetTop() {
      return (90 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {
    // 获取团购商品套餐列表
    this._getGroupBuyPackageList()
  },

  destroyed() {},

  methods: {
    ...mapMutations('commodity', ['changeRightText']),
    ...mapActions('commodity', [
      'getGroupBuyList',
      'deleteGroupBuy',
      'getGroupBuyPackageList',
      'createGroupBuyPackage',
      'deleteGroupBuyCategory',
    ]),
    // 团购套餐编辑开关
    _controlPackageCRUPopup() {
      this.showPackageCRUPopup = !this.showPackageCRUPopup
      this.$nextTick(() => {
        this.$refs.observer.reset()
      })
    },
    // 刷新团购商品列表
    _onRefresh() {
      this.getGroupBuyList().then(res => {
        this.page = 2
        this.list = res.lists
        this.refreshing = false
      })
    },
    // 异步更新团购商品数据
    _onLoad() {
      this.getGroupBuyList(this.page).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.lists)
      })
    },
    // 删除团购产品
    _deleteCommodity(store_id, group_id) {
      this.$dialog
        .confirm({
          title: '删除',
          message: '删除后无法恢复，是否继续',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              this.deleteGroupBuy({ store_id, group_id })
                .then(() => {
                  this.$toast.success({
                    message: '删除成功',
                    duration: 800,
                    onClose: () => {
                      this._onRefresh()
                    },
                  })
                  done()
                })
                .catch(() => {
                  done()
                })
            } else {
              done()
            }
          },
        })
        .catch(() => {})
    },
    // 删除团购套餐
    _deletePackage() {
      this.$dialog
        .confirm({
          title: '删除',
          message: '删除后无法恢复，是否继续',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              // this.deleteGroupBuyCategory({ sort_id: id, type })
              //   .then(() => {
              //     this.$toast.success({
              //       message: '删除成功',
              //       duration: 800,
              //       onClose: () => {
              //         this._getGroupBuyPackageList()
              //       },
              //     })
              //     done()
              //   })
              //   .catch(() => {
              //     done()
              //   })
              done()
            } else {
              done()
            }
          },
        })
        .catch(() => {})
    },
    // 更改vuex中的变量，判断当前团购套餐是不是管理状态
    _changeTab(tabIndex) {
      this.changeRightText({
        index: 2,
        text: tabIndex ? '管理' : '创建',
      })
    },
    // 获取团购商品套餐列表
    _getGroupBuyPackageList() {
      this.getGroupBuyPackageList().then(res => {
        res.splice(0, 1)
        this.groupBuyPackageList = res
      })
    },
    // 获取团购状态
    _getGroupBuyStatus(item) {
      let statusText = ''
      if (new Date(item.begin_time * 1000) > new Date()) {
        statusText = '未开团'
      } else if (new Date(item.end_time * 1000) < new Date()) {
        statusText = '已结束'
      } else if (item.type === '3') {
        statusText = '已结束'
      } else if (item.type === '4') {
        statusText = '结束失败'
      } else {
        statusText = '进行中'
      }
      return statusText
    },
    // 提交表单
    async _submit() {
      // 锁
      if (this.loading) return
      // 验证表单
      const isValid = await this.$refs.observer.validate()
      // 表单不完整
      if (!isValid) {
        this.$notify({
          type: 'warning',
          message: '请填写完整信息',
        })
      } else {
        // 加锁
        this.loading = true
        this.createGroupBuyPackage(this.formData)
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this._getGroupBuyPackageList()
                this._controlPackageCRUPopup()
                this.formData = {
                  title: '',
                  description: '',
                }
              },
            })
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.add-icon {
  margin-right: 10px;
  font-size: 18px;
}
.delete-icon {
  margin-right: 5px;
  color: red;
  font-size: 15px;
  vertical-align: -3px;
}

.category-cru-popup {
  height: 80vh;
  background-color: #f2f2f2;

  .van-button {
    width: 50%;
    margin: 0;
  }
}

.van-checkbox {
  display: inline-block;
  /deep/ .van-checkbox__icon {
    display: inline-block;
  }
  /deep/.van-checkbox__label {
    vertical-align: 3px;
    margin-right: 29px;
  }
}
</style>
