<template>
  <div>
    <van-nav-bar
      :title="`${type}服务项目`"
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="服务名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="服务名称"
            placeholder="服务名称"
            required
            v-model.trim="formData.appoint_name"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="服务简介" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="服务简介"
            placeholder="服务简介"
            required
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
            v-model.trim="formData.show_price"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="现价" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="现价"
            placeholder="服务现价"
            required
            type="number"
            v-model.trim="formData.old_price"
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
        <van-cell title="日期多选">
          <van-switch active-value="1" inactive-value="0" v-model="formData.appoint_date_type"></van-switch>
        </van-cell>
        <ValidationProvider name="预约天数" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            @click-left-icon.stop="$toast('今天起，可以向前预约的天数，最多30天，0代表只有今天可以预约。以此类推。')"
            label="提前预约"
            left-icon="question-o"
            placeholder="可提前预约天数"
            required
            type="number"
            v-model.trim="formData.appoint_date_num"
          >
            <div slot="right-icon">天</div>
          </van-field>
        </ValidationProvider>
        <ValidationProvider name="耗时时间" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="耗时"
            placeholder="项目耗时"
            required
            type="number"
            v-model.trim="formData.expend_time"
          >
            <div slot="right-icon">分钟</div>
          </van-field>
        </ValidationProvider>
        <van-cell title="开启车型选择">
          <van-switch active-value="1" inactive-value="0" v-model="formData.car_type"></van-switch>
        </van-cell>
        <van-cell title="开启车牌选择">
          <van-switch active-value="1" inactive-value="0" v-model="formData.car_no"></van-switch>
        </van-cell>
        <van-cell title="需要桌台/房间">
          <van-switch active-value="1" inactive-value="0" v-model="formData.need_table" />
        </van-cell>
        <!-- <van-cell title="需要服务人员">
          <van-switch active-value="1" inactive-value="0" v-model="formData.need_service_personnel"></van-switch>
        </van-cell>-->
        <van-cell @click="_controlStaffLevelPopup" title="设置服务技师和服务费用" is-link></van-cell>
        <div v-if="activeIds.length">
          <ValidationProvider
            :key="index"
            :name="`服务费用${index + 1}`"
            rules="required|decimal-max2"
            slim
            v-for="(item, index) in activeIds"
            v-slot="{ errors }"
          >
            <van-field
              :error-message="errors[0]"
              :label="_getLevelLabel(item)"
              placeholder="请输入服务费用"
              required
              v-model.trim="formData.need_service_fee[index].fee"
            ></van-field>
          </ValidationProvider>
        </div>
        <ValidationProvider name="预约开始时间" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="startTimeLabel"
            @click="_controlStartTimePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="预约开始时间"
            placeholder="请选择"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="预约结束时间" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="endTimeLabel"
            @click="_controlEndTimePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="预约结束时间"
            placeholder="请选择"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="服务类型" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="serviceTypeLabel"
            @click="_controlServiceTypePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="服务类型"
            placeholder="选择类型"
            readonly
            required
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
        <img-cropper
          :confirm="_pickPic"
          :delete="_deletePic"
          :list="pic"
          field="服务项目图片"
          title="服务项目图片"
        ></img-cropper>
        <ValidationProvider name="服务项目描述" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="服务项目描述"
            maxlength="100"
            placeholder="服务项目描述"
            required
            rows="3"
            show-word-limit
            type="textarea"
            v-model.trim="formData.description"
          />
        </ValidationProvider>
        <van-cell title="服务项目详情"></van-cell>
        <quill-editor :changeHtml="_changeHtml" :context="formData.appoint_pic_content" ref="editor"></quill-editor>
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStartTimePicker">
      <van-datetime-picker
        :formatter="$timeFormatter"
        :min-date="new Date()"
        :value="formData.start_time"
        @cancel="_controlStartTimePicker"
        @confirm="_pickStartTime"
        show-toolbar
      />
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showEndTimePicker">
      <van-datetime-picker
        :formatter="$timeFormatter"
        :min-date="new Date()"
        :value="formData.end_time"
        @cancel="_controlEndTimePicker"
        @confirm="_pickEndTime"
        show-toolbar
      />
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showServiceTypePicker">
      <van-picker
        :columns="serviceTypeColumns"
        :default-index="serviceTypeIndex"
        @cancel="_controlServiceTypePicker"
        @confirm="_pickServiceType"
        show-toolbar
      ></van-picker>
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCategoryPicker">
      <van-picker
        :columns="categoryColumns"
        :default-index="categoryIndex"
        @cancel="_controlCategoryPicker"
        @change="_changeCategory"
        @confirm="_pickCategory"
        show-toolbar
        value-key="name"
      ></van-picker>
    </van-popup>
    <van-popup class="staff-level" position="bottom" safe-area-inset-bottom v-model="showStaffLevelPopup">
      <van-tree-select
        :active-id.sync="activeIds"
        :height="450"
        :items="items"
        :main-active-index.sync="activeIndex"
        @click-item="_selectLevel"
      />
      <van-button @click="_controlStaffLevelPopup">关闭</van-button>
    </van-popup>
  </div>
</template>

<script>
import api from '@/api/management/category'
import { mapActions } from 'vuex'
import ImgCropper from '@/components/ImgCropper'
import QuillEditor from '@/components/QuillEditor'

export default {
  name: '',

  mixins: [],

  components: {
    ImgCropper,
    QuillEditor,
  },

  props: {},

  data() {
    return {
      formData: {
        appoint_name: '',
        appoint_content: '',
        show_price: '',
        old_price: '',
        payment_status: '0',
        payment_money: '',
        appoint_date_type: '0',
        appoint_date_num: '',
        expend_time: '',
        car_type: '0',
        car_no: '0',
        need_table: '0',
        need_service_personnel: '0',
        need_service_fee: [],
        start_time: '',
        end_time: '',
        appoint_type: '',
        cat_fid: '',
        cat_id: '',
        pic: '',
        appoint_pic_content: '',
        description: '',
        keyword: '',
      },
      pic: [],
      showStartTimePicker: false,
      showEndTimePicker: false,
      showServiceTypePicker: false,
      showCategoryPicker: false,
      showStaffLevelPopup: false,
      serviceTypeColumns: ['到店', '上门'],
      categoryColumnsOrigin: [],
      categoryColumns: [],
      // submit锁
      loading: false,
      items: [],
      activeIds: [],
      activeIndex: 0,
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
    // 预约开始时间非空验证
    startTimeLabel() {
      return this.formData.start_time && this.$moment(this.formData.start_time).format('YYYY-MM-DD HH:mm')
    },
    // 预约结束时间非空验证
    endTimeLabel() {
      return this.formData.end_time && this.$moment(this.formData.end_time).format('YYYY-MM-DD HH:mm')
    },
    // 服务类型非空验证
    serviceTypeLabel() {
      return this.serviceTypeColumns[this.formData.appoint_type]
    },
    // 服务类型默认数据
    serviceTypeIndex() {
      return 0
    },
    // 服务商品分类非空验证
    categoryLabel() {
      let resultStr = ''
      if (this.formData.cat_fid === '0' && this.formData.cat_id !== '0') {
        const item = this.categoryColumnsOrigin.find(item => item.id === this.formData.cat_id)
        return item && item.name
      }
      const item = this.categoryColumnsOrigin.find(item => item.id === this.formData.cat_fid)
      if (item) {
        resultStr += item.name
        const child = item.children.find(item => item.id === this.formData.cat_id)
        child && (resultStr += ' / ' + child.name)
      }
      return resultStr
    },
    // 服务商品分类默认数据
    categoryIndex() {
      return 0
    },
  },

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    if (id) {
      this._readServiceDetail(id)
    } else {
      // 读取服务项目分类
      this._getServiceCategoryList()
    }
    this.getPostAndLevel({ appoint_id: id }).then(res => {
      this.items = res.map(item => {
        return {
          id: item.id,
          text: item.name,
          children: item.grade
            ? item.grade.map(item2 => {
                if (item2.select) {
                  this.activeIds.push(item2.id)
                  this.formData.need_service_fee.push({
                    fee: item2.fee,
                    post_id: item.id,
                    technician_grade_id: item2.id,
                  })
                }
                return {
                  id: item2.id,
                  text: item2.name,
                  post_id: item.id,
                }
              })
            : [],
        }
      })
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('commodity', ['getServiceCategoryList', 'createService', 'readServiceDetail']),
    ...mapActions('staff', ['getPostAndLevel']),
    // 预约开始时间开关
    _controlStartTimePicker() {
      this.showStartTimePicker = !this.showStartTimePicker
    },
    // 预约结束时间开关
    _controlEndTimePicker() {
      this.showEndTimePicker = !this.showEndTimePicker
    },
    // 服务类型开关
    _controlServiceTypePicker() {
      this.showServiceTypePicker = !this.showServiceTypePicker
    },
    // 服务商品分类开关
    _controlCategoryPicker() {
      this.showCategoryPicker = !this.showCategoryPicker
    },
    _controlStaffLevelPopup() {
      this.showStaffLevelPopup = !this.showStaffLevelPopup
    },
    // 预约开始时间选择
    _pickStartTime(data) {
      this.formData.start_time = data
      this._controlStartTimePicker()
    },
    // 预约结束时间选择
    _pickEndTime(data) {
      this.formData.end_time = data
      this._controlEndTimePicker()
    },
    // 服务类型选择
    _pickServiceType(data, index) {
      this.formData.appoint_type = index
      this._controlServiceTypePicker()
    },
    // 服务类型分类选择
    _pickCategory(data) {
      if (!data[1]) {
        this.formData.cat_fid = '0'
        this.formData.cat_id = data[0].id
      } else {
        this.formData.cat_fid = data[0].id
        this.formData.cat_id = data[1].id
      }
      this._controlCategoryPicker()
    },
    // 服务商品图片
    _pickPic(data) {
      this.formData.pic = data.map(item => item.url)[0]
    },
    _deletePic(data, index) {
      this.formData.pic = ''
      this.pic.splice(index, 1)
    },
    // 生成服务商品分类 第二行数据
    _changeCategory(picker, values) {
      picker.setColumnValues(1, values[0].children)
    },
    _changeHtml(data) {
      this.formData.appoint_pic_content = data.html
    },
    // 读取服务商品分类
    _getServiceCategoryList(fid, id) {
      // this.getServiceCategoryList().then(res => {
      //   this.categoryColumnsOrigin = res
      //   this._serializationECommerceCategory(fid, id)
      // })
      api.getCategoryList().then(res => {
        this.categoryColumnsOrigin = res.map(item => {
          return {
            ...item,
            children: item.child || [],
          }
        })
        this._serializationECommerceCategory(fid, id)
      })
    },
    _selectLevel(data) {
      const index = this.activeIds.indexOf(data.id)
      if (index === -1) {
        const index2 = this.formData.need_service_fee.findIndex(item => {
          if (item.technician_grade_id === data.id) {
            return item
          }
        })
        this.formData.need_service_fee.splice(index2, 1)
      } else {
        this.formData.need_service_fee.push({
          technician_grade_id: data.id,
          fee: '',
          post_id: data.post_id,
        })
      }
    },
    _getLevelLabel(id) {
      let result = {}
      this.items.forEach(item => {
        item.children.forEach(item2 => {
          if (item2.id == id) {
            result = item2
          }
        })
      })
      return result.text
    },
    // 根据columns原始数据序列化服务商品分类
    _serializationECommerceCategory(fid, id) {
      const data = this.categoryColumnsOrigin
      let index1 = 0
      let index2 = 0
      if (fid && id) {
        index1 = data.findIndex(item => item.id === fid) >= 0 ? data.findIndex(item => item.id === fid) : 0
        index2 =
          data[index1].children.findIndex(item => item.id === id) >= 0
            ? data[index1].children.findIndex(item => item.id === id)
            : 0
      } else if (fid) {
        index1 = data.findIndex(item => item.id === fid) >= 0 ? data.findIndex(item => item.id === fid) : 0
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
    // 查询服务商品详情
    _readServiceDetail(id) {
      this.readServiceDetail(id).then(res => {
        // 阻止编辑器自动获取焦点
        this.$refs.editor.$refs.quillEditor.quill.enable(false)
        const keys = Object.keys(this.formData)
        let arr = res['keyword'].split(',')
        this.keyword1 = arr[0]
        this.keyword2 = arr[1]
        this.keyword3 = arr[2]
        keys.forEach(item => {
          if (item === 'need_service_fee') {
            return false
          }
          this.formData[item] = res[item]
        })
        if (res.start_time !== '0') {
          this.formData.start_time = this.$moment(res.start_time * 1000)
        }
        if (res.end_time !== '0') {
          this.formData.end_time = this.$moment(res.end_time * 1000)
        }
        this.pic = [
          {
            url: res.pic,
          },
        ]
        if (res.cat_fid !== '0') {
          this._getServiceCategoryList(res.cat_fid, res.cat_id)
        } else {
          this._getServiceCategoryList(res.cat_id)
        }
        this.$nextTick(function () {
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
        // 加锁
        this.loading = true
        // 表单完整，进行数据修改并提交
        const { id } = this.$route.params
        const params = JSON.parse(JSON.stringify(this.formData))
        if (id) {
          params.appoint_id = id
        }
        params.start_time = this.$moment(this.formData.start_time).valueOf() / 1000
        params.end_time = this.$moment(this.formData.end_time).valueOf() / 1000
        if (params.need_service_fee.length) {
          params.need_service_personnel = 1
        } else {
          params.need_service_personnel = 0
        }
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
        this.createService(params)
          .then(res => {
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
.staff-level {
  .van-button {
    width: 100%;
  }
}
</style>
