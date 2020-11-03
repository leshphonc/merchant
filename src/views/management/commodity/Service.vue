<template>
  <div>
    <div v-if="active === 0">
      <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
        <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
          <van-card
            :key="item.goods_id"
            :origin-price="item.show_price"
            :price="item.old_price"
            :tag="item.payment_status === '1' ? '定金' : null"
            :thumb="item.list_pic"
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
              <!-- <van-button @click="_deleteCommodity(item.appoint_id)" size="small" type="danger">删除</van-button> -->
              <van-button
                @click="_changeGoodStatus(item.appoint_id, item.status)"
                size="small"
                type="danger"
                v-if="item.status == 0"
              >
                停售
              </van-button>
              <van-button @click="_changeGoodStatus(item.appoint_id, item.status)" size="small" type="primary" v-else>
                启售
              </van-button>
              <van-button :to="`/commodity/serviceSalesRecord/${item.appoint_id}`" size="small">销售记录</van-button>
              <van-button :to="`/commodity/servicePreferential/${item.appoint_id}`" size="small">优惠</van-button>
              <van-button :to="`/commodity/serviceCRU/${item.appoint_id}`" size="small">编辑</van-button>
            </div>
            <div slot="footer" v-else>
              <van-button :to="`/reward/serviceReward/${item.appoint_id}`" size="small" type="primary">
                推广分佣设置
              </van-button>
            </div>
          </van-card>
        </van-list>
      </van-pull-refresh>
      <van-divider :hairline="false" v-show="!loading && !list.length && $route.fullPath === '/commodity'">
        点击右上角创建服务
      </van-divider>
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
        <van-collapse-item :key="item.cat_id" :name="item.cat_id" v-for="item in firstCategoryList">
          <div slot="title">
            {{ item.cat_name }}
            <van-button @click.stop="modifyCategory(item)" size="mini" style="margin-left: 10px;">
              编辑
            </van-button>
          </div>
          <div v-if="!item.children.length">暂无分类</div>
          <van-tag
            @click="modifyCategory(child)"
            :key="child.cat_id"
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
    <van-tabbar fixed v-if="$route.fullPath === '/commodity'" v-model="active" safe-area-inset-bottom>
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
            v-show="curId == ''"
            :placeholder="categoryLabel"
            @click="_controlCategoryPicker"
            input-align="right"
            is-link
            label="分类归属"
            readonly
          ></van-field>
        </van-cell-group>
        <div class="white-space-lg"></div>
        <van-button
          style="position:absolute; bottom: 0px; width: 100%;"
          v-if="curId"
          @click="_deleteCategory"
          native-type="button"
          type="danger"
        >
          删除
        </van-button>
        <div class="wing-blank-lg">
          <van-button @click="_controlCategoryCRUPopup" native-type="button">取消</van-button>
          <van-button native-type="submit" type="primary">保存</van-button>
        </div>
      </ValidationObserver>
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCategoryPicker">
      <van-picker ref="catePicker" :columns="firstCategoryListAddNull" @change="_changeCategory" value-key="cat_name" />
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
      loading: false,
      finished: false,
      refreshing: false,
      activeCategory: '',
      categoryLabel: '无',
      firstCategoryList: [],
      showCategoryCRUPopup: false,
      showCategoryPicker: false,
      curId: '',
    }
  },

  computed: {
    ...mapState('commodity'),
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
      'changeCommodityStatus',
    ]),
    // 分类编辑开关
    _controlCategoryCRUPopup() {
      this.showCategoryCRUPopup = !this.showCategoryCRUPopup
      this.$nextTick(() => {
        this.$refs.observer.reset()
        this.categoryLabel = '无'
        this.$refs.catePicker && this.$refs.catePicker.setIndexes([0])
      })
      this.curId = ''
      this.formData = {
        cat_name: '',
        cat_fid: '0',
      }
    },
    modifyCategory(item) {
      this.showCategoryCRUPopup = !this.showCategoryCRUPopup
      this.$nextTick(() => {
        this.$refs.observer.reset()
        this.categoryLabel = '无'
        this.$refs.catePicker && this.$refs.catePicker.setIndexes([0])
      })
      this.curId = item.cat_id
      this.formData = {
        cat_name: item.cat_name,
        cat_fid: item.cat_fid,
      }
    },
    // 分类归属开关
    _controlCategoryPicker() {
      this.showCategoryPicker = !this.showCategoryPicker
    },
    // 切换产品状态
    _changeGoodStatus(id, status) {
      let s = 0
      if (status == 0) {
        s = 1
      }
      this.changeCommodityStatus({ id: id, status: s, model: 'space_appoint' }).then(() => {
        this.$toast.success({
          message: '操作成功',
          duration: 800,
          onClose: () => {
            this._onRefresh()
          },
        })
      })
    },
    // 刷新服务商品列表
    _onRefresh() {
      this.getServiceList({ page: 1, all: 1 }).then(res => {
        this.page = 2
        this.list = res
        this.refreshing = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.finished = false
        }
      })
    },
    // 异步更新服务商品数据
    _onLoad() {
      this.getServiceList({ page: this.page, all: 1 }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res)
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
    _deleteCategory() {
      // type：1<Number> 1级分类
      // type：2<Number> 2级分类
      this.$dialog
        .confirm({
          title: '删除',
          message: '删除后无法恢复，是否继续',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              this.deleteServiceCategory({ cat_id: this.curId, type: this.formData.cat_fid == '0' ? 1 : 2 })
                .then(() => {
                  this.$toast.success({
                    message: '删除成功',
                    duration: 800,
                    onClose: () => {
                      this._getServiceCategoryList()
                      this._controlCategoryCRUPopup()
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
        if (this.curId) {
          this.formData.id = this.curId
        }
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
