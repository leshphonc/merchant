<template>
  <div>
    <van-nav-bar
      @click-right="() => this.$router.push('/selfMentionPoint/selfMentionPointCRU')"
      @click-left="$goBack"
      fixed
      left-arrow
      right-text="创建"
      title="自提点管理"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
  </div>
</template>

<script>
export default {
  name: 'selfMentionPointList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {}
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
