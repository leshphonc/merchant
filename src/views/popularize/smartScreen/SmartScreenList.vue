<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="智能屏设备列表"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <div :key="index" v-for="(item, index) in list">
      <van-panel :desc="item.address" :title="item.store_name">
        <div>管理员：{{ item.contact }}</div>
        <div>
          联系方式：
          {{ item.tel }}
          <a :href="'tel:' + item.tel">
            {{ item.phone }}
            <van-icon color="#1989fa" name="phone-o" />
          </a>
        </div>
        <div slot="footer">
          <van-button :to="`/smartScreen/customerMeetGreetingList/${item.imax_id}`" size="small">顾客见面语</van-button>
          <van-button :to="`/smartScreen/staffMeetGreetingList/${item.imax_id}`" size="small">员工见面语</van-button>
          <van-button :to="`/smartScreen/smartScreenPosterList/${item.imax_id}`" size="small" type="primary">推广海报</van-button>
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
  },
}
</script>

<style lang="less" scoped>
.van-panel__content {
  padding: 4px 16px;
  font-size: 14px;
  color: @black-c;
}
.van-panel__footer {
  text-align: right;
}

.van-icon {
  vertical-align: -2px;
}
</style>
