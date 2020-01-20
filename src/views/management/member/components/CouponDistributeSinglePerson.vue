<template>
  <div>
    <van-search @search="_searchUserList" placeholder="请输入搜索关键词" v-model="keyword" />
    <van-radio-group v-if="userList.length" v-model="user">
      <van-cell-group class="margin-bottom" title="选择用户">
        <van-cell
          :key="item.uid"
          :title="item.nickname"
          @click="user = item.uid"
          clickable
          userList
          v-for="item in userList"
        >
          <van-radio :name="item.uid" slot="right-icon" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-divider v-else>暂无用户</van-divider>

    <van-button @click="_controlCouponPicker" class="check-btn" type="primary" v-if="user">选择优惠券</van-button>
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
      keyword: '',
      userList: [],
      user: '',
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
    this._getCouponInMemberGroup()
  },

  destroyed() {},

  methods: {
    ...mapActions('member', ['getCouponInMemberGroup', 'searchUserList', 'distributeSinglePersonCoupon']),
    _controlCouponPicker() {
      this.showCouponPicker = !this.showCouponPicker
    },
    _getCouponInMemberGroup() {
      this.getCouponInMemberGroup().then(res => {
        this.couponList = res
      })
    },
    toggleCoupon(index) {
      this.$refs.checkboxesCoupon[index].toggle()
    },
    _searchUserList() {
      this.searchUserList(this.keyword).then(res => {
        this.userList = res
      })
    },
    _distributeCoupon() {
      if (this.loading) return
      this.loading = true
      this.distributeSinglePersonCoupon({
        uid: this.user,
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
              this.user = ''
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
