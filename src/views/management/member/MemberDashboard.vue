<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="会员管理"></van-nav-bar>
    <div class="nav-bar-holder-sp"></div>
    <van-row gutter="10">
      <van-col :key="item.title" @click="_goDetail(item.url)" span="12" v-for="item in grid1">
        <div>
          <img :src="item.icon" alt />
        </div>
        <div>
          <div>{{ item.count }}</div>
          <div>
            {{ item.title }}
            <van-icon name="arrow" />
          </div>
        </div>
      </van-col>
    </van-row>
    <div class="white-space"></div>
    <van-row gutter="10">
      <van-col :key="item.title" @click="_goDetail(item.url)" span="12" v-for="item in grid2">
        <div>
          <img :src="item.icon" alt />
        </div>
        <div>
          <div>{{ item.count }}</div>
          <div>
            {{ item.title }}
            <van-icon name="arrow" />
          </div>
        </div>
      </van-col>
    </van-row>
    <div class="white-space"></div>
    <van-row gutter="10">
      <van-col :key="item.title" @click="_goDetail(item.url)" span="12" v-for="item in grid3">
        <div>
          <img :src="item.icon" alt />
        </div>
        <div>
          <div>{{ item.count }}</div>
          <div>
            {{ item.title }}
            <van-icon name="arrow" />
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'memberDashboard',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      grid1: [
        {
          icon: require('@/assets/image/access_user.png'),
          title: '访问用户',
          count: '0',
          url: '/member/accessUserList',
        },
        {
          icon: require('@/assets/image/arrival_shop.png'),
          title: '到店用户',
          count: '',
        },
      ],
      grid2: [
        {
          icon: require('@/assets/image/consumer_users.png'),
          title: '消费用户',
          count: '0',
          url: '/member/consumeUserList',
        },
        {
          icon: require('@/assets/image/binding_fans.png'),
          title: '绑定粉丝',
          count: '0',
          url: '/member/bindingFansList',
        },
      ],
      grid3: [
        {
          icon: require('@/assets/image/collar_card_member.png'),
          title: '领卡会员',
          count: '0',
          url: '/member/collarCardMemberList',
        },
        {
          icon: require('@/assets/image/coupon_member.png'),
          title: '领券会员',
          count: '0',
          url: '/member/collarCouponMemberList',
        },
      ],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.getMemberDashboard().then(res => {
      this.grid1[0].count = res.online_user
      this.grid2[0].count = res.sale_user
      this.grid2[1].count = res.bind_fans
      this.grid3[0].count = res.card_user
      this.grid3[1].count = res.coupon_user
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('member', ['getMemberDashboard']),
    _goDetail(url) {
      this.$router.push(url)
    },
  },
}
</script>

<style lang="less" scoped>
.van-row {
  padding: 0 8px;
  margin: 0 !important;
}

.van-col {
  background-color: #fff;
  background-clip: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border-radius: 4px;
  box-sizing: 0 2px 4px 0 rgba(255, 255, 255, 0.5);
  img {
    width: 52px;
    height: 52px;
    margin-right: 10px;
  }

  & > div:last-child {
    & > div:first-child {
      font-size: 20px;
    }
    & > div:last-child {
      margin-top: 2px;
      font-size: 14px;
      color: @gray-deep-c;
      .van-icon {
        vertical-align: -2px;
      }
    }
  }
}
</style>
