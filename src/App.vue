<template>
  <router-view />
</template>

<style lang="less">
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
    Helvetica Neue, Helvetica, Arial, sans-serif;
  background-color: #f5f5f9;
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
}

.white-space {
  height: 8px;
}

.ql-editor {
  height: 400px !important;
}

// van-button
.van-button + .van-button {
  margin-left: 5px;
}

// van-switch
.van-switch {
  vertical-align: middle;
}

// van-tag
.van-tag + .van-tag {
  margin-left: 5px;
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
</style>
