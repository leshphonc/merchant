<template>
  <div>
    <van-nav-bar :title="`${type}自提点`" @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存"></van-nav-bar>
    <div class="nav-bar-holder"></div>
  </div>
</template>

<script>
export default {
  name: 'selfMentionPointCRU',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {},
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    _submit() {
      console.log(this.formData)
    },
  },
}
</script>

<style lang="less" scoped></style>
