<template>
  <div>
    <van-nav-bar @click-left="_goBack" @click-right="_createStoreFront" fixed left-arrow right-text="创建店铺" title="店铺列表"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <div :key="i" v-for="(item, i) in storeFrontList">
      <van-panel>
        <van-row class="row" slot="header">
          <van-col span="20">
            <img :src="item.shop_logo" alt height="60" width="60" />
            <div class="row-flex1">
              <div class="row-title van-ellipsis">{{ item.name }}</div>
              <div>
                <van-tag v-if="item.have_service === '1'">标准</van-tag>
                <van-tag type="primary" v-if="item.have_peisong === '1'">外卖</van-tag>
                <van-tag type="success" v-if="item.have_meal === '1'">餐饮</van-tag>
                <van-tag type="danger" v-if="item.have_hotel === '1'">酒店</van-tag>
                <van-tag type="warning" v-if="item.have_auto_parts === '1'">汽配</van-tag>
              </div>
            </div>
          </van-col>
          <van-col span="4">
            <span :style="{ color: status[item.status].color }">{{ status[item.status].label }}</span>
          </van-col>
        </van-row>
        <div class="footer" slot="footer">
          <van-button size="small" type="primary">资质审核</van-button>
          <van-button size="small" type="primary">业务信息</van-button>
          <van-button :to="`/storefront/storefrontCRU/${item.store_id}`" size="small" type="primary">基础信息</van-button>
        </div>
      </van-panel>
      <div class="white-space"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'storeFrontList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      storeFrontList: [],
      status: {
        1: {
          label: '正常',
          color: '#690',
        },
        2: {
          label: '审核',
          color: '#ffb000',
        },
        4: {
          label: '禁用',
          color: '#dd4a68',
        },
      },
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.getStoreFrontList().then(res => {
      this.storeFrontList = res
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('storeFront', ['getStoreFrontList']),
    _goBack() {
      this.$router.go(-1)
    },
    _createStoreFront() {
      this.$router.push('/storefront/storefrontCRU')
    },
  },
}
</script>

<style lang="less" scoped>
.row {
  padding: 6px 16px;
  box-sizing: border-box;
  & > .van-col:nth-child(1) {
    display: flex;
  }
  img {
    vertical-align: top;
    margin-right: 10px;
  }
  &-flex1 {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &-title {
    font-size: 16px;
    display: inline-block;
    width: 200px;
  }
  .van-col:last-child {
    text-align: right;
    span {
      font-size: 14px;
    }
  }
}

.footer {
  text-align: right;
}
</style>
