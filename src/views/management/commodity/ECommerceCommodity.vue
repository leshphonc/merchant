<template>
  <div>
    <div v-if="active === 0">
      <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
        <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
          <van-card
            :key="item.goods_id"
            :num="item.stock_num === '-1' ? '∞' : item.stock_num"
            :origin-price="item.old_price"
            :price="item.price"
            :tag="item.statusstr"
            :thumb="item.image"
            :title="item.s_name"
            lazy-load
            v-for="item in list"
          >
            <div slot="tags">
              <van-tag plain type="danger">标签</van-tag>
              <van-tag plain type="danger">标签</van-tag>
            </div>
            <div slot="footer">
              <van-button @click="_deleteCommodity(item.store_id, item.goods_id)" size="small" type="danger">删除</van-button>
              <van-button size="small">优惠</van-button>
              <van-button size="small">编辑</van-button>
            </div>
          </van-card>
        </van-list>
      </van-pull-refresh>
      <van-divider :hairline="false" v-show="!loading && !list.length">点击右上角创建商品</van-divider>
      <div class="tab-bar-holder"></div>
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
    <div class="tab-bar-holder-sp"></div>
    <van-tabbar @change="_changeTab" fixed v-model="active">
      <van-tabbar-item icon="apps-o">商品</van-tabbar-item>
      <van-tabbar-item icon="label-o">分类</van-tabbar-item>
    </van-tabbar>
    <van-popup class="category-cru-popup" position="bottom" v-model="showCategoryCRUPopup">
      <ValidationObserver @submit.prevent="_submit" ref="observer" tag="form" v-slot="{ invalid }">
        <van-cell-group>
          <ValidationProvider name="分类名称" rules="required" slim v-slot="{ errors }">
            <van-field :error-message="errors[0]" label="分类名称" placeholder="请填写分类名称" required v-model="formData.name"></van-field>
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
            <van-switch v-model="formData.is_week" />
          </van-cell>
          <ValidationProvider name="折扣率" rules="required|between:0, 10|decimal-max1" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              @click-right-icon="$toast('0或10代表无折扣，8.5代表85折')"
              label="折扣率"
              placeholder="0 ～ 10 之间的数字，支持小数"
              required
              right-icon="question-o"
              v-model="formData.discount"
            ></van-field>
          </ValidationProvider>
        </van-cell-group>
        <div class="white-space-lg"></div>
        <div class="wing-blank-lg">
          <van-button @click="_controlCategoryCRUPopup" native-type="button">取消</van-button>
          <van-button native-type="submit" type="primary">保存</van-button>
        </div>
      </ValidationObserver>
    </van-popup>
    <van-popup position="bottom" v-model="showCategoryPicker">
      <van-picker :columns="firstCategoryListAddNull" @change="_changeCategory" value-key="sort_name" />
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        name: '',
        sort: 1,
        discount: '',
        week: '',
        is_week: false,
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
        sort_id: '0',
        sort_name: '无',
        children: [],
      })
      return arr
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getECommerceCommodityFirstCategoryList()
  },

  destroyed() {},

  methods: {
    ...mapMutations('commodity', ['changeRightText']),
    ...mapActions('commodity', [
      'getECommerceCommodityList',
      'deleteECommerceCommodity',
      'getECommerceCommodityFirstCategoryList',
      'getECommerceCommoditySecondCategoryList',
      'createECommerceCommodityCategory',
      'deleteECommerceCommodityCategory',
    ]),
    // 分类编辑开关
    _controlCategoryCRUPopup() {
      this.showCategoryCRUPopup = !this.showCategoryCRUPopup
    },
    // 分类归属开关
    _controlCategoryPicker() {
      this.showCategoryPicker = !this.showCategoryPicker
    },
    // 异步更新电商商品数据
    _onLoad() {
      this.getECommerceCommodityList(this.page).then(res => {
        this.loading = false
        if (res.lists.length === 0) {
          this.finished = true
        } else {
          this.page += 1
          this.list.push(...res.lists)
        }
      })
    },
    // 刷新电商商品列表
    _onRefresh() {
      this.getECommerceCommodityList().then(res => {
        this.page = 1
        this.list = res.lists
        this.refreshing = false
      })
    },
    // 删除电商产品
    _deleteCommodity(store_id, goods_id) {
      this.$dialog
        .confirm({
          title: '删除',
          message: '删除后无法恢复，是否继续',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              this.deleteECommerceCommodity({ store_id, goods_id })
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
        .catch(err => {
          console.log(err)
        })
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
              this.deleteECommerceCommodityCategory({ sort_id: id, type })
                .then(() => {
                  this.$toast.success({
                    message: '删除成功',
                    duration: 800,
                    onClose: () => {
                      this._getECommerceCommodityFirstCategoryList()
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
        .catch(err => {
          console.log(err)
        })
    },
    // 更改vuex中的变量，判断当前分类是不是管理状态
    _changeTab(tabIndex) {
      console.log(tabIndex)
      this.changeRightText({
        index: 0,
        text: tabIndex ? '管理' : '创建',
      })
    },
    // 获取电商商品一级分类
    _getECommerceCommodityFirstCategoryList() {
      this.getECommerceCommodityFirstCategoryList().then(res => {
        res.forEach(item => {
          item.children = []
          this.getECommerceCommoditySecondCategoryList(item.sort_id).then(res => {
            item.children = res.twoCate
          })
        })
        this.firstCategoryList = res
      })
    },
    // 分类归属变更
    _changeCategory(picker, item) {
      console.log(item)
      this.formData.fid = item.sort_id
      this.categoryLabel = item.sort_name
    },
    // 提交表单
    async _submit() {
      // 锁
      if (this.loading) return false
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
        this.formData.is_week = this.formData.is_week ? '1' : '0'
        this.createECommerceCommodityCategory(this.formData)
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this._getECommerceCommodityFirstCategoryList()
                this._controlCategoryCRUPopup()
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

.van-switch {
  font-size: 18px !important;
}
</style>
