<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
      title="预定商品优惠"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group title="基础设置">
        <van-field input-align="right" label="选择车型">
          <van-switch active-value="1" inactive-value="0" slot="input" v-model="formData.is_select_car_model" />
        </van-field>
        <van-field input-align="right" label="输入车牌">
          <van-switch active-value="1" inactive-value="0" slot="input" v-model="formData.is_select_car_license" />
        </van-field>
        <van-field input-align="right" label="显示服务者">
          <van-switch active-value="1" inactive-value="0" slot="input" v-model="formData.is_select_workerstaff" />
        </van-field>
      </van-cell-group>
      <van-cell-group title="用户消费赠送比例" v-if="$getGlobal('dhb_open') !== 0 || $getGlobal('score_open') !== 0">
        <ValidationProvider
          :name="`赠送${$getGlobal('score_alias')}数量`"
          rules="decimal-max4"
          slim
          v-if="$getGlobal('dhb_open') !== 0"
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            :placeholder="`赠送${$getGlobal('score_alias')}数量`"
            label="每消费1元赠送"
            type="number"
            v-model="formData.dhb_get_num"
          >
            <div slot="right-icon">{{ $getGlobal('score_alias') }}</div>
          </van-field>
        </ValidationProvider>
        <ValidationProvider
          :name="`赠送${$getGlobal('dhb_alias')}数量`"
          rules="decimal-max4"
          slim
          v-if="$getGlobal('score_open') !== 0"
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            :placeholder="`赠送${$getGlobal('dhb_alias')}数量`"
            label="每消费1元赠送"
            type="number"
            v-model="formData.score_get_num"
          >
            <div slot="right-icon">{{ $getGlobal('dhb_alias') }}</div>
          </van-field>
        </ValidationProvider>
      </van-cell-group>
      <van-cell-group title="环境配置">
        <ValidationProvider name="环境专区名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            label="环境专区名称"
            placeholder="请填写环境专区名称"
            required
            v-model="formData.envo_area_name"
          ></van-field>
        </ValidationProvider>
      </van-cell-group>
      <van-cell-group :key="index" v-for="(item, index) in envList">
        <div slot="title">
          {{ `环境${index + 1}` }}
          <van-button @click="_deleteEnvironment(index)" size="small" type="danger" v-show="envList.length > 1"
            >删除</van-button
          >
        </div>
        <ValidationProvider :name="`环境名称${index + 1}`" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="环境名称"
            placeholder="请填写环境名称"
            required
            v-model="item.envo_name"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider :name="`每屏数量${index + 1}`" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="每屏数量"
            placeholder="请填写每屏数量"
            required
            v-model="item.envo_screen_num"
          ></van-field>
        </ValidationProvider>
        <img-cropper
          :confirm="_pickEnvBeforeImg"
          :field="`选中前图标${index + 1}`"
          :index="index"
          :list="envBeforeImg[index]"
          title="选中前图标"
        ></img-cropper>
        <img-cropper
          :confirm="_pickEnvAfterImg"
          :field="`选中后图标${index + 1}`"
          :index="index"
          :list="envAfterImg[index]"
          title="选中后图标"
        ></img-cropper>
        <img-cropper
          :confirm="_pickEnvServingImg"
          :field="`服务中图标${index + 1}`"
          :index="index"
          :list="envServingImg[index]"
          title="服务中图标"
        ></img-cropper>
      </van-cell-group>
      <van-button @click="_addEnvironment" class="add-btn" icon="plus" v-show="envList.length < 3">新增环境</van-button>
    </ValidationObserver>

    <div class="white-space"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImgCropper from '@/components/ImgCropper'

export default {
  name: 'eCommercePreferential',

  mixins: [],

  components: {
    ImgCropper,
  },

  props: {},

  data() {
    return {
      formData: {
        is_select_car_model: '0',
        is_select_car_license: '0',
        is_select_workerstaff: '0',
        dhb_get_num: '',
        score_get_num: '',
        envo_area_name: '',
      },
      envList: [],
      envBeforeImg: [],
      envAfterImg: [],
      envServingImg: [],
      loading: false,
    }
  },

  computed: {
    // 自适应120宽度
    resizeWidth() {
      return (120 / 375) * document.body.clientWidth + 'px'
    },
  },

  watch: {},

  created() {},

  mounted() {
    // 商家信息   用来判断是否开启兑换币
    this.readMerchantInfo()
    // 优惠详情
    const id = this.$route.params.id
    id && this._readReserveDetail(id)
  },

  destroyed() {},

  methods: {
    ...mapActions('basicInformation', ['readMerchantInfo']),
    ...mapActions('commodity', ['updateReservePreferential', 'readReserveDetail']),

    // 页面默认数据
    _readReserveDetail(id) {
      this.readReserveDetail(id).then(res => {
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res.appoint_list[item]
        })
        this.formData.give = res.give || []
        this.envList = res.envo_info_list
        res.envo_info_list.forEach(item => {
          item.envo_before_select_pic && this.envBeforeImg.push([{ url: item.envo_before_select_pic }])
          item.envo_after_select_pic && this.envAfterImg.push([{ url: item.envo_after_select_pic }])
          item.envo_serving_pic && this.envServingImg.push([{ url: item.envo_serving_pic }])
        })
      })
    },
    _addEnvironment() {
      this.envList.push({
        envo_name: '',
        envo_screen_num: '',
        envo_before_select_pic: '',
        envo_after_select_pic: '',
        envo_serving_pic: '',
      })
    },
    _deleteEnvironment(index) {
      this.envList.splice(index, 1)
      this.envBeforeImg.splice(index, 1)
      this.envAfterImg.splice(index, 1)
      this.envServingImg.splice(index, 1)
    },
    _pickEnvBeforeImg(data, index) {
      this.envList[index].envo_before_select_pic = data[0].url
    },
    _pickEnvAfterImg(data, index) {
      this.envList[index].envo_after_select_pic = data[0].url
    },
    _pickEnvServingImg(data, index) {
      this.envList[index].envo_serving_pic = data[0].url
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
        const params = JSON.parse(JSON.stringify(this.formData))
        params.appoint_id = this.$route.params.id
        this.envList.forEach(item => {
          for (let key in item) {
            params[key] ? params[key].push(item[key]) : (params[key] = [item[key]])
          }
        })
        // 表单完整，进行数据修改并提交
        this.updateReservePreferential(params)
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
.add-btn {
  width: 100%;
}
</style>
