<template>
  <div>
    <van-nav-bar :title="`${type}预定`" @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
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
            label="简介"
            placeholder="请填写预定服务简介"
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
        <ValidationProvider name="全价类型" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="priceTypeLabel"
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
          @click-left-icon="$toast('若开启可以选择多个连续的预约时间，且预约金额叠加，若选择两个连续的时间，预约订单最后的总价为设定全价的两倍，以此类推')"
          input-align="right"
          label="日期多选"
          left-icon="question-o"
        >
          <van-switch active-value="1" inactive-value="0" slot="input" v-model="formData.appoint_date_type" />
        </van-field>
        <ValidationProvider name="预约天数" rules="required|numeric|" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            @click-left-icon="$toast('从今天开始算，可以向前预约的天数，最多30天，填写0表示只有今天可以预约，以此类推。')"
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
            label="项目耗时"
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
          :pickEndTime="_pickEndTime"
          :pickStartTime="_pickStartTime"
          endField="预约结束时间"
          endLabel="预约结束时间"
          startField="预约开始时间"
          startLabel="预约开始时间"
        ></time-picker>
      </van-cell-group>
      <img-cropper :confirm="_pickPic" :list="pic" field="预定图片" title="预定图片"></img-cropper>
    </ValidationObserver>
    <!-- 弹出层 -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TimePicker from '@/components/TimePicker'
import ImgCropper from '@/components/ImgCropper'

export default {
  name: 'reserveCommodityCRU',

  mixins: [],

  components: {
    ImgCropper,
    TimePicker,
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
        sort: '',
        start_time: '',
        end_time: '',
        appoint_type: '',
        pic: '',
        is_store: '',
        office_start_time: '',
        office_stop_time: '',
      },
      pic: [],
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
      loading: false,
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    priceTypeLabel() {
      return ''
    },
  },

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    if (id) {
      this._readReserveCommodityDetail(id)
    }
  },

  destroyed() {},

  methods: {
    ...mapActions('commodity', []),
    _pickStartTime(data) {
      this.formData.start_time = this.$moment(data).format('YYYY-MM-DD')
      console.log(data)
    },
    _pickEndTime(data) {
      this.formData.end_time = this.$moment(data).format('YYYY-MM-DD')
      console.log(data)
    },
    _pickPic(data) {
      console.log(data)
    },
    // 提交表单
    async _submit() {
      console.log(this.formData)
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
        let method = 'createReserveCommodity'
        const { id } = this.$route.params
        const params = JSON.parse(JSON.stringify(this.formData))
        if (id) {
          method = 'updateReserveCommodity'
          params.appoint_id = id
        }
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
