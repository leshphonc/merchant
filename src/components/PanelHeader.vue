<template>
  <van-row class="header">
    <van-col span="20">
      <img :src="data.shop_logo" alt height="60" width="60" />
      <span class="header-title">{{ data.name }}</span>
    </van-col>
    <van-col span="4">
      <span :style="{ color: status[data.status].color }">{{ status[data.status].label }}</span>
    </van-col>
  </van-row>
</template>
<script>
export default {
  props: {
    data: Object,
  },

  data() {
    return {
      status: {
        1: {
          label: '正常',
          color: '#690',
        },
        2: {
          label: '审核',
          color: '#ffb000',
        },
        4: {
          label: '禁用',
          color: '#dd4a68',
        },
      },
    }
  },
}
</script>
<style lang="less" scoped>
.header {
  padding: 6px 16px;
  img {
    vertical-align: top;
    margin-right: 10px;
  }
  &-title {
    vertical-align: top;
    font-size: 16px;
    display: inline-block;
    width: 50%;
  }

  .van-col:last-child {
    text-align: right;
    span {
      font-size: 14px;
    }
  }
}
</style>
