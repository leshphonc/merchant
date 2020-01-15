<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
      title="商家会员卡基础信息"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group title="基础信息">
        <van-cell title="启用">
          <van-switch active-value="1" inactive-value="0" v-model="formData.status"></van-switch>
        </van-cell>
        <img-cropper :confirm="_pickPic" :list="logoList" field="会员卡LOGO" title="会员卡LOGO"></img-cropper>
        <van-cell title="使用默认背景图">
          <van-switch active-value="1" inactive-value="0" v-model="useDefault"></van-switch>
        </van-cell>
        <img-cropper
          :confirm="_pickBG"
          :list="bgList"
          field="背景图"
          title="上传背景图"
          v-if="useDefault !== '1'"
        ></img-cropper>
        <van-cell @click="_controlBackGroundPopup" is-link title="默认背景图">
          <img :src="defaultBg" alt class="default-bg" v-if="useDefault === '1' && defaultBg" />
          <div v-else>请选择</div>
        </van-cell>
        <van-field class="color-input" label="卡号文字颜色" type="color" v-model.trim="formData.numbercolor" />
        <ValidationProvider name="会员卡折扣" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="会员卡折扣"
            placeholder="会员卡折扣数"
            required
            type="number"
            v-model.trim="formData.discount"
          />
        </ValidationProvider>
        <van-cell title="用户自动领卡">
          <div slot="icon">
            <van-icon @click="$toast('用户访问会员卡页面时自动领卡')" name="question-o" />
          </div>
          <van-switch active-value="1" inactive-value="0" v-model="formData.self_get"></van-switch>
        </van-cell>
        <van-cell title="支持实体卡">
          <div slot="icon">
            <van-icon @click="$toast('用户会员卡页面出现绑定实体卡选项')" name="question-o" />
          </div>
          <van-switch active-value="1" inactive-value="0" v-model="formData.is_physical_card"></van-switch>
        </van-cell>
        <van-cell title="扫码自动领卡">
          <div slot="icon">
            <van-icon @click="$toast('扫描商家渠道二维码自动领卡')" name="question-o" />
          </div>
          <van-switch active-value="1" inactive-value="0" v-model="formData.auto_get"></van-switch>
        </van-cell>
        <van-cell title="消费自动领卡">
          <div slot="icon">
            <van-icon @click="$toast('购买商家商品后自动领卡')" name="question-o" />
          </div>
          <van-switch active-value="1" inactive-value="0" v-model="formData.auto_get_buy"></van-switch>
        </van-cell>
        <van-cell title="推送到首页">
          <div slot="icon">
            <van-icon @click="$toast('首页是否显示海报')" name="question-o" />
          </div>
          <van-switch active-value="1" inactive-value="0" v-model="formData.is_index"></van-switch>
        </van-cell>
        <img-cropper :confirm="_pickBanner" :list="bannerList" field="首页海报" title="首页海报"></img-cropper>
      </van-cell-group>
      <van-cell-group title="优惠券">
        <van-cell title="自动领取优惠券">
          <div slot="icon">
            <van-icon @click="$toast('仅限第一次领卡时触发')" name="question-o" />
          </div>
          <van-switch active-value="1" inactive-value="0" v-model="formData.auto_get_coupon"></van-switch>
        </van-cell>
        <van-cell title="消费自动领取优惠券">
          <div slot="icon">
            <van-icon @click="$toast('暂时仅支持微信中购买商家商品自动派发优惠券')" name="question-o" />
          </div>
          <van-switch active-value="1" inactive-value="0" v-model="formData.weixin_send"></van-switch>
        </van-cell>
      </van-cell-group>
      <van-cell-group title="使用说明">
        <ValidationProvider name="会员卡折扣" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="充值说明"
            maxlength="100"
            placeholder="请输入充值说明"
            rows="4"
            show-word-limit
            type="textarea"
            v-model="formData.recharge_des"
          />
        </ValidationProvider>
        <ValidationProvider name="积分说明" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="积分说明"
            maxlength="100"
            placeholder="请输入积分说明"
            rows="4"
            show-word-limit
            type="textarea"
            v-model="formData.score_des"
          />
        </ValidationProvider>
        <ValidationProvider name="会员卡说明" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="会员卡说明"
            maxlength="100"
            placeholder="请输入会员卡说明"
            rows="4"
            show-word-limit
            type="textarea"
            v-model="formData.info"
          />
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
    <!-- 背景图片 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showBackGroundPopup">
      <van-radio-group v-model="formData.bg">
        <van-cell-group>
          <van-cell
            :key="item.url"
            :title="`款式${index + 1}`"
            @click="_pickBackGround(item)"
            center
            clickable
            v-for="(item, index) in defaultBgList"
          >
            <img :src="item.img" alt slot="icon" />
            <van-radio :name="item.url" slot="right-icon" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-button @click="_controlBackGroundPopup">关闭</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImgCropper from '@/components/ImgCropper'
export default {
  name: 'basicMemberCard',

  mixins: [],

  components: {
    ImgCropper,
  },

  props: {},

  data() {
    return {
      formData: {
        status: '0',
        logo: '',
        bg: '',
        diybg: '',
        numbercolor: '#ffffff',
        discount: '',
        self_get: '0',
        is_physical_card: '0',
        auto_get: '0',
        auto_get_buy: '0',
        is_index: '0',
        posters: '',
        auto_get_coupon: '0',
        weixin_send: '0',
        recharge_des: '',
        score_des: '',
        info: '',
      },
      useDefault: '0',
      logoList: [],
      bgList: [],
      bannerList: [],
      defaultBg: '',
      defaultBgList: [],
      showBackGroundPopup: false,
      loading: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.getBasicMemberCard().then(res => {
      const keys = Object.keys(this.formData)
      keys.forEach(item => {
        this.formData[item] = res.card[item]
      })
      res.card.logo && (this.logoList = [{ url: res.card.logo }])
      res.card.diybg && (this.bgList = [{ url: res.card.diybg }])
      res.card.posters && (this.bannerList = [{ url: res.card.posters }])
      if (res.card.diybg) {
        this.useDefault = '0'
      } else {
        this.useDefault = '1'
        this.defaultBg = require(`@/assets/image/${res.card.bg.substr(-13)}`)
      }
    })
    const defaultBgList = []
    for (let i = 1; i < 24; i++) {
      if (i === 10) continue
      if (i === 14) continue
      if (i === 18) continue
      let index = i
      if (i < 10) index = '0' + i
      defaultBgList.push({
        url: `./static/images/card/card_bg${index}.png`,
        img: require(`@/assets/image/card_bg${index}.png`),
      })
    }
    this.defaultBgList = defaultBgList
  },

  destroyed() {},

  methods: {
    ...mapActions('member', ['getBasicMemberCard', 'updateBasicMemberCard']),
    _controlBackGroundPopup() {
      this.showBackGroundPopup = !this.showBackGroundPopup
    },
    _pickBackGround(item) {
      this.defaultBg = item.img
      this.formData.bg = item.url
    },
    _pickPic(data) {
      this.formData.logo = data.map(item => item.url)[0]
    },
    _pickBG(data) {
      this.formData.diybg = data.map(item => item.url)[0]
    },
    _pickBanner(data) {
      this.formData.posters = data.map(item => item.url)[0]
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
        this.useDefault === '0' ? (params.bg = '') : (params.diybg = '')
        this.updateBasicMemberCard(params)
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
.color-input {
  /deep/.van-field__body {
    float: right;
    .van-field__control {
      width: 40px;
    }
  }
}

.van-icon {
  vertical-align: -2px;
  margin-right: 4px;
}

.van-popup {
  padding-bottom: 44px;
  .van-button {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  img {
    width: 200px;
    height: 100px;
    margin-right: 30px;
  }
}

.default-bg {
  width: 100px;
  height: 60px;
}
</style>
