<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      fixed
      left-arrow
      title="意见反馈"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky v-model="active">
      <van-tab title="用户评价">
        <feedback-list></feedback-list>
      </van-tab>
      <van-tab title="评价类型">
        <type-CRU ref="cru"></type-CRU>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import FeedbackList from './FeedbackList'
import TypeCRU from './FeedbackTypeCRU'
export default {
  name: 'feedbackDashBoard',

  mixins: [],

  components: {
    TypeCRU,
    FeedbackList,
  },

  props: {},

  data() {
    return {
      active: 0,
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    // _create() {
    //   this.$refs['cru']._create()
    // },
  },
}
</script>

<style lang="less" scoped></style>
