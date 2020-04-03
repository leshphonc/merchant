<template>
  <div>
    <div v-if="active === 0">
      <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
        <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
          <van-card
            :key="item.goods_id"
            :num="item.stock_num === '-1' ? '∞' : item.stock_num - item.sell_count"
            :origin-price="item.old_price"
            :price="item.price"
            :tag="_goodsType(item.goods_type)"
            :thumb="item.list_pic"
            :title="item.s_name"
            lazy-load
            v-for="item in list"
          >
            <div slot="tags">
              <van-tag plain type="danger">{{ item.freight_type === '1' ? '运费单独计算' : '运费最大值' }}</van-tag>
            </div>
            <div slot="footer" v-if="$route.fullPath === '/commodity'">
              <!-- <van-button @click="_deleteCommodity(item.store_id, item.goods_id)" size="small" type="danger"
                >删除</van-button
              >-->
              <van-button :to="`/commodity/serviceSalesRecord/${item.appoint_id}`" size="small">销售记录</van-button>
              <van-button :to="`/commodity/eCommercePreferential/${item.goods_id}`" size="small">优惠</van-button>
              <van-button :to="`/commodity/eCommerceCRU/${item.goods_type}/${item.goods_id}`" size="small"
                >编辑</van-button
              >
            </div>
            <div slot="footer" v-else>
              <van-button :to="`/reward/eCommerceReward/${item.goods_id}`" size="small" type="primary"
                >推广分佣设置</van-button
              >
            </div>
          </van-card>
        </van-list>
      </van-pull-refresh>
      <van-divider :hairline="false" v-show="!loading && !list.length && $route.fullPath === '/commodity'"
        >点击右上角创建商品</van-divider
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
          :key="item.sort_id"
          :name="item.sort_id"
          :title="item.sort_name"
          v-for="item in firstCategoryList"
        >
          <div @click.stop="_deleteCategory(item.sort_id, 1)" slot="icon" v-show="navText[0] === '取消'">
            <van-icon class="delete-icon" name="close" />
          </div>
          <div v-if="!item.children.length">暂无分类</div>
          <van-tag
            :closeable="navText[0] === '取消'"
            :key="child.sort_id"
            @close="_deleteCategory(child.sort_id, 2)"
            size="medium"
            type="primary"
            v-for="child in item.children"
          >
            <div>{{ child.sort_name }}</div>
          </van-tag>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="tab-bar-holder-sp" v-if="$route.fullPath === '/commodity'"></div>
    <van-tabbar @change="_changeTab" fixed v-if="$route.fullPath === '/commodity'" v-model="active">
      <van-tabbar-item icon="apps-o">商品</van-tabbar-item>
      <van-tabbar-item icon="label-o">分类</van-tabbar-item>
    </van-tabbar>
    <!-- 弹出层 -->
    <!-- 编辑分类 -->
    <van-popup class="category-cru-popup" position="bottom" safe-area-inset-bottom v-model="showCategoryCRUPopup">
      <ValidationObserver @submit.prevent="_submit" ref="observer" tag="form" v-slot="{ invalid }">
        <van-cell-group>
          <ValidationProvider name="分类名称" rules="required" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="分类名称"
              placeholder="请填写分类名称"
              required
              v-model="formData.name"
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
          <van-cell title="开启周几显示">
            <van-switch active-value="1" inactive-value="0" v-model="formData.is_week" />
          </van-cell>
          <van-cell v-if="formData.is_week === '1'">
            <van-checkbox-group :max="2" v-model="formData.week">
              <van-checkbox :key="item.value" :name="index + 1" shape="square" v-for="(item, index) in week">
                {{ item.label }}
              </van-checkbox>
            </van-checkbox-group>
          </van-cell>
        </van-cell-group>
        <div class="white-space-lg"></div>
        <div class="wing-blank-lg">
          <van-button @click="_controlCategoryCRUPopup" native-type="button">取消</van-button>
          <van-button native-type="submit" type="primary">保存</van-button>
        </div>
      </ValidationObserver>
    </van-popup>
    <!-- 选择分类归属 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCategoryPicker">
      <van-picker
        :columns="firstCategoryListAddNull"
        @change="_changeCategory"
        ref="catePicker"
        value-key="sort_name"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'eCommerce',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        name: '',
        sort: 1,
        week: [],
        is_week: '0',
        fid: '0',
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
      week: [
        {
          label: '周一',
        },
        {
          label: '周二',
        },
        {
          label: '周三',
        },
        {
          label: '周四',
        },
        {
          label: '周五',
        },
        {
          label: '周六',
        },
        {
          label: '周日',
        },
      ],
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
        sort_id: '0',
        sort_name: '无',
      })
      return arr
    },
  },

  watch: {},

  created() {},

  mounted() {
    // 零售商品一级分类
    this._getECommerceFirstCategoryList()
  },

  destroyed() {},

  methods: {
    ...mapMutations('commodity', ['changeRightText']),
    ...mapActions('commodity', [
      'getECommerceList',
      'deleteECommerce',
      'getECommerceFirstCategoryList',
      'createECommerceCategory',
      'deleteECommerceCategory',
    ]),
    // 分类编辑开关
    _controlCategoryCRUPopup() {
      this.showCategoryCRUPopup = !this.showCategoryCRUPopup
      this.$nextTick(() => {
        this.$refs.observer.reset()
        this.categoryLabel = '无'
        this.$refs.catePicker && this.$refs.catePicker.setIndexes([0])
      })
    },
    // 分类归属开关
    _controlCategoryPicker() {
      this.showCategoryPicker = !this.showCategoryPicker
    },
    // 刷新零售商品列表
    _onRefresh() {
      this.getECommerceList().then(res => {
        this.page = 2
        this.list = res.lists
        this.refreshing = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.finished = false
        }
      })
    },
    // 异步更新零售商品数据
    _onLoad() {
      this.getECommerceList(this.page).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.lists)
      })
    },
    // 删除零售产品
    _deleteCommodity(store_id, goods_id) {
      this.$dialog
        .confirm({
          title: '删除',
          message: '删除后无法恢复，是否继续',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              this.deleteECommerce({ store_id, goods_id })
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
              this.deleteECommerceCategory({ sort_id: id, type })
                .then(() => {
                  this.$toast.success({
                    message: '删除成功',
                    duration: 800,
                    onClose: () => {
                      this._getECommerceFirstCategoryList()
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
    _goodsType(type) {
      if (type === '0') {
        return '配送'
      } else if (type === '1') {
        return '虚拟'
      } else {
        return '到店'
      }
    },
    // 更改vuex中的变量，判断当前分类是不是管理状态
    _changeTab(tabIndex) {
      this.changeRightText({
        index: 0,
        text: tabIndex ? '管理' : '创建',
      })
    },
    // 获取零售商品一级分类
    _getECommerceFirstCategoryList() {
      this.getECommerceFirstCategoryList().then(res => {
        this.firstCategoryList = res
      })
    },
    // 分类归属变更
    _changeCategory(picker, item) {
      this.formData.fid = item.sort_id
      this.categoryLabel = item.sort_name
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
        const params = JSON.parse(JSON.stringify(this.formData))
        params.week = params.week.join()
        if (params.is_week === '1' && !params.week) {
          this.$notify({
            type: 'warning',
            message: '请勾选要显示的日期',
          })
          this.loading = false
          return false
        }
        this.createECommerceCategory(params)
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this._getECommerceFirstCategoryList()
                this._controlCategoryCRUPopup()
                this.formData = {
                  name: '',
                  sort: 1,
                  week: [],
                  is_week: '0',
                  fid: '0',
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
