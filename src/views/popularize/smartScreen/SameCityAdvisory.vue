<template>
  <div>
    <van-nav-bar
      title="同城咨询"
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-checkbox-group v-model="result">
      <van-cell-group title="选中的商家会出现在智能屏咨询列表内">
        <van-cell
          center
          v-for="(item, index) in list"
          clickable
          :key="item.mer_id"
          :title="item.name"
          @click="toggle(index)"
        >
          <template #icon>
            <van-image :src="item.service_ico" />
          </template>
          <template #right-icon>
            <van-checkbox :name="item.mer_id" ref="checkboxes" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Toast } from '../../../common/vant'

export default {
  name: 'sameCityAdvisory',
  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      result: [],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this._getSameCityMerchant()
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', ['getSameCityMerchant', 'saveSameCityAdvisory']),
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    _getSameCityMerchant() {
      if (localStorage.getItem('merchant_user')) {
        const { imax } = this.$route.params
        let merchant_user = JSON.parse(localStorage.getItem('merchant_user'))
        this.getSameCityMerchant({ imei: imax, mer_id: merchant_user.mer_id }).then(res => {
          this.list = res.list
          this.result = res.mer_ids.split(',')
        })
      } else {
        this.$reLogin()
      }
    },
    _submit() {
      if (localStorage.getItem('merchant_user')) {
        const { imax } = this.$route.params
        let merchant_user = JSON.parse(localStorage.getItem('merchant_user'))
        this.saveSameCityAdvisory({ imei: imax, mer_ids: this.result.join(',') }).then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1000,
          })
        })
      } else {
        this.$reLogin()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.van-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
</style>
