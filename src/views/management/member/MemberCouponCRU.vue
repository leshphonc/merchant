<template>
  <div>
    <van-nav-bar :title="`${type}优惠券`" @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="优惠券名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="优惠券名称"
            placeholder="优惠券名称"
            required
            v-model.trim="formData.name"
          />
        </ValidationProvider>
        <img-cropper :confirm="_pickImg" :list="imgList" field="图片" title="图片"></img-cropper>
        <van-cell title="与商家优惠券同时使用">
          <van-switch active-value="1" inactive-value="0" v-model="formData.use_with_card"></van-switch>
        </van-cell>
        <ValidationProvider name="店铺" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="formData.store_id.length ? '1' : ''"
            @click="_controlStorePopup"
            error-message-align="right"
            input-align="right"
            is-link
            label="选择店铺"
            placeholder="请选择"
            readonly
            required
          >
            <div slot="input" v-if="formData.store_id.length">
              <div :key="item" v-for="item in formData.store_id">
                <van-tag type="primary">{{ _storeLabel(item) }}</van-tag>
              </div>
            </div>
          </van-field>
        </ValidationProvider>
        <van-field
          :disabled="$route.params.id ? true : false"
          :value="autoReceiveLabel"
          @click="_controlAutoReceivePicker"
          error-message-align="right"
          input-align="right"
          is-link
          label="领取优惠券"
          placeholder="请选择"
          readonly
          required
        ></van-field>
        <van-cell title="在领券中心显示" v-if="formData.auto_get === '0'">
          <van-switch
            :disabled="$route.params.id ? true : false"
            active-value="1"
            inactive-value="0"
            v-model="formData.is_show"
          ></van-switch>
        </van-cell>
        <van-cell title="是否为商品兑换券" v-if="formData.auto_get === '0'">
          <van-switch
            :disabled="$route.params.id ? true : false"
            active-value="1"
            inactive-value="0"
            v-model="formData.is_free"
          ></van-switch>
        </van-cell>
        <ValidationProvider
          name="单笔消费额度"
          rules="required|numeric"
          slim
          v-if="formData.auto_get === '2'"
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            label="单笔消费额度"
            placeholder="单笔消费到达此额度自动领取优惠券"
            required
            type="number"
            v-model.trim="formData.auto_get_money_limit"
          />
        </ValidationProvider>
        <van-cell title="只允许新用户领取">
          <van-switch active-value="1" inactive-value="0" v-model="formData.allow_new"></van-switch>
        </van-cell>
        <van-field
          :disabled="$route.params.id ? true : false"
          :value="userLevelLabel"
          @click="_controlUserLevelPicker"
          input-align="right"
          is-link
          label="会员等级"
          readonly
          required
        />
        <ValidationProvider name="使用类别" rules="required" slim v-slot="{ errors }">
          <van-field
            :disabled="$route.params.id ? true : false"
            :error-message="errors[0]"
            :value="categoryLabel"
            @click="_controlCategoryPicker"
            input-align="right"
            is-link
            label="使用类别"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider
          name="使用类别2"
          rules="required"
          slim
          v-if="secondCategoryColumns.length !== 0"
          v-slot="{ errors }"
        >
          <van-field
            :disabled="$route.params.id ? true : false"
            :error-message="errors[0]"
            :value="secondCategoryLabel"
            @click="_controlSecondCategoryPicker"
            input-align="right"
            is-link
            label="使用类别2"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider
          name="使用类别3"
          rules="required"
          slim
          v-if="thirdCategoryColumns.length !== 0"
          v-slot="{ errors }"
        >
          <van-field
            :disabled="$route.params.id ? true : false"
            :error-message="errors[0]"
            :value="thirdCategoryColumns"
            @click="_controlThirdCategoryPicker"
            input-align="right"
            is-link
            label="使用类别3"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider name="简短描述" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="简短描述"
            maxlength="50"
            placeholder="微信卡券优惠说明"
            required
            rows="3"
            show-word-limit
            type="textarea"
            v-model.trim="formData.des"
          />
        </ValidationProvider>
        <ValidationProvider name="使用说明" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="简短描述"
            maxlength="50"
            placeholder="微信卡券使用须知"
            required
            rows="3"
            show-word-limit
            type="textarea"
            v-model.trim="formData.des_detial"
          />
        </ValidationProvider>
        <ValidationProvider name="数量" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :disabled="$route.params.id ? true : false"
            :error-message="errors[0]"
            label="数量"
            placeholder="优惠券总数量"
            required
            type="number"
            v-model.trim="formData.num"
          />
        </ValidationProvider>
        <ValidationProvider name="领取数量限制" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :disabled="$route.params.id ? true : false"
            :error-message="errors[0]"
            label="领取数量限制"
            placeholder="每人最多领取数量"
            required
            type="number"
            v-model.trim="formData.limit"
          />
        </ValidationProvider>
        <ValidationProvider name="使用数量限制" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :disabled="$route.params.id ? true : false"
            :error-message="errors[0]"
            label="使用数量限制"
            placeholder="每人最多可使用数量"
            required
            type="number"
            v-model.trim="formData.use_limit"
          />
        </ValidationProvider>
        <ValidationProvider name="优惠金额" rules="required|decimal-max1" slim v-slot="{ errors }">
          <van-field
            :disabled="$route.params.id ? true : false"
            :error-message="errors[0]"
            label="优惠金额"
            placeholder="优惠金额"
            required
            type="number"
            v-model.trim="formData.discount"
          />
        </ValidationProvider>
        <ValidationProvider name="最小订单金额" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :disabled="$route.params.id ? true : false"
            :error-message="errors[0]"
            label="最小订单金额"
            placeholder="最小订单金额"
            required
            type="number"
            v-model.trim="formData.order_money"
          />
        </ValidationProvider>
        <time-picker
          :data="[formData.start_time, formData.end_time]"
          :disabled="$route.params.id ? true : false"
          :pickEndTime="_pickEndTime"
          :pickStartTime="_pickStartTime"
          endField="可领结束时间"
          endLabel="可领结束时间"
          startField="可领开始时间"
          startLabel="可领开始时间"
        ></time-picker>
        <time-picker
          :data="[formData.effe_start_time, formData.effe_end_time]"
          :disabled="$route.params.id ? true : false"
          :pickEndTime="_pickEffectEndTime"
          :pickStartTime="_pickEffectStartTime"
          endField="使用结束时间"
          endLabel="使用结束时间"
          startField="使用开始时间"
          startLabel="使用开始时间"
        ></time-picker>
        <van-cell title="开启状态">
          <van-switch active-value="1" inactive-value="0" v-model="formData.status"></van-switch>
        </van-cell>
      </van-cell-group>
      <van-checkbox-group v-model="formData.platform">
        <van-cell-group title="使用系统">
          <van-cell @click="_togglePlatForm('wap')" clickable title="移动网页">
            <van-checkbox :disabled="$route.params.id ? true : false" name="wap" ref="wap" slot="right-icon"></van-checkbox>
          </van-cell>
          <van-cell @click="_togglePlatForm('app')" clickable title="APP">
            <van-checkbox :disabled="$route.params.id ? true : false" name="app" ref="app" slot="right-icon"></van-checkbox>
          </van-cell>
          <van-cell @click="_togglePlatForm('weixin')" clickable title="微信">
            <van-checkbox :disabled="$route.params.id ? true : false" name="weixin" ref="weixin" slot="right-icon"></van-checkbox>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <van-cell-group title="微信" v-if="!$route.params.id">
        <van-cell title="同步到微信卡包">
          <van-switch active-value="1" inactive-value="0" v-model="formData.sync_wx"></van-switch>
        </van-cell>
        <div v-if="formData.sync_wx === '1'">
          <ValidationProvider name="卡券颜色" rules="required" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              :value="formData.color"
              @click="_controlColorPicker"
              error-message-align="right"
              input-align="right"
              is-link
              label="卡券颜色"
              placeholder="请选择"
              readonly
              required
            />
          </ValidationProvider>
          <ValidationProvider name="商家名称" rules="required|max:12" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="商家名称"
              placeholder="12个汉字以内"
              required
              v-model.trim="formData.brand_name"
            />
          </ValidationProvider>
          <ValidationProvider name="卡券提示" rules="required|max:16" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="卡券提示"
              placeholder="16个汉字以内"
              required
              v-model.trim="formData.notice"
            />
          </ValidationProvider>
          <img-cropper :confirm="_pickCover" :list="coverList" field="封面图片" title="封面图片"></img-cropper>
          <ValidationProvider name="封面描述" rules="required" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              autosize
              label="封面描述"
              maxlength="50"
              placeholder="封面描述"
              required
              rows="3"
              show-word-limit
              type="textarea"
              v-model.trim="formData.abstract"
            />
          </ValidationProvider>
          <van-checkbox-group v-model="formData.business_service">
            <van-cell-group title="服务类型">
              <van-cell
                :key="item.value"
                :title="item.label"
                @click="_toggleService(index)"
                center
                is-link
                v-for="(item, index) in serviceColumns"
              >
                <van-checkbox :name="item.value" ref="checkboxesS" slot="right-icon"></van-checkbox>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
          <van-cell-group title="图文消息">
            <van-button @click="_addImageText" class="add-btn" icon="plus">新增</van-button>
          </van-cell-group>
          <van-cell-group :key="index" v-for="(item, index) in imageText">
            <div slot="title">
              {{ `图文消息${index + 1}` }}
              <van-button
                @click="_deleteImageText(index)"
                class="delete-btn"
                size="small"
                type="danger"
                v-if="imageText.length > 1"
              >删除</van-button>
            </div>
            <img-cropper
              :confirm="_pickImageText"
              :field="`图文${index + 1}`"
              :index="index"
              :list="imageText[index].image_url"
              :title="`图文${index + 1}`"
            ></img-cropper>
            <ValidationProvider :name="`图文描述${index + 1}`" rules="required" slim v-slot="{ errors }">
              <van-field
                :error-message="errors[0]"
                :label="`图文描述${index + 1}`"
                placeholder="请填写图文描述"
                required
                v-model.trim="imageText[index].text"
              />
            </ValidationProvider>
          </van-cell-group>
        </div>
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
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
    <!-- 优惠券领取方式 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showAutoReceivePicker">
      <van-picker
        :columns="autoReceiveColumns"
        @cancel="_controlAutoReceivePicker"
        @confirm="_pickAutoReceive"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 会员等级 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showUserLevelPicker">
      <van-picker
        :columns="userLevelColumns"
        @cancel="_controlUserLevelPicker"
        @confirm="_pickUserLevel"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 使用类别 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCategoryPicker">
      <van-picker
        :columns="categoryColumns"
        @cancel="_controlCategoryPicker"
        @confirm="_pickCategory"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 二级类别 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showSecondCategoryPicker">
      <van-picker
        :columns="secondCategoryColumns"
        @cancel="_controlSecondCategoryPicker"
        @confirm="_pickSecondCategory"
        show-toolbar
        value-key="cat_name"
      ></van-picker>
    </van-popup>
    <!-- 三级类别 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showThirdCategoryPicker">
      <van-picker
        :columns="thirdCategoryColumns"
        @cancel="_controlThirdCategoryPicker"
        @confirm="_pickThirdCategory"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 颜色选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showColorPicker">
      <van-radio-group v-model="formData.color">
        <van-cell-group>
          <van-cell
            :key="name"
            :style="{ color: value }"
            :title="`${name} - ${value}`"
            @click="_pickColor(name)"
            clickable
            v-for="(value, name) in colorList"
          >
            <van-radio :name="name" slot="right-icon"></van-radio>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-button @click="_controlColorPicker">关闭</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImgCropper from '@/components/ImgCropper'
import TimePicker from '@/components/TimePicker'

export default {
  name: 'memberCouponCRU',

  mixins: [],

  components: {
    ImgCropper,
    TimePicker,
  },

  props: {},

  data() {
    return {
      formData: {
        name: '',
        img: '',
        use_with_card: '0',
        store_id: [],
        auto_get: '0',
        is_show: '0',
        is_free: '0',
        auto_get_money_limit: '',
        allow_new: '0',
        user_level: '0',
        cate_name: 'all',
        cate_id: '',
        goods_id: '',
        des: '',
        des_detial: '',
        num: '',
        limit: '',
        use_limit: '',
        discount: '',
        order_money: '',
        start_time: '',
        end_time: '',
        effe_start_time: '',
        effe_end_time: '',
        status: '0',
        platform: [],
        sync_wx: '',
        color: '',
        brand_name: '',
        notice: '',
        icon_url_list: '',
        abstract: '',
        business_service: [],
        wx_image: [],
      },
      imgList: [],
      showStorePopup: false,
      showAutoReceivePicker: false,
      showUserLevelPicker: false,
      showCategoryPicker: false,
      showSecondCategoryPicker: false,
      showThirdCategoryPicker: false,
      showColorPicker: false,
      storeList: [],
      cache: [],
      autoReceiveColumns: [
        { label: '不自动领取', value: '0' },
        { label: '领卡时自动领取', value: '1' },
        { label: '单笔消费达到额度自动领取', value: '2' },
      ],
      userLevelColumns: [
        { label: '普通及以上会员', value: '0' },
        { label: '青铜会员及以上会员', value: '1' },
        { label: '白银会员及以上会员', value: '2' },
        { label: '黄金会员及以上会员', value: '3' },
        { label: '城市合伙人及以上会员', value: '4' },
      ],
      serviceColumns: [
        {
          label: '外卖服务',
          value: 'BIZ_SERVICE_DELIVER',
        },
        {
          label: '停车位',
          value: 'BIZ_SERVICE_FREE_PARK',
        },
        {
          label: '可带宠物',
          value: 'BIZ_SERVICE_WITH_PET',
        },
        {
          label: '免费Wi-Fi',
          value: 'BIZ_SERVICE_FREE_WIFI',
        },
      ],
      categoryColumns: [],
      secondCategoryColumns: [],
      thirdCategoryColumns: [],
      colorList: {},
      coverList: [],
      imageText: [],
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    autoReceiveLabel() {
      const item = this.autoReceiveColumns.find(item => item.value === this.formData.auto_get)
      return item && item.label
    },
    userLevelLabel() {
      const item = this.userLevelColumns.find(item => item.value === this.formData.user_level)
      return item && item.label
    },
    categoryLabel() {
      const item = this.categoryColumns.find(item => item.value === this.formData.cate_name)
      return item && item.label
    },
    secondCategoryLabel() {
      const item = this.secondCategoryColumns.find(item => item.cat_id === this.formData.cate_id)
      return item && item.cat_name
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getStoreList()
    this._getCouponCategory()
    this._getCouponColorList()
    const { id } = this.$route.params
    id && this._getCouponDetail(id)
  },

  destroyed() {},

  methods: {
    ...mapActions(['getStoreList']),
    ...mapActions('member', [
      'getCouponDetail',
      'getCouponCategory',
      'getCouponSecondCategory',
      'getCouponThirdCategory',
      'getCouponColorList',
      'createCoupon',
      'updateCoupon',
    ]),
    // 店铺选择开关
    _controlStorePopup() {
      this.showStorePopup = !this.showStorePopup
    },
    _controlAutoReceivePicker() {
      const { id } = this.$route.params
      if (id) return
      this.showAutoReceivePicker = !this.showAutoReceivePicker
    },
    _controlUserLevelPicker() {
      const { id } = this.$route.params
      if (id) return
      this.showUserLevelPicker = !this.showUserLevelPicker
    },
    _controlCategoryPicker() {
      const { id } = this.$route.params
      if (id) return
      this.showCategoryPicker = !this.showCategoryPicker
    },
    _controlSecondCategoryPicker() {
      const { id } = this.$route.params
      if (id) return
      this.showSecondCategoryPicker = !this.showSecondCategoryPicker
    },
    _controlThirdCategoryPicker() {
      const { id } = this.$route.params
      if (id) return
      this.showThirdCategoryPicker = !this.showThirdCategoryPicker
    },
    _controlColorPicker() {
      this.showColorPicker = !this.showColorPicker
    },
    _pickCategory(data) {
      this.formData.cate_name = data.value
      this._controlCategoryPicker()
      this.getCouponSecondCategory(data.value).then(res => {
        console.log(res)
        if (res) {
          this.secondCategoryColumns = res
        } else {
          this.secondCategoryColumns = []
        }
      })
    },
    _pickSecondCategory(data) {
      this.formData.cate_id = data.cat_id
      this._controlSecondCategoryPicker()
      this.getCouponThirdCategory({
        order_type: this.formData.cate_name,
        order_cate: data.cat_id,
      }).then(res => {
        if (res) {
          this.thirdCategoryColumns = res
        } else {
          this.thirdCategoryColumns = []
        }
      })
    },
    _pickThirdCategory(data) {
      this.formData.goods_id = data.value
      this._controlThirdCategoryPicker()
    },
    _pickUserLevel(data) {
      this.formData.user_level = data.value
      this._controlUserLevelPicker()
    },
    _pickImg(data) {
      this.formData.img = data[0].url
    },
    _pickImageText(data, index) {
      this.imageText[index].image_url = [{ url: data[0].url }]
    },
    _pickAutoReceive(data) {
      this.formData.auto_get = data.value
      this._controlAutoReceivePicker()
    },
    // 开始时间与结束时间选择
    _pickStartTime(data) {
      this.formData.start_time = this.$moment(data).format('YYYY-MM-DD')
    },
    _pickEndTime(data) {
      this.formData.end_time = this.$moment(data).format('YYYY-MM-DD')
    },
    _pickEffectStartTime(data) {
      this.formData.effe_start_time = this.$moment(data).format('YYYY-MM-DD')
    },
    _pickEffectEndTime(data) {
      this.formData.effe_end_time = this.$moment(data).format('YYYY-MM-DD')
    },
    // 选择颜色
    _pickColor(name) {
      this.formData.color = name
    },
    // 添加一条图文
    _addImageText() {
      this.imageText.push({ image_url: [], text: '' })
    },
    // 删除一条图文
    _deleteImageText(index) {
      this.imageText.splice(index, 1)
    },
    // 读取店铺列表
    _getStoreList() {
      this.getStoreList().then(res => {
        this.storeList = res.store_list
      })
    },
    // 获取店铺名称
    _storeLabel(id) {
      const item = this.storeList.find(item => item.value === id)
      return item && `${item.label} - ${item.adress}`
    },
    // 店铺checkbox
    _toggle(index, flag) {
      // 判断是否选可选
      !flag && this.$refs.checkboxes[index].toggle()
    },
    // 使用平台checkbox
    _togglePlatForm(ref) {
      const { id } = this.$route.params
      !id && this.$refs[ref].toggle()
    },
    // 服务类型checkbox
    _toggleService(index) {
      this.$refs.checkboxesS[index].toggle()
    },
    // 选择店铺
    _pickStore() {
      const arr = []
      console.log(this.cache)
      this.cache.forEach(item => {
        arr.push(item.value)
      })
      this.formData.store_id = arr
      this._controlStorePopup()
    },
    _pickCover(data) {
      this.formData.icon_url_list = data[0].url
    },
    // 获取详情
    _getCouponDetail(id) {
      this.getCouponDetail(id).then(res => {
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res.coupon[item]
        })
        this.imgList = [{ url: res.coupon.img }]
        this.getCouponSecondCategory(res.coupon.cate_name).then(res => {
          console.log(res)
          if (res) {
            this.secondCategoryColumns = res
          } else {
            this.secondCategoryColumns = []
          }
        })
        res.coupon.card_id &&
          this.getCouponThirdCategory({
            order_type: res.coupon.cate_name,
            order_cate: res.coupon.cat_id,
          }).then(res => {
            if (res) {
              this.thirdCategoryColumns = res
            } else {
              this.thirdCategoryColumns = []
            }
          })
        console.log(res)
      })
    },
    // 获取优惠券使用类别
    _getCouponCategory() {
      this.getCouponCategory().then(res => {
        const arr = []
        for (let item in res) {
          arr.push({
            value: item,
            label: res[item],
          })
        }
        this.categoryColumns = arr
      })
    },
    // 获取优惠券颜色列表
    _getCouponColorList() {
      this.getCouponColorList().then(res => {
        this.colorList = res
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
        this.loading = true
        let method = 'createCoupon'
        const { id } = this.$route.params
        const params = JSON.parse(JSON.stringify(this.formData))
        if (id) {
          method = 'updateCoupon'
          params.coupon_id = id
        }
        params.wx_image = this.imageText.map(item => {
          return {
            image_url: item.image_url[0].url,
            text: item.text,
          }
        })
        console.log(params)
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
.van-popup {
  .cache-list {
    height: 65vh;
    overflow: scroll;
  }
  .van-button {
    width: 100%;
  }
}

.add-btn {
  width: 100%;
}
.delete-btn {
  margin-left: 5px;
}
</style>
