<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="_createMeetGreeting"
      fixed
      left-arrow
      right-text="创建"
      title="指定见面语"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'staffMeetGreetingSpecifyList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      page: 1,
      list: [],
      refreshing: false,
      finished: false,
      loading: false,
    }
  },

  computed: {
    finishText() {
      return this.list.length ? '没有更多了' : ''
    },
  },

  watch: {},

  created() {},

  mounted() {
    console.log(this.$route)
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', ['getMeetGreetingList']),
    // 刷新列表
    _onRefresh() {
      const { imax, id } = this.$route.params
      this.getMeetGreetingList({
        imax_id: imax,
        page: 1,
        type: 2,
        is_staff: id,
      }).then(res => {
        this.page = 2
        this.list = res.data
        this.refreshing = false
      })
    },
    // 异步更新数据
    _onLoad() {
      const { imax, id } = this.$route.params
      this.getMeetGreetingList({
        imax_id: imax,
        page: this.page,
        type: 2,
        is_staff: id,
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
    _createMeetGreeting() {
      const { imax, id } = this.$route.params
      this.$router.push({
        path: `/smartScreen/StaffMeetGreetingCRU/${imax}`,
        query: {
          staff_id: id,
        },
      })
    },
    _modifyMeetGreeting(_id) {
      const { imax, id } = this.$route.params
      this.$router.push({
        path: `/smartScreen/StaffMeetGreetingCRU/${imax}/${_id}`,
        query: {
          staff_id: id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
