<template>
  <div>
    <router-view></router-view>
    <van-tabbar
      :border="false"
      active-color="#ffb000"
      class="shadow-bar"
      route
      safe-area-inset-bottom
      v-model="active"
      v-show="showTabBar"
    >
      <van-tabbar-item replace to="/">
        <span>首页</span>
        <img :src="props.active ? icons.home.active : icons.home.unactive" alt slot="icon" slot-scope="props" />
      </van-tabbar-item>
      <van-tabbar-item to="/order">
        <span>订单</span>
        <img :src="props.active ? icons.order.active : icons.order.unactive" alt slot="icon" slot-scope="props" />
      </van-tabbar-item>
      <van-tabbar-item class="add-btn" to="/commodity">
        <div></div>
        <span>发布商品</span>
      </van-tabbar-item>
      <van-tabbar-item to="/marketing">
        <span>营销活动</span>
        <img :src="props.active ? icons.marketing.active : icons.marketing.unactive" alt slot="icon" slot-scope="props" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine">
        <span>我的</span>
        <img :src="props.active ? icons.mine.active : icons.mine.unactive" alt slot="icon" slot-scope="props" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'index',

  mixins: [],

  props: {},

  data() {
    return {
      active: 0,
      icons: {
        home: {
          active: require('@/assets/image/home.png'),
          unactive: require('@/assets/image/home_gray.png'),
        },
        order: {
          active: require('@/assets/image/order.png'),
          unactive: require('@/assets/image/order_gray.png'),
        },
        marketing: {
          active: require('@/assets/image/marketing.png'),
          unactive: require('@/assets/image/marketing_gray.png'),
        },
        mine: {
          active: require('@/assets/image/mine.png'),
          unactive: require('@/assets/image/mine_gray.png'),
        },
      },
    }
  },

  computed: {
    showTabBar() {
      return this.$route.path.split('/').length < 3
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {},
}
</script>

<style lang="less" scoped>
.shadow-bar {
  box-shadow: 0 0 10px 1px #ccc;
  .add-btn {
    position: relative;
    background-color: #fff;
    div {
      position: absolute;
      top: -28px;
      left: 10px;
      width: 15vw;
      height: 15vw;
      border-radius: 100%;
      background: #fff;
      box-shadow: 0 0 5px 2px #ccc;
      &::before {
        position: absolute;
        top: 28px;
        left: 0;
        width: 120%;
        margin-left: -10%;
        height: 100%;
        background-color: #fff;
        content: '';
      }
      &::after {
        position: absolute;
        top: 10px;
        left: 9.5px;
        width: 10vw;
        height: 10vw;
        background-color: #ffb000;
        content: '+';
        text-align: center;
        line-height: 10vw;
        color: #fff;
        font-size: 25px;
        border-radius: 10vw;
      }
    }
    span {
      position: relative;
      top: 10px;
      z-index: 10;
    }
  }
}
</style>
