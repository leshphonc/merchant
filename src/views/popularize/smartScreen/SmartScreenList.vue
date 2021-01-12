<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="机器人设备列表"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <div :key="index" v-for="(item, index) in list">
      <van-panel :desc="item.store_name" :title="item.remark">
        <div>地址：{{ item.address }}</div>
        <div class="white-space"></div>
        <div>管理员：{{ item.contact }}</div>
        <div class="white-space"></div>
        <div>
          联系方式：
          {{ item.tel }}
          <a :href="'tel:' + item.tel">
            {{ item.phone }}
            <van-icon color="#1989fa" name="phone-o" />
          </a>
        </div>
        <div slot="footer">
          <van-button v-if="_isApp && item.imax_type == 3" size="small" @click="makeMap(item.imax_id)">店铺建图</van-button>
          <van-button :to="`/smartScreen/smartScreenLayout/${item.imax_id}`" size="small">布局内容</van-button>
          <van-button :to="`/smartScreen/smartScreenSalesRecord/${item.store_id}/${item.imax_id}`" size="small">
            销售记录
          </van-button>
          <van-button :to="`/smartScreen/Workspace/${item.imax_id}`" v-if="item.imax_type != 3" size="small">地图环境</van-button>
          <van-button :to="`/smartScreen/sameCityAdvisory/${item.imax_id}`" size="small">同城咨询</van-button>
          <!--<van-button :to="`/smartScreen/customerMeetGreetingList/${item.imax_id}`" size="small">顾客见面语</van-button>-->
          <!--<van-button :to="`/smartScreen/staffMeetGreetingList/${item.imax_id}`" size="small">员工见面语</van-button>-->
        </div>
      </van-panel>
      <div class="white-space"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'smartScreenList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.getSmartScreenList().then(res => {
      this.list = res
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', ['getSmartScreenList']),
    makeMap() {
      // console.log('makeMap')
      // const json = { callback: '_writeOffCoupon', action: 'ScanQRCode' }
      // this.$invokeAndroid(json)
    },
  },
}
</script>

<style lang="less" scoped>
.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
}

.van-panel__footer {
  text-align: right;
}

.van-panel {
  .van-icon {
    vertical-align: -2px;
  }
}
</style>
