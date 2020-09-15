<template>
  <div>
    <van-nav-bar
      :title="`${type}套餐`"
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="套餐名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="套餐名称"
            placeholder="套餐名称"
            required
            v-model.trim="formData.name"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="原价" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="原价"
            placeholder="套餐原价"
            required
            type="number"
            v-model.trim="formData.old_price"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="现价" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="现价"
            placeholder="套餐现价"
            required
            type="number"
            v-model.trim="formData.price"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="查询关键字1" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="查询关键字1"
            placeholder="查询关键字1"
            required
            v-model.trim="keyword1"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="查询关键字2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="查询关键字2"
            placeholder="查询关键字2"
            v-model.trim="keyword2"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="查询关键字3" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="查询关键字3"
            placeholder="查询关键字3"
            v-model.trim="keyword3"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="套餐库存" rules="required|gte-1" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="库存"
            placeholder="套餐库存"
            required
            v-model.trim="formData.stock"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="商家服务分类" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="categoryLabel"
            @click="_controlCategoryPicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="所属分类"
            placeholder="选择分类"
            readonly
            required
          ></van-field>
        </ValidationProvider>
      </van-cell-group>
      <img-cropper :confirm="_pickPic" :list="pic" field="套餐图片" title="套餐图片"></img-cropper>
      <ValidationProvider name="套餐描述" rules="required" slim v-slot="{ errors }">
        <van-field
          :error-message="errors[0]"
          autosize
          label="套餐描述"
          maxlength="100"
          placeholder="套餐描述"
          required
          rows="3"
          show-word-limit
          type="textarea"
          v-model.trim="formData.description"
        />
      </ValidationProvider>
      <van-cell @click="_controlCommodityPicker" clickable title="套餐包含项目">
        <van-icon name="point-gift-o" slot="right-icon" style="line-height: inherit;" />
      </van-cell>
      <!-- 选择出的服务列表 -->
      <van-cell-group :border="false" :key="item.appoint_id" title="服务" v-for="(item, index) in service_data">
        <van-cell center class="sp-cell">
          <span class="delete-icon" slot="icon">
            <van-icon @click="_deletePro(item.appoint_id, index)" name="close" />
            <img :src="item.image" alt />
          </span>
          <div slot="title">
            {{ item.name }}
            <van-tag type="warning">服务</van-tag>
          </div>
          <van-stepper min="1" v-model="item.goods_num" />
        </van-cell>
      </van-cell-group>
      <!-- 选择出的商品列表 -->
      <van-cell-group :key="item.appoint_id" title="商品" v-for="(item, index) in eCommerce_data">
        <van-cell center class="sp-cell">
          <span class="delete-icon" slot="icon">
            <van-icon @click="_deleteProE(item.appoint_id, index)" class="delete-icon" name="close" slot="icon" />
            <img :src="item.image" alt />
          </span>
          <div slot="title">
            {{ item.name }}
            <van-tag type="danger">商品</van-tag>
          </div>
          <van-stepper min="1" v-model="item.goods_num" />
        </van-cell>
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
    <!-- 选择包含的服务 -->
    <van-popup :lazy-render="true" position="top" safe-area-inset-bottom v-model="showServicePicker">
      <van-tabs :lazy-render="true" v-model="active">
        <van-tab title="服务项目">
          <van-list
            :finished="finished"
            :finished-text="finishText"
            @load="_onLoad"
            class="cache-list"
            v-model="loading"
          >
            <van-checkbox-group v-model="cache">
              <van-cell-group>
                <van-cell :key="index" @click="_toggle(index, item.disabled)" clickable v-for="(item, index) in list">
                  <van-checkbox
                    :disabled="item.disabled"
                    :name="item"
                    ref="checkboxes"
                    slot="right-icon"
                  ></van-checkbox>
                  <div slot="title">
                    <img :src="item.list_pic" alt />
                    {{ item.appoint_name }}
                  </div>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
          </van-list>
        </van-tab>
        <van-tab title="零售商品">
          <van-list
            :finished="finishedE"
            :finished-text="finishTextE"
            @load="_onLoadE"
            class="cache-list"
            v-model="loading"
          >
            <van-checkbox-group v-model="cacheE">
              <van-cell-group>
                <van-cell :key="index" @click="_toggleE(index, item.disabled)" clickable v-for="(item, index) in listE">
                  <van-checkbox
                    :disabled="item.disabled"
                    :name="item"
                    ref="checkboxesE"
                    slot="right-icon"
                  ></van-checkbox>
                  <div slot="title">
                    <img :src="item.list_pic" alt />
                    {{ item.name }}
                  </div>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
          </van-list>
        </van-tab>
      </van-tabs>
      <van-row>
        <van-col span="12">
          <van-button @click="_controlCommodityPicker">取消</van-button>
        </van-col>
        <van-col span="12">
          <van-button @click="_pickCacheCommodity" type="primary">确定</van-button>
        </van-col>
      </van-row>
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCategoryPicker">
      <van-picker
        :columns="categoryColumns"
        :default-index="categoryIndex"
        @cancel="_controlCategoryPicker"
        @change="_changeCategory"
        @confirm="_pickCategory"
        show-toolbar
        value-key="cat_name"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImgCropper from '@/components/ImgCropper'

export default {
  name: 'packageCRU',

  mixins: [],

  components: {
    ImgCropper,
  },

  props: {},

  data() {
    return {
      formData: {
        name: '',
        price: '',
        old_price: '',
        pic: '',
        stock: '',
        goods: [],
        cat_fid: '',
        cat_id: '',
        description: '',
        keyword: '',
      },
      loading: false,
      pic: [],
      active: 0,
      showServicePicker: false,
      service_data: [],
      eCommerce_data: [],
      // 服务项目数据
      list: [],
      page: 1,
      finished: false,
      cache: [],
      // 零售数据
      listE: [],
      pageE: 1,
      finishedE: false,
      cacheE: [],
      categoryColumnsOrigin: [],
      categoryColumns: [],
      showCategoryPicker: false,
      keyword1: '',
      keyword2: '',
      keyword3: '',
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    finishText() {
      return this.list.length ? '没有更多了' : '暂无'
    },
    finishTextE() {
      return this.listE.length ? '没有更多了' : '暂无'
    },
    // 服务商品分类非空验证
    categoryLabel() {
      let resultStr = ''
      if (this.formData.cat_fid === '0' && this.formData.cat_id !== '0') {
        const item = this.categoryColumnsOrigin.find(item => item.cat_id === this.formData.cat_id)
        return item && item.cat_name
      }
      const item = this.categoryColumnsOrigin.find(item => item.cat_id === this.formData.cat_fid)
      if (item) {
        resultStr += item.cat_name
        const child = item.children.find(item => item.cat_id === this.formData.cat_id)
        child && (resultStr += ' / ' + child.cat_name)
      }
      return resultStr
    },
  },

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    if (id) {
      this._readPackageDetail(id)
    } else {
      // 读取套餐分类
      this._getPackageCategoryList()
      this._onLoad()
      this._onLoadE()
    }
  },

  destroyed() {},

  methods: {
    ...mapActions('commodity', [
      'getServiceList',
      'getECommerceList',
      'createPackage',
      'updatePackage',
      'readPackageDetail',
      'readServiceOfPackage',
      'getPackageCategoryList',
    ]),
    // 服务商品选择开关
    _controlCommodityPicker() {
      this.showServicePicker = !this.showServicePicker
    },
    // 服务商品分类开关
    _controlCategoryPicker() {
      this.showCategoryPicker = !this.showCategoryPicker
    },
    // checkbox选中状态切换
    _toggle(index, flag) {
      // 判断是否选可选
      !flag && this.$refs.checkboxes[index].toggle()
    },
    // checkboxE选中状态切换
    _toggleE(index, flag) {
      // 判断是否选可选
      !flag && this.$refs.checkboxesE[index].toggle()
    },
    // 更新服务项目商品数据
    _onLoad() {
      this.getServiceList({ page: this.page }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        const { id } = this.$route.params
        if (id) {
          const arr = []
          this.service_data.forEach(item => {
            arr.push(item.goods_id)
          })
          res.forEach(item => {
            const index = arr.indexOf(item.goods_id)
            if (index > -1) {
              item.disabled = true
              this.cache.push(item)
            }
          })
        }
        this.list.push(...res)
      })
    },
    // 更新零售商品数据
    _onLoadE() {
      this.getECommerceList({ page: this.pageE }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finishedE = true
        } else {
          this.pageE += 1
        }
        const { id } = this.$route.params
        if (id) {
          const arr = []
          this.eCommerce_data.forEach(item => {
            arr.push(item.goods_id)
          })
          res.lists.forEach(item => {
            const index = arr.indexOf(item.goods_id)
            if (index > -1) {
              item.disabled = true
              this.cacheE.push(item)
            }
          })
        }
        this.listE.push(...res.lists)
      })
    },
    // 选中要包含的服务商品
    _pickCacheCommodity() {
      this.cache.forEach(item => {
        this.list.find(item2 => {
          if (item2.appoint_id === item.appoint_id) {
            if (!item2.disabled) {
              this.service_data.push({
                goods_id: item.appoint_id,
                goods_num: item.goods_num,
                type: 0,
                image: item.list_pic,
                name: item.appoint_name,
              })
            }
            item2.disabled = true
          }
        })
      })
      this.cacheE.forEach(item => {
        this.listE.find(item2 => {
          if (item2.goods_id === item.goods_id) {
            if (!item2.disabled) {
              this.eCommerce_data.push({
                goods_id: item.goods_id,
                goods_num: '',
                type: 1,
                image: item.list_pic,
                name: item.name,
              })
            }
            item2.disabled = true
          }
        })
      })
      this._controlCommodityPicker()
    },
    // 删除选中的项目
    _deletePro(id, index) {
      // 将灰色变为可选
      this.list.forEach(item => {
        item.appoint_id === id && (item.disabled = false)
      })
      this.$forceUpdate()
      // 删除选中项
      this.service_data.splice(index, 1)
      // 将不是灰色且选中的 变为 未选中
      this.$nextTick(() => {
        this.$refs.checkboxes.forEach(item => {
          if (!item.disabled && item.checked) {
            item.toggle()
          }
        })
      })
    },
    // 删除选中的项目
    _deleteProE(id, index) {
      // 将灰色变为可选
      this.listE.forEach(item => {
        item.goods_id === id && (item.disabled = false)
      })
      // 删除选中项
      this.eCommerce_data.splice(index, 1)

      this.$forceUpdate()
      // 将不是灰色且选中的 变为 未选中
      this.$nextTick(() => {
        this.$refs.checkboxesE.forEach(item => {
          if (!item.disabled && item.checked) {
            item.toggle()
          }
        })
      })
    },
    // 套餐类型分类选择
    _pickCategory(data) {
      if (!data[1]) {
        this.formData.cat_fid = '0'
        this.formData.cat_id = data[0].cat_id
      } else {
        this.formData.cat_fid = data[0].cat_id
        this.formData.cat_id = data[1].cat_id
      }
      this._controlCategoryPicker()
    },
    // 生成套餐商品分类 第二行数据
    _changeCategory(picker, values) {
      picker.setColumnValues(1, values[0].children || [])
    },
    // 读取套餐分类
    _getPackageCategoryList(fid, id) {
      this.getPackageCategoryList().then(res => {
        this.categoryColumnsOrigin = res
        this._serializationECommerceCategory(fid, id)
      })
    },
    // 根据columns原始数据序列化套餐商品分类
    _serializationECommerceCategory(fid, id) {
      const data = this.categoryColumnsOrigin
      let index1 = 0
      let index2 = 0
      if (fid && id) {
        index1 = data.findIndex(item => item.cat_id === fid) >= 0 ? data.findIndex(item => item.cat_id === fid) : 0
        index2 =
          data[index1].children.findIndex(item => item.cat_id === id) >= 0
            ? data[index1].children.findIndex(item => item.cat_id === id)
            : 0
      } else if (fid) {
        index1 = data.findIndex(item => item.cat_id === fid) >= 0 ? data.findIndex(item => item.cat_id === fid) : 0
      }
      this.categoryColumns = [
        {
          values: data,
          defaultIndex: index1,
        },
        {
          values: data[index1].children,
          defaultIndex: index2,
        },
      ]
    },
    // 读取套餐详情
    _readPackageDetail(id) {
      this.readPackageDetail(id).then(res => {
        const keys = Object.keys(this.formData)
        this.keyword1 = res.keyword[0]
        this.keyword2 = res.keyword[1]
        this.keyword3 = res.keyword[2]
        keys.forEach(item => {
          this.formData[item] = res[item]
        })
        this.pic = [{ url: res.pic }]
        const service = []
        const eCommerce = []
        res.goods.forEach(item => {
          if (item.type === '0') {
            service.push(item)
          } else if (item.type === '1') {
            eCommerce.push(item)
          }
        })
        this.service_data = service
        this.eCommerce_data = eCommerce
        this._onLoad()
        this._onLoadE()
        this.formData.cat_fid = res.cat_parent_id
        if (res.cat_parent_id !== '0') {
          this._getPackageCategoryList(res.cat_parent_id, res.cat_id)
        } else {
          this._getPackageCategoryList(res.cat_id)
        }
      })
    },
    // 选择图片
    _pickPic(data) {
      this.formData.pic = data.map(item => item.url)[0]
    },
    // 提交表单
    async _submit() {
      // 锁
      if (this.loading) return
      // 验证表单
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        this.$notify({
          type: 'warning',
          message: '请填写完整信息',
        })
      } else {
        if (!this.service_data.length && !this.eCommerce_data.length) {
          this.$notify({
            type: 'warning',
            message: '请选择套餐内容',
          })
          return false
        }
        // 加锁
        this.loading = true
        // 表单完整，进行数据修改并提交
        let method = 'createPackage'
        const { id } = this.$route.params
        const params = JSON.parse(JSON.stringify(this.formData))
        if (id) {
          method = 'updatePackage'
          params.package_id = id
        }
        // 姚欢要求。。。编辑不要带id
        this.service_data.forEach(item => {
          item.id && delete item.id
        })
        this.eCommerce_data.forEach(item => {
          item.id && delete item.id
        })

        params.goods = [...this.service_data, ...this.eCommerce_data]
        params.keyword = this.keyword1
        if (this.keyword2) {
          params.keyword += ',' + this.keyword2
        }
        if (this.keyword3) {
          params.keyword += ',' + this.keyword3
        }
        const toast = this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
        })
        this[method](params)
          .then(() => {
            toast.clear()
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1000,
              onClose: () => {
                // 解锁
                this.loading = false
                this.$goBack()
              },
            })
          })
          .catch(() => {
            toast.clear()
            this.loading = false
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
img {
  width: 30px;
  height: 30px;
  vertical-align: -9px;
  margin-right: 10px;
}

.van-popup {
  .cache-list {
    height: 65vh;
    overflow: scroll;
  }
  .van-button {
    width: 100%;
  }
}

.van-tag {
  vertical-align: 1px;
}

.delete-icon {
  line-height: inherit;
  color: red;

  & > img {
    width: 30px;
    height: 30px;
    vertical-align: -9px;
    margin: 0 10px;
  }
}

.sp-cell {
  .van-cell__title {
    flex: 2;
  }
}
</style>
