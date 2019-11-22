<template>
  <router-view />
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'appMain',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {
    this.getWxConfig().then(config => {
      this.$wxConfig(config)
    })
  },

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions(['getWxConfig']),
  },
}
</script>

<style lang="less">
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #fafafa;
}

.nav-bar-holder {
  height: 46px;
  &-sp {
    height: 54px;
  }
}

.tab-bar-holder {
  height: 50px;
  &-sp {
    height: 58px;
  }
}

.card-panel {
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 15px;
  background-color: #fff;
}

.wing-blank {
  margin-left: 8px;
  margin-right: 8px;
  box-sizing: border-box;
  &-lg {
    margin-left: 16px;
    margin-right: 16px;
    box-sizing: border-box;
  }
}

.white-space {
  height: 8px;
  &-lg {
    height: 16px;
  }
}

.filter-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
  border-radius: 18px;
  background-color: #fff;
  color: @font-gray-c;
  box-sizing: border-box;
  font-size: 12px;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px 0 rgba(236, 236, 236, 0.5);
  padding: 0 10px;

  & > i {
    font-size: 10px;
    margin-left: 4px;
  }
}

.ql-editor {
  height: 400px !important;
}

a {
  color: initial !important;
}

// van-button
.van-button + .van-button {
  margin-left: 5px;
}

// van-switch
.van-switch {
  font-size: 18px !important;
  vertical-align: middle;
}

// van-tag
.van-card {
  border: 1px solid @gray-light-c;
  background-color: #fff !important;
  box-shadow: 0 2px 4px 0 rgba(236, 236, 236, 0.8);
  .van-tag + .van-tag {
    margin-left: 5px;
  }
}

.van-collapse {
  .van-tag {
    margin-right: 5px;
    margin-bottom: 5px;
  }
}

.van-panel {
  .van-tag + .van-tag {
    margin-left: 5px;
  }
}

//van-card
.van-card__content {
  .van-card__title {
    font-size: 16px;
    font-family: 'Times New Roman', Times, serif;
    margin-bottom: 4px;
    font-weight: 600;
  }
  div + div {
    margin-top: 4px;
  }
}

// van-nav-bar
.van-nav-bar--fixed {
  z-index: 2 !important;
}

.van-nav-bar__text:active {
  background-color: @primary-deep-c !important;
}

// van-tab-bar
.van-tabbar-item--active {
  color: @primary-c !important;
}
</style>
