<template>
  <div>
    <staff-list v-if="active == 0"></staff-list>
    <staff-level v-else-if="active == 1"></staff-level>
    <staff-work-record v-else-if="active == 2"></staff-work-record>
    <staff-work-time v-else></staff-work-time>
    <div class="tab-bar-holder-sp"></div>
    <van-tabbar fixed v-model="active" safe-area-inset-bottom>
      <van-tabbar-item icon="apps-o">店员</van-tabbar-item>
      <van-tabbar-item icon="label-o">技师等级</van-tabbar-item>
      <van-tabbar-item icon="label-o">工作记录</van-tabbar-item>
      <van-tabbar-item icon="records">上班时间</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import StaffList from './StaffList'
import StaffLevel from './StaffLevel'
import StaffWorkRecord from './StaffWorkRecord'
import StaffWorkTime from './StaffWorkTime'
export default {
  name: 'staffDashboard',
  mixins: [],
  components: {
    StaffList,
    StaffLevel,
    StaffWorkRecord,
    StaffWorkTime,
  },
  props: {},
  data() {
    return {
      active: 0,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {},
}
</script>

<style lang="less" scoped></style>