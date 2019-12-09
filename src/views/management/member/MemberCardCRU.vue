<template>
  <div>
    <van-nav-bar
      :title="`${type}会员卡`"
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="实体卡号" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="实体卡号"
            placeholder="会员卡实体卡号"
            required
            type="number"
            v-model.trim="formData.physical_id"
          />
        </ValidationProvider>
        <ValidationProvider name="初始余额" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="初始余额"
            placeholder="会员卡初始余额"
            required
            type="number"
            v-model.trim="formData.card_money_give"
          />
        </ValidationProvider>
        <ValidationProvider name="初始金币" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="初始金币"
            placeholder="会员卡初始金币"
            required
            type="number"
            v-model.trim="formData.card_score"
          />
        </ValidationProvider>
        <ValidationProvider name="会员姓名" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="会员姓名"
            placeholder="会员卡所属会员姓名"
            required
            v-model.trim="formData.truename"
          />
        </ValidationProvider>
        <ValidationProvider name="会员身份证" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="身份证"
            placeholder="请输入身份证号"
            required
            v-model.trim="formData.Id_card"
          />
        </ValidationProvider>
        <van-cell title="状态">
          <van-switch active-value="1" inactive-value="0" v-model="formData.status"></van-switch>
        </van-cell>
      </van-cell-group>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'memberCardCRU',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        physical_id: '',
        card_money_give: '',
        card_score: '',
        truename: '',
        Id_card: '',
        status: '1',
      },
    }
  },

  computed: {
    type() {
      const { id } = this.$route.params
      return id ? '编辑' : '创建'
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('member', ['createMemberCard']),
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
        this.createMemberCard(this.formData)
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
