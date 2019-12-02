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
      </van-cell-group>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'customerMeetGreetingCRU',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        title: '',
        context: '',
      },
      loading: true,
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
        this.formData.title = res.title
        this.formData.context = res.context
      })
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', ['createMeetGreeting', 'getMeetGreetingDetail', 'updateMeetGreeting']),
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
        if (id) {
          method = 'updateMeetGreeting'
          params.id = id
        }
        params.imax_id = imax
        params.type = 1
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

<style lang="less" scoped></style>
