<template>
  <div>
    <div v-if="active === 0">
      <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
        <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
          <van-card
            :key="item.goods_id"
            :price="item.old_price"
            :tag="item.payment_status === '1' ? '定金' : null"
            :thumb="item.pic"
            :title="item.appoint_name"
            lazy-load
            v-for="item in list"
          >
            <div slot="tags">
              <van-tag plain type="danger">
                <van-icon name="tosend" />
                {{ item.appoint_date_num }}天
              </van-tag>
              <van-tag plain type="danger">
                <van-icon name="clock-o" />
                {{ item.expend_time }}分钟
              </van-tag>
              <van-tag plain type="danger">
                <van-icon name="flag-o" />
                {{ item.appoint_type === '0' ? '到店' : '上门' }}
              </van-tag>
            </div>
            <div slot="bottom">
              <div v-if="item.payment_status === '1'">定金：¥{{ item.payment_money }}</div>
              <div>预约开始: {{ $moment(item.start_time * 1000).format('YYYY-MM-DD HH:mm') }}</div>
              <div>预约结束: {{ $moment(item.end_time * 1000).format('YYYY-MM-DD HH:mm') }}</div>
              <div class="white-space"></div>
            </div>
            <div slot="footer" v-if="$route.fullPath === '/commodity'">
              <van-button @click="_deleteCommodity(item.appoint_id)" size="small" type="danger">删除</van-button>
              <van-button :to="`/commodity/serviceSalesRecord/${item.appoint_id}`" size="small">销售记录</van-button>
              <van-button :to="`/commodity/servicePreferential/${item.appoint_id}`" size="small">优惠</van-button>
              <van-button :to="`/commodity/serviceCRU/${item.appoint_id}`" size="small">编辑</van-button>
            </div>
            <div slot="footer" v-else>
              <van-button :to="`/reward/serviceReward/${item.appoint_id}`" size="small" type="primary"
                >推广分佣设置</van-button
              >
            </div>
          </van-card>
        </van-list>
      </van-pull-refresh>
      <van-divider :hairline="false" v-show="!loading && !list.length && $route.fullPath === '/commodity'"
        >点击右上角创建服务</van-divider
      >
    </div>
    <div v-if="active === 1">
      <van-sticky :offset-top="offsetTop">
        <div style="background-color: #f5f5f9;">
          <div class="white-space"></div>
          <van-cell @click="_controlCategoryCRUPopup" center clickable title="新增分类">
            <van-icon class="add-icon" color="#1989fa" name="add" slot="icon" />
          </van-cell>
          <div class="white-space"></div>
        </div>
      </van-sticky>
      <van-collapse accordion v-model="activeCategory">
        <van-collapse-item
          :key="item.cat_id"
          :name="item.cat_id"
          :title="item.cat_name"
          v-for="item in firstCategoryList"
        >
          <div @click.stop="_deleteCategory(item.cat_id, 1)" slot="icon" v-show="navText[3] === '取消'">
            <van-icon class="delete-icon" name="close" />
          </div>
          <div v-if="!item.children.length">暂无分类</div>
          <van-tag
            :closeable="navText[3] === '取消'"
            :key="child.cat_id"
            @close="_deleteCategory(child.cat_id, 2)"
            size="medium"
            type="primary"
            v-for="child in item.children"
          >
            <div>{{ child.cat_name }}</div>
          </van-tag>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="tab-bar-holder-sp" v-if="$route.fullPath === '/commodity'"></div>
    <van-tabbar @change="_changeTab" fixed v-if="$route.fullPath === '/commodity'" v-model="active">
      <van-tabbar-item icon="apps-o">服务</van-tabbar-item>
      <van-tabbar-item icon="label-o">分类</van-tabbar-item>
    </van-tabbar>
    <van-popup class="category-cru-popup" position="bottom" safe-area-inset-bottom v-model="showCategoryCRUPopup">
      <ValidationObserver @submit.prevent="_submit" ref="observer" tag="form" v-slot="{ invalid }">
        <van-cell-group>
          <ValidationProvider name="分类名称" rules="required" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="分类名称"
              placeholder="请填写分类名称"
              required
              v-model="formData.cat_name"
            ></van-field>
          </ValidationProvider>
          <van-field
            :placeholder="categoryLabel"
            @click="_controlCategoryPicker"
            input-align="right"
            is-link
            label="分类归属"
            readonly
          ></van-field>
        </van-cell-group>
        <div class="white-space-lg"></div>
        <div class="wing-blank-lg">
          <van-button @click="_controlCategoryCRUPopup" native-type="button">取消</van-button>
          <van-button native-type="submit" type="primary">保存</van-button>
        </div>
      </ValidationObserver>
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCategoryPicker">
      <van-picker :columns="firstCategoryListAddNull" @change="_changeCategory" value-key="cat_name" />
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'service',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        cat_name: '',
        cat_fid: '0',
      },
      list: [],
      page: 1,
      active: 0,
      activeCategory: '',
      categoryLabel: '无',
      loading: false,
      finished: false,
      refreshing: false,
      firstCategoryList: [],
      showCategoryCRUPopup: false,
      showCategoryPicker: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
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
    firstCategoryListAddNull() {
      const arr = JSON.parse(JSON.stringify(this.firstCategoryList))
      arr.unshift({
        cat_id: '0',
        cat_name: '无',
        children: [],
      })
      return arr
    },
  },

  watch: {},

  created() {},

  mounted() {
    // 服务商品一级分类
    this._getServiceCategoryList()
  },

  destroyed() {},

  methods: {
    ...mapMutations('commodity', ['changeRightText']),
    ...mapActions('commodity', [
      'getServiceList',
      'deleteService',
      'getServiceCategoryList',
      'createServiceCategory',
      'deleteServiceCategory',
    ]),
    // 分类编辑开关
    _controlCategoryCRUPopup() {
      this.showCategoryCRUPopup = !this.showCategoryCRUPopup
      this.$nextTick(() => {
        this.$refs.observer.reset()
      })
    },
    // 分类归属开关
    _controlCategoryPicker() {
      this.showCategoryPicker = !this.showCategoryPicker
    },
    // 异步更新服务商品数据
    _onLoad() {
      this.getServiceList(this.page).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res)
      })
    },
    // 刷新服务商品列表
    _onRefresh() {
      this.getServiceList().then(res => {
        this.page = 2
        this.list = res
        this.refreshing = false
        this.finished = false
      })
    },
    // 删除服务产品
    _deleteCommodity(app_id) {
      this.$dialog
        .confirm({
          title: '删除',
          message: '删除后无法恢复，是否继续',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              this.deleteService(app_id)
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
    // 删除分类
    _deleteCategory(id, type) {
      // type：1<Number> 1级分类
      // type：2<Number> 2级分类
      this.$dialog
        .confirm({
          title: '删除',
          message: '删除后无法恢复，是否继续',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              this.deleteServiceCategory({ cat_id: id, type })
                .then(() => {
                  this.$toast.success({
                    message: '删除成功',
                    duration: 800,
                    onClose: () => {
                      this._getServiceCategoryList()
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
    // 更改vuex中的变量，判断当前分类是不是管理状态
    _changeTab(tabIndex) {
      this.changeRightText({
        index: 3,
        text: tabIndex ? '管理' : '创建',
      })
    },
    // 获取服务商品一级分类
    _getServiceCategoryList() {
      this.getServiceCategoryList().then(res => {
        this.firstCategoryList = res
      })
    },
    // 分类归属变更
    _changeCategory(picker, item) {
      this.formData.cat_fid = item.cat_id
      this.categoryLabel = item.cat_name
    },
    // 格式化时间
    _formatData(data) {
      return this.$moment(data * 1000).format('YYYY-MM-DD HH:mm')
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
        this.createServiceCategory(this.formData)
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this._getServiceCategoryList()
                this._controlCategoryCRUPopup()
                this.formData = {
                  cat_name: '',
                  cat_fid: '0',
                }
                this.$nextTick(() => {
                  this.$refs.observer.reset()
                })
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
.van-tag {
  .van-icon {
    margin-right: 4px;
  }
}

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
</style>
