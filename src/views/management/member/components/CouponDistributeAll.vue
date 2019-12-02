<template>
  <div>
    <van-checkbox-group v-model="coupon">
      <van-cell-group class="margin-bottom" title="选择优惠券">
        <van-cell
          :key="item.coupon_id"
          :title="item.name"
          @click="_toggleGroup(index)"
          clickable
          v-for="(item, index) in couponList"
        >
          <van-checkbox :name="item.coupon_id" ref="checkboxesCoupon" slot="right-icon" />
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <van-button @click="_distribute" class="check-btn" type="primary" v-if="coupon.length">派发给所有用户</van-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'couponDistributeAll',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      couponList: [],
      coupon: [],
      loading: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.getAllCouponGroup().then(res => {
      this.couponList = res.coupon_list
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('member', ['getAllCouponGroup', 'distributeGroupCoupon']),
    _toggleGroup(index) {
      this.$refs.checkboxesCoupon[index].toggle()
    },
    _distribute() {
      if (this.loading) return
      this.loading = true
      this.distributeGroupCoupon({
        all: 1,
        coupon_id: this.coupon.join(),
      })
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this.coupon = []
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
.check-btn {
  position: fixed;
  width: 100%;
  bottom: 0;
}

.margin-bottom {
  margin-bottom: 44px;
}
</style>
