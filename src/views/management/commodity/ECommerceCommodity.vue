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
      <div class="white-space"></div>
      <van-cell @click="_controlCategoryCRUPopup" center clickable title="新增分类">
        <van-icon class="add-icon" color="#1989fa" name="add" slot="icon" />
      </van-cell>
      <div class="white-space"></div>
      <van-collapse accordion v-model="activeCategory">
        <van-collapse-item
          :key="item.sort_id"
          :name="item.sort_id"
          :title="item.sort_name"
          v-for="item in firstCategoryList"
        >
          <div v-if="!item.children.length">暂无分类</div>
          <van-tag
            :key="child.sort_id"
            @close="_deleteCategory(1)"
            closeable
            size="medium"
            type="primary"
            v-for="child in item.children"
          >分1类1</van-tag>
        </van-collapse-item>
      </van-collapse>
    </div>
    <van-tabbar @change="_changeTab" fixed v-model="active">
      <van-tabbar-item icon="apps-o">商品</van-tabbar-item>
      <van-tabbar-item icon="label-o">分类</van-tabbar-item>
    </van-tabbar>
    <van-popup class="category-cru-popup" position="bottom" v-model="showCategoryCRUPopup">
      <van-cell-group>
        <van-field label="分类名称" placeholder="请填写分类名称"></van-field>
        <van-field @click="_controlCategoryPicker" input-align="right" is-link label="分类归属" placeholder="无" readonly></van-field>
      </van-cell-group>
      <div class="white-space-lg"></div>
      <div class="wing-blank-lg">
        <van-button @click="_controlCategoryCRUPopup">取消</van-button>
        <van-button type="primary">保存</van-button>
      </div>
    </van-popup>
    <van-popup position="bottom" v-model="showCategoryPicker">
      <van-picker :columns="columns" />
    </van-popup>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      page: 1,
      active: 0,
      activeCategory: '',
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
    finishText() {
      return this.list.length ? '没有更多了' : ''
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
              this.deleteECommerceCommodity({ store_id, goods_id }).then(res => {
                if (res) {
                  this.$toast.success({
                    message: '删除成功',
                    duration: 800,
                    onClose: () => {
                      this._onRefresh()
                    },
                  })
                  done()
                }
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
    // 删除子分类分类
    _deleteCategory(id) {
      console.log(id)
    },
    // 更改vuex中的变量
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
        this.firstCategoryList = res
        res.forEach(item => {
          this.getECommerceCommoditySecondCategoryList(item.sort_id).then(res => {
            item.children = res.twoCate
          })
        })
      })
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
</style>
