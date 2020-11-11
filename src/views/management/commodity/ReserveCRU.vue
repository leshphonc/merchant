<template>
  <div>
    <van-nav-bar
      :title="`${type}预定`"
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-field
        @click-left-icon="$toast('为了方便用户能查到以前的订单，预约无法删除！')"
        input-align="right"
        label="预约状态"
        left-icon="question-o"
        v-if="$route.params.id"
      >
        <van-switch active-value="1" inactive-value="0" slot="input" v-model="formData.appoint_status" />
      </van-field>
      <van-cell-group>
        <ValidationProvider name="预定名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="预定名称"
            placeholder="预定名称"
            required
            v-model.trim="formData.appoint_name"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="简介" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="简介"
            maxlength="50"
            placeholder="请填写预定服务简介"
            required
            rows="2"
            show-word-limit
            type="textarea"
            v-model.trim="formData.appoint_content"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="原价" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="原价"
            placeholder="最多支持2位小数"
            required
            type="number"
            v-model.trim="formData.old_price"
          ></van-field>
        </ValidationProvider>
        <van-cell title="收取定金">
          <van-switch active-value="1" inactive-value="0" v-model="formData.payment_status" />
        </van-cell>
        <ValidationProvider
          name="定金"
          rules="required|decimal-max2"
          slim
          v-if="formData.payment_status === '1'"
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            label="定金"
            placeholder="最多支持2位小数"
            required
            type="number"
            v-model.trim="formData.payment_money"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="全价类型" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="priceTypeLabel"
            @click="_controlPriceTypePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="全价"
            placeholder="请选择"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider
          name="自定义金额"
          rules="required|decimal-max2"
          slim
          v-if="formData.is_appoint_price === '1'"
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            label="自定义金额"
            placeholder="最多支持2位小数"
            required
            type="number"
            v-model.trim="formData.appoint_price"
          ></van-field>
        </ValidationProvider>
        <van-field
          @click-left-icon="
            $toast(
              '若开启可以选择多个连续的预约时间，且预约金额叠加，若选择两个连续的时间，预约订单最后的总价为设定全价的两倍，以此类推'
            )
          "
          input-align="right"
          label="日期多选"
          left-icon="question-o"
        >
          <van-switch active-value="1" inactive-value="0" slot="input" v-model="formData.appoint_date_type" />
        </van-field>
        <ValidationProvider name="预约天数" rules="required|numeric|" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            @click-left-icon="
              $toast('从今天开始算，可以向前预约的天数，最多30天，填写0表示只有今天可以预约，以此类推。')
            "
            label="预约天数"
            left-icon="question-o"
            placeholder="可提前预定天数"
            required
            type="number"
            v-model="formData.appoint_date_num"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="项目耗时" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            @click-left-icon="$toast('项目所需要的时间')"
            label="项目耗时"
            left-icon="question-o"
            placeholder="单位：分钟"
            required
            type="number"
            v-model="formData.expend_time"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="预约间隔" rules="required|numeric|max_value:30" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            @click-left-icon="$toast('预约时间间隔，单位分钟，必须是5的倍数，填写-1则显示为天数预约。')"
            label="预约间隔"
            left-icon="question-o"
            placeholder="单位：分钟"
            required
            type="number"
            v-model="formData.time_gap"
          ></van-field>
        </ValidationProvider>
        <time-picker
          :data="[formData.start_time, formData.end_time]"
          :pickEndTime="_pickEndTime"
          :pickStartTime="_pickStartTime"
          endField="预约结束时间"
          endLabel="预约结束时间"
          startField="预约开始时间"
          startLabel="预约开始时间"
        ></time-picker>
        <ValidationProvider name="服务类型" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="serviceTypeLabel"
            @click="_controlServiceTypePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="服务类型"
            placeholder="请选择"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="预定所属分类" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="categoryLabel"
            @click="_controlCategoryPicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="预定所属分类"
            placeholder="请选择"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <img-cropper
          :confirm="_pickPic"
          :delete="_deletePic"
          :count="5"
          :list="picList"
          field="预定图片"
          title="预定图片"
        ></img-cropper>
        <van-field
          @click-left-icon="$toast('开启后，用户预约时可自行选择服务店铺')"
          input-align="right"
          label="开启服务店铺"
          left-icon="question-o"
        >
          <van-switch active-value="1" inactive-value="0" slot="input" v-model="formData.is_store" />
        </van-field>
        <ValidationProvider name="服务店铺" rules="required" slim v-if="formData.is_store === '1'" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="formData.store.length ? '1' : ''"
            @click="_controlStorePopup"
            error-message-align="right"
            input-align="right"
            is-link
            label="选择服务店铺"
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
        <time-picker
          :data="[formData.office_start_time, formData.office_stop_time]"
          :pickEndTime="_pickCloseTime"
          :pickStartTime="_pickOpenTime"
          endField="营业结束时间"
          endLabel="营业结束时间"
          startField="营业开始时间"
          startLabel="营业开始时间"
          type="time"
        ></time-picker>
        <van-cell required title="预定详情"></van-cell>
        <quill-editor :changeHtml="_changeHtml" :context="formData.appoint_pic_content" ref="editor"></quill-editor>
      </van-cell-group>
      <van-cell-group title="商品规格"></van-cell-group>
      <van-cell-group :key="index" v-for="(item, index) in customList">
        <div slot="title">
          {{ `规格属性${index + 1}` }}
          <van-button @click="_deleteCustom(index)" size="small" type="danger">删除</van-button>
        </div>
        <ValidationProvider name="规格名称" rules="required" slim v-slot="{ errors }">
          <van-field label="规格名称" placeholder="请填写规格名称" required v-model="item.custom_name"></van-field>
        </ValidationProvider>
        <ValidationProvider name="规格定金" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            label="规格定金"
            placeholder="最多支持2位小数"
            required
            v-model="item.custom_payment_price"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="规格全价" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field label="规格全价" placeholder="最多支持2位小数" required v-model="item.custom_price"></van-field>
        </ValidationProvider>
        <ValidationProvider name="规格描述" rules="required" slim v-slot="{ errors }">
          <van-field label="规格描述" placeholder="请填写规格描述" required v-model="item.custom_content"></van-field>
        </ValidationProvider>
        <ValidationProvider name="平均用时" rules="required|numeric" slim v-slot="{ errors }">
          <van-field label="平均用时" placeholder="单位：分钟" required v-model="item.custom_use_time"></van-field>
        </ValidationProvider>
      </van-cell-group>
      <van-button @click="_addCustom" class="add-btn" icon="plus" v-show="customList">新增规格</van-button>
    </ValidationObserver>
    <!-- 弹出层 -->
    <!-- 全价 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showPriceTypePicker">
      <van-picker
        :columns="priceTypeColumns"
        :default-index="priceTypeIndex"
        @cancel="_controlPriceTypePicker"
        @confirm="_pickPriceType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 服务类型 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showServiceTypePicker">
      <van-picker
        :columns="serviceTypeColumns"
        :default-index="serviceTypeIndex"
        @cancel="_controlServiceTypePicker"
        @confirm="_pickServiceType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 预定所属分类 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCategoryPicker">
      <van-picker
        :columns="categoryColumns"
        @cancel="_controlCategoryPicker"
        @change="_changeCategory"
        @confirm="_pickCategory"
        show-toolbar
        value-key="label"
      />
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TimePicker from '@/components/TimePicker'
import ImgCropper from '@/components/ImgCropper'
import QuillEditor from '@/components/QuillEditor'

export default {
  name: 'reserveCRU',

  mixins: [],

  components: {
    ImgCropper,
    TimePicker,
    QuillEditor,
  },

  props: {},

  data() {
    return {
      formData: {
        appoint_name: '',
        appoint_content: '',
        old_price: '',
        payment_status: '0',
        payment_money: '',
        is_appoint_price: '',
        appoint_price: '',
        appoint_date_type: '0',
        appoint_date_num: '',
        expend_time: '',
        time_gap: '',
        sort: '0',
        start_time: '',
        end_time: '',
        appoint_type: '',
        cat_fid: '',
        cat_id: '',
        pic: [],
        is_store: '0',
        store: [],
        office_start_time: '',
        office_stop_time: '',
        appoint_status: '0',
        appoint_pic_content: '',
      },
      cache: [],
      storeList: [],
      picList: [],
      priceTypeColumns: [
        {
          label: '面议',
          value: '0',
        },
        {
          label: '自定义',
          value: '1',
        },
      ],
      serviceTypeColumns: [
        {
          label: '到店',
          value: '0',
        },
        {
          label: '上门',
          value: '1',
        },
      ],
      categoryColumnsOrigin: [],
      categoryColumns: [],
      showPriceTypePicker: false,
      showServiceTypePicker: false,
      showCategoryPicker: false,
      showStorePopup: false,
      loading: false,
      customList: [],
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    priceTypeLabel() {
      const item = this.priceTypeColumns.find(item => item.value === this.formData.is_appoint_price)
      return item && item.label
    },
    priceTypeIndex() {
      const index = this.priceTypeColumns.findIndex(item => item.value === this.formData.is_appoint_price)
      return index
    },
    serviceTypeLabel() {
      const item = this.serviceTypeColumns.find(item => item.value === this.formData.appoint_type)
      return item && item.label
    },
    serviceTypeIndex() {
      const index = this.serviceTypeColumns.findIndex(item => item.value === this.formData.appoint_type)
      return index
    },
    categoryLabel() {
      let resultStr = ''
      const item = this.categoryColumnsOrigin.find(item => item.value === this.formData.cat_fid)
      if (item) {
        resultStr = item.label
        if (item.children) {
          const { label } = item.children.find(item => item.value === this.formData.cat_id)
          resultStr += ' / ' + label
        }
      }
      return resultStr
    },
  },

  watch: {},

  created() {},

  async mounted() {
    await this.getStoreList().then(res => {
      this.storeList = res.store_list
    })
    this._getPlatformReserveCategoryList()
    const { id } = this.$route.params
    if (id) {
      this._readReserveDetail(id)
    }
  },

  destroyed() {},

  methods: {
    ...mapActions(['getStoreList']),
    ...mapActions('commodity', [
      'getPlatformReserveCategoryList',
      'createReserve',
      'readReserveDetail',
      'updateReserve',
    ]),
    _controlPriceTypePicker() {
      this.showPriceTypePicker = !this.showPriceTypePicker
    },
    _controlServiceTypePicker() {
      this.showServiceTypePicker = !this.showServiceTypePicker
    },
    _controlCategoryPicker() {
      this.showCategoryPicker = !this.showCategoryPicker
    },
    // 店铺选择开关
    _controlStorePopup() {
      this.showStorePopup = !this.showStorePopup
    },
    _pickPriceType(data) {
      this.formData.is_appoint_price = data.value
      this._controlPriceTypePicker()
    },
    _pickServiceType(data) {
      this.formData.appoint_type = data.value
      this._controlServiceTypePicker()
    },
    _pickStore() {
      const arr = []
      this.cache.forEach(item => {
        arr.push(item.value)
      })
      this.formData.store = arr
      this._controlStorePopup()
    },
    _changeCategory(picker, values) {
      if (values[0].children) {
        picker.setColumnValues(1, values[0].children)
      } else {
        picker.setColumnValues(1, [])
      }
    },
    _pickCategory(data) {
      this.formData.cat_fid = data[0].value
      if (data[1]) {
        this.formData.cat_id = data[1].value
      } else {
        this.formData.cat_id = ''
      }
      this._controlCategoryPicker()
    },
    _pickStartTime(data) {
      this.formData.start_time = this.$moment(data).format('YYYY-MM-DD')
    },
    _pickEndTime(data) {
      this.formData.end_time = this.$moment(data).format('YYYY-MM-DD')
    },
    _pickOpenTime(data) {
      this.formData.office_start_time = data
    },
    _pickCloseTime(data) {
      this.formData.office_stop_time = data
    },
    _pickPic(data) {
      this.formData.pic = data.map(item => item.url)
    },
    _deletePic(data, index) {
      this.formData.pic.splice(index, 1)
      this.picList.splice(index, 1)
    },
    _changeHtml(data) {
      this.formData.appoint_pic_content = data.html
    },
    // checkbox选中状态切换
    _toggle(index, flag) {
      // 判断是否选可选
      !flag && this.$refs.checkboxes[index].toggle()
    },
    _storeLabel(id) {
      const item = this.storeList.find(item => item.value === id)
      return item && `${item.label} - ${item.adress}`
    },
    _getPlatformReserveCategoryList(fid, id) {
      this.getPlatformReserveCategoryList().then(res => {
        this.categoryColumnsOrigin = res
        this._serializationCategory(fid, id)
      })
    },
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
    // 添加自定义规格
    _addCustom() {
      this.customList.push({
        custom_id: '',
        custom_name: '',
        custom_payment_price: '',
        custom_price: '',
        custom_content: '',
        custom_use_time: '',
      })
    },
    // 删除自定义规格
    _deleteCustom(index) {
      this.customList.splice(index, 1)
    },
    // 编辑时获取详情数据
    _readReserveDetail(id) {
      this.readReserveDetail(id).then(res => {
        // 阻止编辑器自动获取焦点
        this.$refs.editor.$refs.quillEditor.quill.enable(false)
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res.appoint_list[item]
        })
        this.formData.pic = res.appoint_list.pic_arr.map(item => item.url)
        this.picList = res.appoint_list.pic_arr
        if (res.appoint_list.start_time !== '0') {
          this.formData.start_time = this.$moment(res.appoint_list.start_time * 1000).format('YYYY-MM-DD')
        }
        if (res.appoint_list.end_time !== '0') {
          this.formData.end_time = this.$moment(res.appoint_list.end_time * 1000).format('YYYY-MM-DD')
        }
        this.formData.office_start_time = res.office_time.open
        this.formData.office_stop_time = res.office_time.close
        this.customList = res.product_list.map(item => {
          const obj = {}
          obj.custom_id = item.id
          obj.custom_name = item.name
          obj.custom_payment_price = item.payment_price
          obj.custom_price = item.price
          obj.custom_content = item.content
          obj.custom_use_time = item.use_time
          return obj
        })
        this.formData.store = res.store_arr
        // 设置默认选中的店铺
        const cache = []
        res.store_arr.forEach(item => {
          const result = this.storeList.find(i => i.value === item)
          result && cache.push(result)
        })
        this.cache = cache
        this.$nextTick(function() {
          this.$refs.editor.$refs.quillEditor.quill.enable(true)
          this.$refs.editor.$refs.quillEditor.quill.blur()
          window.scroll(0, 0)
        })
      })
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
        // 加锁
        this.loading = true
        // 表单完整，进行数据修改并提交
        let method = 'createReserve'
        const { id } = this.$route.params
        const params = JSON.parse(JSON.stringify(this.formData))
        if (id) {
          method = 'updateReserve'
          params.appoint_id = id
        }
        this.customList.forEach(item => {
          for (let key in item) {
            params[key] ? params[key].push(item[key]) : (params[key] = [item[key]])
          }
        })
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
.add-btn {
  width: 100%;
}
</style>
