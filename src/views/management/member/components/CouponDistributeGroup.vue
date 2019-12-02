<template>
  <div>
    <van-checkbox-group v-model="group">
      <van-cell-group class="margin-bottom" title="选择分组">
        <van-cell
          :key="item.id"
          :title="item.name"
          @click="toggleGroup(index)"
          clickable
          v-for="(item, index) in groupList"
        >
          <van-checkbox :name="item.id" ref="checkboxesGroup" slot="right-icon" />
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <van-button @click="_getMemberGroup" class="check-btn" type="primary" v-if="group.length">选择优惠券</van-button>
    <!-- 弹出层 -->
    <!-- 优惠券列表 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCouponPicker">
      <van-checkbox-group v-model="coupon">
        <van-cell-group>
          <van-cell
            :key="item.coupon_id"
            :title="item.name"
            @click="toggleCoupon(index)"
            clickable
            v-for="(item, index) in couponList"
          >
            <van-checkbox :name="item.coupon_id" ref="checkboxesCoupon" slot="right-icon" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <van-button @click="_distributeCoupon" type="primary">派发</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'couponGroupDistribute',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      groupList: [],
      group: [],
      showCouponPicker: false,
      couponList: [],
      coupon: [],
      loading: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this._getCouponGroupList()
  },

  destroyed() {},

  methods: {
    ...mapActions('member', ['getCoupoonGroupList', 'getCouponInMemberGroup', 'distributeGroupCoupon']),
    _controlCouponPicker() {
      this.showCouponPicker = !this.showCouponPicker
    },
    _getCouponGroupList() {
      this.getCoupoonGroupList().then(res => {
        console.log(res)
        this.groupList = res
      })
    },
    _getMemberGroup() {
      this.getCouponInMemberGroup(this.group.join()).then(res => {
        console.log(res)
        this.couponList = res
        this._controlCouponPicker()
      })
    },
    toggleGroup(index) {
      this.$refs.checkboxesGroup[index].toggle()
    },
    toggleCoupon(index) {
      this.$refs.checkboxesCoupon[index].toggle()
    },
    _distributeCoupon() {
      if (this.loading) return
      this.loading = true
      this.distributeGroupCoupon({
        card_group_id: this.group.join(),
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
              this._controlCouponPicker()
              this.coupon = []
              this.group = []
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

.van-popup {
  .van-button {
    width: 100%;
  }
}
.margin-bottom {
  margin-bottom: 44px;
}
</style>
