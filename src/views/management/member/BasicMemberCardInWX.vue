<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
      title="微信会员卡"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group title="基本信息">
        <ValidationProvider name="会员卡名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="会员卡名称"
            placeholder="会员卡名称"
            required
            v-model.trim="formData.wx_title"
          />
        </ValidationProvider>
        <ValidationProvider name="会员卡提醒" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="会员卡提醒"
            placeholder="提醒文字"
            required
            v-model.trim="formData.wx_notice"
          />
        </ValidationProvider>
        <ValidationProvider name="卡券颜色" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="formData.wx_color"
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
        <ValidationProvider name="特权说明" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="特权说明"
            maxlength="50"
            placeholder="说明文本"
            required
            rows="3"
            show-word-limit
            type="textarea"
            v-model.trim="formData.wx_prerogative"
          />
        </ValidationProvider>
      </van-cell-group>
      <van-cell-group title="中间按钮">
        <ValidationProvider name="中间按钮标题" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="标题"
            placeholder="标题"
            required
            v-model.trim="formData.wx_center_title"
          />
        </ValidationProvider>
        <ValidationProvider name="中间按钮副标题" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="副标题"
            placeholder="副标题"
            required
            v-model.trim="formData.wx_center_sub_title"
          />
        </ValidationProvider>
        <ValidationProvider name="中间按钮链接地址" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="链接地址"
            placeholder="链接地址"
            required
            v-model.trim="formData.wx_center_url"
          />
        </ValidationProvider>
      </van-cell-group>
      <van-cell-group title="自定义类目1（选填）">
        <van-field label="标题" placeholder="标题" v-model.trim="formData.wx_custom_url_name" />
        <van-field label="副标题" placeholder="副标题" v-model.trim="formData.wx_custom_url_sub_title" />
        <van-field label="链接地址" placeholder="链接地址" v-model.trim="formData.wx_custom_url" />
      </van-cell-group>
      <van-cell-group title="自定义类目2（选填）">
        <van-field label="标题" placeholder="标题" v-model.trim="formData.wx_custom_cell1_name" />
        <van-field label="副标题" placeholder="副标题" v-model.trim="formData.wx_custom_cell1_tips" />
        <van-field label="链接地址" placeholder="链接地址" v-model.trim="formData.wx_custom_cell1_url" />
      </van-cell-group>
      <van-cell-group title="自定义类目3（选填）">
        <van-field label="标题" placeholder="标题" v-model.trim="formData.wx_custom_cell2_name" />
        <van-field label="副标题" placeholder="副标题" v-model.trim="formData.wx_custom_cell2_tips" />
        <van-field label="链接地址" placeholder="链接地址" v-model.trim="formData.wx_custom_cell2_url" />
      </van-cell-group>
      <van-cell-group title="自定义类目4（选填）">
        <van-field label="标题" placeholder="标题" v-model.trim="formData.wx_promotion_url_name" />
        <van-field label="副标题" placeholder="副标题" v-model.trim="formData.wx_promotion_url_sub_title" />
        <van-field label="链接地址" placeholder="链接地址" v-model.trim="formData.wx_promotion_url" />
      </van-cell-group>
      <van-checkbox-group v-model="serviceList">
        <van-cell-group title="服务类型（设置后不能取消）">
          <van-cell
            :key="item.value"
            :title="item.label"
            @click="_toggle(index, formData.wx_business_service.indexOf(item.value) > -1)"
            center
            is-link
            v-for="(item, index) in serviceColumns"
          >
            <van-checkbox
              :disabled="formData.wx_business_service.indexOf(item.value) > -1"
              :name="item.value"
              ref="checkboxes"
              slot="right-icon"
            ></van-checkbox>
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
            >删除</van-button
          >
        </div>
        <img-cropper
          :confirm="_pickPic"
          :field="`图文${index + 1}`"
          :index="index"
          :list="imageText[index].wx_image_url"
          :title="`图文${index + 1}`"
        ></img-cropper>
        <ValidationProvider :name="`图文描述${index + 1}`" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label="`图文描述${index + 1}`"
            placeholder="请填写图文描述"
            required
            v-model.trim="imageText[index].wx_text"
          />
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
    <!-- 颜色选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showColorPicker">
      <van-radio-group v-model="formData.wx_color">
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

export default {
  name: 'basicMemberCardInWX',

  mixins: [],

  components: {
    ImgCropper,
  },

  props: {},

  data() {
    return {
      formData: {
        wx_title: '',
        wx_notice: '',
        wx_color: '',
        wx_prerogative: '',
        wx_center_title: '',
        wx_center_sub_title: '',
        wx_center_url: '',
        wx_custom_url_name: '',
        wx_custom_url_sub_title: '',
        wx_custom_url: '',
        wx_custom_cell1_name: '',
        wx_custom_cell1_tips: '',
        wx_custom_cell1_url: '',
        wx_custom_cell2_name: '',
        wx_custom_cell2_tips: '',
        wx_custom_cell2_url: '',
        wx_promotion_url_name: '',
        wx_promotion_url_sub_title: '',
        wx_promotion_url: '',
        wx_business_service: [],
        wx_image_url: [],
        wx_text: [],
      },
      showColorPicker: false,
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
      serviceList: [],
      colorList: {},
      imageText: [{ wx_image_url: [], wx_text: '' }],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.getBasicMemberCard().then(res => {
      const keys = Object.keys(this.formData)
      keys.forEach(item => {
        this.formData[item] = res.card.wx_param[item.substr(3)]
      })

      this.formData.wx_image_url = []
      this.formData.wx_text = []
      if (res.card.wx_param.text_image_list) {
        const imageText = res.card.wx_param.text_image_list.map(item => {
          this.formData.wx_image_url.push(item.image_url)
          this.formData.wx_text.push(item.text)
          return {
            wx_image_url: [{ url: item.image_url }],
            wx_text: item.text,
          }
        })
        this.imageText = imageText
      }
      this.colorList = res.color_list
      // 兼容数据
      this.formData.wx_business_service = res.card.wx_param.wx_business_service || []
      this.serviceList = res.card.wx_param.business_service || []
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('member', ['getBasicMemberCard', 'updateBasicMemberCardInWX']),
    _controlColorPicker() {
      this.showColorPicker = !this.showColorPicker
    },
    _pickColor(name) {
      this.formData.wx_color = name
    },
    // 因为使用imageText渲染列表，选择图片后自动会覆盖指针数据，所以此方法不需要使用
    _pickPic() {},
    _addImageText() {
      this.imageText.push({ wx_image_url: [], wx_text: '' })
    },
    _deleteImageText(index) {
      this.imageText.splice(index, 1)
    },
    _toggle(index, flag) {
      !flag && this.$refs.checkboxes[index].toggle()
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
        const params = JSON.parse(JSON.stringify(this.formData))
        params.wx_image_url = []
        params.wx_text = []
        this.imageText.forEach(item => {
          params.wx_image_url.push(item.wx_image_url[0].url)
          params.wx_text.push(item.wx_text)
        })
        params.wx_business_service = this.serviceList
        this.updateBasicMemberCardInWX(params)
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
  padding-bottom: 44px;
  .van-button {
    position: fixed;
    bottom: 0;
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
