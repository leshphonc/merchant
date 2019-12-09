<template>
  <div>
    <van-nav-bar
      :title="`${type}团购`"
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <van-field input-align="right" label="团购状态" v-if="$route.params.id">
          <van-switch active-value="1" inactive-value="0" slot="input" v-model="formData.status" />
        </van-field>
        <ValidationProvider name="商品名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="商品名称"
            placeholder="请填写商品名称"
            required
            v-model.trim="formData.name"
          />
        </ValidationProvider>
        <ValidationProvider name="商品简介" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="商品简介"
            maxlength="100"
            placeholder="请填写商品简介"
            required
            rows="3"
            show-word-limit
            type="textarea"
            v-model.trim="formData.intro"
          />
        </ValidationProvider>
        <van-field input-align="right" label="支持退款">
          <van-switch active-value="1" inactive-value="0" slot="input" v-model="formData.no_refund" />
        </van-field>
        <ValidationProvider name="原价" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="原价"
            placeholder="最多支持2位小数"
            required
            v-model.trim="formData.old_price"
          />
        </ValidationProvider>
        <ValidationProvider name="团购价" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="团购价"
            placeholder="最多支持2位小数"
            required
            v-model.trim="formData.price"
          />
        </ValidationProvider>
        <time-picker
          :data="[formData.begin_time, formData.end_time]"
          :pickEndTime="_pickEndTime"
          :pickStartTime="_pickStartTime"
          endField="团购结束时间"
          endLabel="团购结束时间"
          startField="团购开始时间"
          startLabel="团购开始时间"
        ></time-picker>
        <ValidationProvider name="团购类型" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="groupBuyTypeLabel"
            @click="_controlGroupBuyTypePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="团购类型"
            placeholder="请选择"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="团购券有效期" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="validityLabel"
            @click="_controlValidityPicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="团购券有效期"
            placeholder="请选择"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="使用时间限制" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="timeLimitLabel"
            @click="_controlTimeLimitPicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="使用时间限制"
            placeholder="请选择"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="所属分类" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="categoryLabel"
            @click="_controlCategoryPicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="所属分类"
            placeholder="请选择"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="店铺" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="formData.store.length ? '1' : ''"
            @click="_controlStorePopup"
            error-message-align="right"
            input-align="right"
            is-link
            label="选择店铺"
            placeholder="请选择"
            readonly
            required
          >
            <div slot="input" v-if="formData.store.length">
              <div :key="item" v-for="item in formData.store">
                <van-tag type="primary">{{ _storeLabel(item) }}</van-tag>
              </div>
            </div>
          </van-field>
        </ValidationProvider>
        <img-cropper
          :confirm="_pickPic"
          :count="5"
          :delete="_deletePic"
          :list="picList"
          field="商品图片"
          title="商品图片"
        ></img-cropper>
        <ValidationProvider name="商品总数量" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            @click-right-icon="$toast('0表示不限制,否则产品会出现“已卖光”状态')"
            label="商品总数量"
            placeholder="请填写商品总数量"
            required
            right-icon="question-o"
            v-model.trim="formData.count_num"
          />
        </ValidationProvider>
        <ValidationProvider name="ID最多购买数量" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            @click-right-icon="$toast('一个ID最多购买数量,0表示不限制')"
            label="ID最多购买数量"
            placeholder="请填ID最多购买数量"
            required
            right-icon="question-o"
            v-model.trim="formData.once_max"
          />
        </ValidationProvider>
        <ValidationProvider name="一次最少购买数量" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            @click-right-icon="$toast('购买数量低于此设置不允许参团')"
            label="一次最少购买数量"
            placeholder="请填一次最少购买数量"
            required
            right-icon="question-o"
            v-model.trim="formData.once_min"
          />
        </ValidationProvider>
        <ValidationProvider name="拼团人数" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            label="拼团人数"
            placeholder="0表示不设置拼团"
            required
            v-model.trim="formData.pin_num"
          />
        </ValidationProvider>
        <ValidationProvider name="团长优惠比例" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            label="团长优惠比例"
            placeholder="0为免费，100为原价"
            required
            v-model.trim="formData.start_discount"
          />
        </ValidationProvider>
        <ValidationProvider name="退款手续比例" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            @click-right-icon="
              $toast('手续费将按单价百分比（0-100）收取,设置为100（成团前所有参团人也不可退）则不允许退款')
            "
            label="退款手续比例"
            placeholder="请填写百分比(0 - 100)"
            required
            right-icon="question-o"
            v-model.trim="formData.group_refund_fee"
          />
        </ValidationProvider>
        <ValidationProvider name="成团有效期" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            @click-right-icon="$toast('有效期内未成团团长不能取消订单，单位/时')"
            label="成团有效期"
            placeholder="请填写成团有效期"
            required
            right-icon="question-o"
            v-model.trim="formData.pin_effective_time"
          />
        </ValidationProvider>
        <van-field
          :value="reduceTypeLabel"
          @click="_controlReduceTypePicker"
          error-message-align="right"
          input-align="right"
          is-link
          label="库存减少方式"
          placeholder="请选择"
          readonly
          required
        ></van-field>
        <van-cell required title="本单详情"></van-cell>
        <quill-editor :changeHtml="_changeHtml" :context="formData.content" ref="editor"></quill-editor>
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
    <!-- 团购类型 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showGroupBuyTypePicker">
      <van-picker
        :columns="groupBuyColumns"
        @cancel="_controlGroupBuyTypePicker"
        @confirm="_pickGroupBuyType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 团购券有效期 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showValidityPicker">
      <van-datetime-picker
        :formatter="_formatter"
        :min-date="new Date()"
        :value="formData.deadline_time"
        @cancel="_controlValidityPicker"
        @confirm="_pickValidity"
        type="datetime"
      />
    </van-popup>
    <!-- 使用时间限制 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showTimeLimitPicker">
      <van-picker
        :columns="timeLimitColumns"
        @cancel="_controlTimeLimitPicker"
        @confirm="_pickTimeLimit"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 所属分类 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCategoryPicker">
      <van-picker
        :columns="categoryColumns"
        @cancel="_controlCategoryPicker"
        @change="_changeCategory"
        @confirm="_pickCategory"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 选择服务店铺 -->
    <van-popup position="top" safe-area-inset-bottom v-model="showStorePopup">
      <van-checkbox-group class="cache-list" v-model="cache">
        <van-cell-group>
          <van-cell
            :key="index"
            :title="item.label"
            @click="_toggle(index)"
            clickable
            v-for="(item, index) in storeList"
          >
            <van-checkbox :name="item" ref="checkboxes" slot="right-icon"></van-checkbox>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <van-row>
        <van-col span="12">
          <van-button @click="_controlStorePopup">取消</van-button>
        </van-col>
        <van-col span="12">
          <van-button @click="_pickStore" type="primary">确定</van-button>
        </van-col>
      </van-row>
    </van-popup>
    <!-- 库存减少方式 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showReduceType">
      <van-picker
        :columns="reduceTypeColumns"
        @cancel="_controlReduceTypePicker"
        @confirm="_pickReduceType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TimePicker from '@/components/TimePicker'
import ImgCropper from '@/components/ImgCropper'
import QuillEditor from '@/components/QuillEditor'

export default {
  name: 'groupBuyCRU',

  mixins: [],

  components: {
    TimePicker,
    ImgCropper,
    QuillEditor,
  },

  props: {},

  data() {
    return {
      formData: {
        name: '',
        intro: '',
        no_refund: '0',
        old_price: '',
        price: '',
        begin_time: '',
        end_time: '',
        tuan_type: '0',
        deadline_time: '',
        is_general: '0',
        cat_fid: '',
        cat_id: '',
        store: [],
        content: '',
        pic: [],
        count_num: '',
        once_max: '',
        once_min: '',
        stock_reduce_method: '0',
        pin_num: '',
        start_discount: '',
        group_refund_fee: '',
        pin_effective_time: '',
        success_num: 1,
        status: '',
      },
      groupBuyColumns: [
        {
          label: '团购券',
          value: '0',
        },
        {
          label: '代金券',
          value: '1',
        },
        {
          label: '实物',
          value: '2',
        },
      ],
      timeLimitColumns: [
        {
          label: '周末、法定节假日通用',
          value: '0',
        },
        {
          label: '周末不能使用',
          value: '1',
        },
        {
          label: '法定节假日不能使用',
          value: '2',
        },
        {
          label: '周末、法定节假日不能通用',
          value: '3',
        },
      ],
      reduceTypeColumns: [
        {
          label: '支付成功后减库存',
          value: '0',
        },
        {
          label: '下单成功后减库存',
          value: '1',
        },
      ],
      categoryColumnsOrigin: [],
      categoryColumns: [],
      showGroupBuyTypePicker: false,
      showValidityPicker: false,
      showTimeLimitPicker: false,
      showCategoryPicker: false,
      showStorePopup: false,
      showReduceType: false,
      storeList: [],
      cache: [],
      picList: [],
      loading: false,
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    // 团购类型非空验证
    groupBuyTypeLabel() {
      const item = this.groupBuyColumns.find(item => item.value === this.formData.tuan_type)
      return item && item.label
    },
    // 有效期非空验证
    validityLabel() {
      return this.formData.deadline_time
    },
    // 时间限制非空验证
    timeLimitLabel() {
      const item = this.timeLimitColumns.find(item => item.value === this.formData.is_general)
      return item && item.label
    },
    // 所属分类非空验证
    categoryLabel() {
      let resultStr = ''
      const item = this.categoryColumnsOrigin.find(item => item.value === this.formData.cat_fid)
      if (item) {
        resultStr += item.label
        const child = item.children.find(item => item.value === this.formData.cat_id)
        child && (resultStr += ' / ' + child.label)
      }
      return resultStr
    },
    // 减少类型非空验证
    reduceTypeLabel() {
      const item = this.reduceTypeColumns.find(item => item.value === this.formData.stock_reduce_method)
      return item && item.label
    },
    // 自适应120宽度
    resizeWidth() {
      return (120 / 375) * document.body.clientWidth + 'px'
    },
  },

  watch: {},

  created() {},

  async mounted() {
    await this.getStoreList().then(res => {
      this.storeList = res.store_list
    })
    // 是否为编辑
    const { id } = this.$route.params
    if (id) {
      this._readGroupBuyDetail(id)
    } else {
      // 电商分类
      this._getPlatformGroupBuyCategoryList()
    }
  },

  destroyed() {},

  methods: {
    ...mapActions(['getStoreList']),
    ...mapActions('commodity', [
      'getPlatformGroupBuyCategoryList',
      'createGroupBuy',
      'readGroupBuyDetail',
      'updateGroupBuy',
    ]),
    // 团购类型开关
    _controlGroupBuyTypePicker() {
      this.showGroupBuyTypePicker = !this.showGroupBuyTypePicker
    },
    // 团购券有效期开关
    _controlValidityPicker() {
      this.showValidityPicker = !this.showValidityPicker
    },
    // 使用时间限制开关
    _controlTimeLimitPicker() {
      this.showTimeLimitPicker = !this.showTimeLimitPicker
    },
    // 所属分类开关
    _controlCategoryPicker() {
      this.showCategoryPicker = !this.showCategoryPicker
    },
    // 店铺选择开关
    _controlStorePopup() {
      this.showStorePopup = !this.showStorePopup
    },
    // 减少方式开关
    _controlReduceTypePicker() {
      this.showReduceType = !this.showReduceType
    },
    // 团购开始时间
    _pickStartTime(data) {
      this.formData.begin_time = this.$moment(data).format('YYYY-MM-DD')
    },
    // 团购结束时间
    _pickEndTime(data) {
      this.formData.end_time = this.$moment(data).format('YYYY-MM-DD')
    },
    // 团购类型选择
    _pickGroupBuyType(data) {
      this.formData.tuan_type = data.value
      this._controlGroupBuyTypePicker()
    },
    // 有效期
    _pickValidity(data) {
      this.formData.deadline_time = this.$moment(data).format('YYYY-MM-DD HH:mm')
      this._controlValidityPicker()
    },
    // 时间限制
    _pickTimeLimit(data) {
      this.formData.is_general = data.value
      this._controlTimeLimitPicker()
    },
    // 所属分类选择
    _pickCategory(data) {
      this.formData.cat_fid = data[0].value
      this.formData.cat_id = data[1].value
      this._controlCategoryPicker()
    },
    // 减少方式选择
    _pickReduceType(data) {
      this.formData.stock_reduce_method = data.value
      this._controlReduceTypePicker()
    },
    _formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      }
      return value
    },
    // 切换所属分类
    _changeCategory(picker, values) {
      if (values[0].children) {
        picker.setColumnValues(1, values[0].children)
      } else {
        picker.setColumnValues(1, [])
      }
    },
    // 获取店铺名称
    _storeLabel(id) {
      const item = this.storeList.find(item => item.value === id)
      return item && `${item.label} - ${item.adress}`
    },
    // checkbox选中状态切换
    _toggle(index, flag) {
      // 判断是否选可选
      !flag && this.$refs.checkboxes[index].toggle()
    },
    // 选择店铺
    _pickStore() {
      const arr = []
      this.cache.forEach(item => {
        arr.push(item.value)
      })
      this.formData.store = arr
      this._controlStorePopup()
    },
    _pickPic(data) {
      this.formData.pic.push(data[0].url)
    },
    _deletePic(data) {
      const index = this.formData.pic.findIndex(item => item === data.url)
      index > -1 && this.formData.pic.splice(index, 1)
    },
    _changeHtml(data) {
      this.formData.content = data.html
    },
    // 平台团购分类
    _getPlatformGroupBuyCategoryList(fid, id) {
      this.getPlatformGroupBuyCategoryList().then(res => {
        this.categoryColumnsOrigin = res
        this._serializationCategory(fid, id)
      })
    },
    // 序列化
    _serializationCategory(fid, id) {
      const data = this.categoryColumnsOrigin
      let index1 = 0
      let index2 = 0
      if (fid && id) {
        index1 = data.findIndex(item => item.value === fid) >= 0 ? data.findIndex(item => item.value === fid) : 0
        index2 =
          data[index1].children.findIndex(item => item.value === id) >= 0
            ? data[index1].children.findIndex(item => item.value === id)
            : 0
      } else if (fid) {
        index1 = data.findIndex(item => item.value === fid) >= 0 ? data.findIndex(item => item.value === fid) : 0
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
    // 编辑时获取详情
    _readGroupBuyDetail(id) {
      this.readGroupBuyDetail(id).then(res => {
        // 阻止编辑器自动获取焦点
        this.$refs.editor.$refs.quillEditor.quill.enable(false)
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res[item]
        })
        if (res.begin_time !== '0') {
          this.formData.begin_time = this.$moment(res.begin_time * 1000).format('YYYY-MM-DD')
        }
        if (res.end_time !== '0') {
          this.formData.end_time = this.$moment(res.end_time * 1000).format('YYYY-MM-DD')
        }
        if (res.deadline_time !== '0') {
          this.formData.deadline_time = this.$moment(res.deadline_time * 1000).format('YYYY-MM-DD HH:mm')
        }
        this.formData.store = res.store_arr
        this.formData.pic = res.pic.split(';')
        this.picList = res.pic_arr
        // 设置默认选中的店铺
        const cache = []
        res.store_arr.forEach(item => {
          const result = this.storeList.find(i => i.value === item)
          result && cache.push(result)
        })
        this.cache = cache
        // 设置化分类
        this._getPlatformGroupBuyCategoryList(res.cat_fid, res.cat_id)
        this.$nextTick(function() {
          this.$refs.editor.$refs.quillEditor.quill.enable(true)
          this.$refs.editor.$refs.quillEditor.quill.blur()
          window.scroll(0, 0)
        })
      })
    },
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
        if (!this.formData.content) {
          this.$notify({
            type: 'warning',
            message: '请填写完整信息',
          })
        } else {
          // 加锁
          this.loading = true
          // 表单完整，进行数据修改并提交
          let method = 'createGroupBuy'
          const { id } = this.$route.params
          const params = JSON.parse(JSON.stringify(this.formData))
          if (id) {
            method = 'updateGroupBuy'
            params.group_id = id
          }
          params.s_name = params.name
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
      }
    },
  },
}
</script>

<style lang="less" scoped>
.van-popup {
  .cache-list {
    height: 65vh;
    overflow: scroll;
  }
  .van-button {
    width: 100%;
  }
}
</style>
