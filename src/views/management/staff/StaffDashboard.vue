<template>
  <div>
    <staff-list v-if="active == 0"></staff-list>
    <staff-level v-else></staff-level>
    <div class="tab-bar-holder-sp"></div>
    <van-tabbar fixed v-model="active">
      <van-tabbar-item icon="apps-o">店员</van-tabbar-item>
      <van-tabbar-item icon="label-o">技师等级</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import StaffList from './StaffList'
import StaffLevel from './StaffLevel'
export default {
  name: 'staffDashboard',

  mixins: [],

  components: {
    StaffList,
    StaffLevel,
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
