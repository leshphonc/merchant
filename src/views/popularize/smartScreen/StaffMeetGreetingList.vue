<template>
  <div>
    <van-nav-bar
      :right-text="active === 0 ? '创建' : ''"
      @click-left="$goBack"
      @click-right="_createMeetGreeting"
      fixed
      left-arrow
      title="员工见面语"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky v-model="active">
      <van-tab title="统一见面语">
        <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
          <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
            <van-cell
              :key="index"
              :label="item.context"
              :title="item.title"
              @click="_modifyMeetGreeting(item.id)"
              center
              is-link
              v-for="(item, index) in list"
              value="修改"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="指定见面语">
        <van-cell-group title="店员列表">
          <van-cell
            :key="index"
            :title="item.label"
            @click="_staffMeetGreetingSpecifyList(item.value)"
            is-link
            v-for="(item, index) in staffList"
            value="配置特殊见面语"
          />
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'staffMeetGreetingList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      active: 0,
      page: 1,
      list: [],
      refreshing: false,
      finished: false,
      loading: false,
      staffList: [],
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    finishText() {
      return this.list.length ? '没有更多了' : ''
    },
  },

  watch: {},

  created() {},

  mounted() {
    const { imax } = this.$route.params
    this.getStaffList(imax).then(res => {
      this.staffList = res
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', ['getMeetGreetingList', 'getStaffList']),
    // 刷新列表
    _onRefresh() {
      const { imax } = this.$route.params
      this.getMeetGreetingList({
        imax_id: imax,
        page: 1,
        type: 2,
      }).then(res => {
        this.page = 2
        this.list = res.data
        this.refreshing = false
        this.finished = false
      })
    },
    // 异步更新数据
    _onLoad() {
      const { imax } = this.$route.params
      this.getMeetGreetingList({
        imax_id: imax,
        page: this.page,
        type: 2,
      }).then(res => {
        this.loading = false
        if (res.data.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.data)
      })
    },
    _modifyMeetGreeting(id) {
      const { imax } = this.$route.params
      this.$router.push(`/smartScreen/StaffMeetGreetingCRU/${imax}/${id}`)
    },
    _createMeetGreeting() {
      const { imax } = this.$route.params
      this.$router.push(`/smartScreen/StaffMeetGreetingCRU/${imax}`)
    },
    _staffMeetGreetingSpecifyList(id) {
      const { imax } = this.$route.params
      this.$router.push(`/smartScreen/staffMeetGreetingSpecifyList/${imax}/${id}`)
    },
  },
}
</script>

<style lang="less" scoped></style>
