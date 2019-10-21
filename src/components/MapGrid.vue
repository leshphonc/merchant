<template>
  <div>
    <div class="title" v-if="data.title">{{ data.title }}</div>
    <van-grid :border="false" :clickable="true" :icon-size="size">
      <van-grid-item :icon="item.enable" :key="i" :text="item.name" :to="item.path" v-for="(item, i) in data.list" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: '',

  mixins: [],

  components: {},

  props: {
    data: Object,
    size: {
      type: String,
      default: '35',
    },
  },

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

<style lang="less" scoped>
.title {
  font-weight: 600;
}
</style>
