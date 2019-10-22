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
  height: 54px;
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

// van-button
.van-button:not(:last-child) {
  margin-right: 6px;
}

// van-switch
.van-switch {
  vertical-align: middle;
}

.ql-editor {
  height: 400px !important;
}
</style>
