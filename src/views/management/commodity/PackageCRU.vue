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
        <ValidationProvider name="查询关键字" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="查询关键字"
            placeholder="查询关键字"
            required
            v-model.trim="formData.keyword"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="有效天数" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            @click-right-icon="$toast('有效天数，超出后套餐内项目一并失效')"
            label="有效天数"
            placeholder="开卡后，可使用的天数"
            required
            right-icon="question-o"
            type="number"
            v-model.trim="formData.day_num"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="套餐库存" rules="required|gte-1" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="库存"
            placeholder="套餐库存"
            required
            v-model.trim="formData.total_num"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="限购数量" rules="required|numeric" slim v-if="false" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="每人限购"
            placeholder="限购数量"
            required
            type="number"
            v-model.trim="formData.person_num"
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
      <van-cell-group
        :border="false"
        :key="item.appoint_id"
        title="服务"
        v-for="(item, index) in formData.project_data"
      >
        <van-cell center>
          <span class="delete-icon" slot="icon">
            <van-icon @click="_deletePro(item.appoint_id, index)" name="close" />
            <img :src="item.img" alt />
          </span>
          <div slot="title">
            {{ item.name }}
            <van-tag type="warning">服务</van-tag>
          </div>
          <van-stepper min="0" v-model="item.meal_num" />
        </van-cell>
        <ValidationProvider name="有效天数" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="有效天数"
            placeholder="开卡后，可使用的天数"
            required
            type="number"
            v-model.trim="item.day_num"
          ></van-field>
        </ValidationProvider>
      </van-cell-group>
      <!-- 选择出的商品列表 -->
      <van-cell-group :key="item.appoint_id" title="商品" v-for="(item, index) in eCommerce_data">
        <van-cell center>
          <span class="delete-icon" slot="icon">
            <van-icon @click="_deleteProE(item.appoint_id, index)" class="delete-icon" name="close" slot="icon" />
            <img :src="item.img" alt />
          </span>
          <div slot="title">
            {{ item.name }}
            <van-tag type="danger">商品</van-tag>
          </div>
          <van-stepper min="1" v-model="item.meal_num" />
        </van-cell>
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
    <!-- 选择包含的服务 -->
    <van-popup position="top" safe-area-inset-bottom v-model="showServicePicker">
      <van-tabs v-model="active">
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
        day_num: '',
        pic: '',
        total_num: '',
        person_num: '',
        project_data: [],
        cat_fid: '',
        cat_id: '',
        description: '',
        keyword: '',
      },
      loading: false,
      pic: [],
      active: 0,
      showServicePicker: false,
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
      this.getServiceList(this.page).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        const { id } = this.$route.params
        if (id) {
          const arr = []
          this.formData.project_data.forEach(item => {
            arr.push(item.appoint_id)
          })
          res.forEach(item => {
            const index = arr.indexOf(item.appoint_id)
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
      this.getECommerceList(this.pageE).then(res => {
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
            arr.push(item.appoint_id)
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
              this.formData.project_data.push({
                appoint_id: item.appoint_id,
                name: item.appoint_name,
                day_num: '',
                meal_num: '',
                img: item.list_pic,
                type: 0,
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
                appoint_id: item.goods_id,
                name: item.name,
                day_num: 0,
                meal_num: '',
                img: item.list_pic,
                type: 1,
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
      this.formData.project_data.splice(index, 1)

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
        keys.forEach(item => {
          this.formData[item] = res[0][item]
        })
        this.formData.name = res[0].meal_name
        this.pic = [{ url: res[0].pic }]
        this.readServiceOfPackage(id).then(res2 => {
          const service = []
          const eCommerce = []
          res2.forEach(item => {
            if (item.type === '0') {
              service.push(item)
            } else if (item.type === '1') {
              eCommerce.push(item)
            }
          })
          this.formData.project_data = service
          this.eCommerce_data = eCommerce
          this._onLoad()
          this._onLoadE()
          this.formData.cat_fid = res[0].cat_parent_id
          if (res[0].cat_parent_id !== '0') {
            this._getPackageCategoryList(res[0].cat_parent_id, res[0].cat_id)
          } else {
            this._getPackageCategoryList(res[0].cat_id)
          }
        })
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
        if (!this.formData.project_data.length && !this.eCommerce_data.length) {
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
          params.meal_id = id
        }
        // 姚欢要求。。。编辑不要带id
        params.project_data.forEach(item => {
          item.id && delete item.id
        })
        this.eCommerce_data.forEach(item => {
          item.id && delete item.id
        })

        params.project_data = JSON.stringify([...params.project_data, ...this.eCommerce_data])
        this[method](params)
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this.$goBack()
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
</style>
