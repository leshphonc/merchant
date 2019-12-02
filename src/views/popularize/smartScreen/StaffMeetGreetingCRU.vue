<template>
  <div>
    <van-nav-bar :title="`${type}见面语`" @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="见面语名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="名称"
            placeholder="请输入见面语名称"
            required
            v-model.trim="formData.title"
          />
        </ValidationProvider>
        <ValidationProvider name="见面语内容" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="内容"
            maxlength="50"
            placeholder="请输入见面语内容"
            required
            rows="3"
            show-word-limit
            type="textarea"
            v-model.trim="formData.context"
          />
        </ValidationProvider>
        <time-picker
          :data="[formData.start_time, formData.end_time]"
          :pickEndTime="_pickEndTime"
          :pickStartTime="_pickStartTime"
          endField="播报结束时间"
          endLabel="播报结束时间"
          startField="播报开始时间"
          startLabel="播报开始时间"
          type="datetime"
          v-if="$route.query.staff_id"
        ></time-picker>
        <ValidationProvider name="播报次数" rules="required|numeric" slim v-if="$route.query.staff_id" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="播报次数"
            placeholder="请输入播报次数"
            required
            v-model.trim="formData.num"
          />
        </ValidationProvider>
      </van-cell-group>
      <div class="footer">已播报 {{ used }} 次</div>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TimePicker from '@/components/TimePicker'

export default {
  name: 'staffMeetGreetingCRU',

  mixins: [],

  components: {
    TimePicker,
  },

  props: {},

  data() {
    return {
      formData: {
        title: '',
        context: '',
        start_time: this.$moment()
          .subtract(30, 'days')
          .format('YYYY-MM-DD HH:mm'),
        end_time: this.$moment().format('YYYY-MM-DD HH:mm'),
        num: '',
      },
      used: 0,
      loading: false,
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
  },

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    id &&
      this.getMeetGreetingDetail(id).then(res => {
        console.log(res)
        this.formData.title = res.title
        this.formData.context = res.context
        this.formData.start_time = this.$moment(res.start_time * 1000).format('YYYY-MM-DD HH:mm')
        this.formData.end_time = this.$moment(res.end_time * 1000).format('YYYY-MM-DD HH:mm')
        this.formData.num = res.num
        this.formData.used = res.used
      })
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', ['createMeetGreeting', 'getMeetGreetingDetail', 'updateMeetGreeting']),
    _pickStartTime(data) {
      console.log(data)
      this.formData.start_time = this.$moment(data).format('YYYY-MM-DD HH:mm')
    },
    _pickEndTime(data) {
      this.formData.end_time = this.$moment(data).format('YYYY-MM-DD HH:mm')
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
        let method = 'createMeetGreeting'
        const params = JSON.parse(JSON.stringify(this.formData))
        const { imax, id } = this.$route.params
        const { staff_id } = this.$route.query
        if (id) {
          method = 'updateMeetGreeting'
          params.id = id
        }
        params.imax_id = imax
        params.type = 2
        staff_id && (params.staff_id = staff_id)
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
.footer {
  color: @gray-deep-c;
  font-size: 12px;
  padding: 4px 16px;
}
</style>
