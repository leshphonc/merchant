<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="() => $router.push('/storeFront/storeFrontCRU')"
      fixed
      left-arrow
      right-text="创建店铺"
      title="店铺管理"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-loading type="spinner" v-show="!list.length && loading"></van-loading>
    <div :key="i" v-for="(item, i) in list">
      <van-panel>
        <van-row class="row" slot="header">
          <van-col span="20">
            <img :src="item.shop_logo" alt height="60" width="60" />
            <div class="row-flex1">
              <div class="row-title van-ellipsis">{{ item.name }}</div>
              <div>
                <van-tag v-if="item.have_service === '1'">标准</van-tag>
                <van-tag type="primary" v-if="item.have_peisong === '1'">外卖</van-tag>
                <van-tag type="success" v-if="item.have_meal === '1'">餐饮</van-tag>
                <van-tag type="danger" v-if="item.have_hotel === '1'">酒店</van-tag>
                <van-tag type="warning" v-if="item.have_auto_parts === '1'">汽配</van-tag>

                <van-tag :type="auth[item.auth].type">{{ auth[item.auth].label }}</van-tag>
              </div>
            </div>
          </van-col>
          <van-col span="4">
            <span :style="{ color: status[item.status].color }">{{ status[item.status].label }}</span>
          </van-col>
        </van-row>
        <div class="footer" slot="footer">
          <van-button
            @click="_controlAuthPopup(item.store_id)"
            size="small"
            type="primary"
            v-if="item.auth === '0' || item.auth === '2' || item.auth === '5'"
            >资质审核</van-button
          >
          <van-button :to="`/storefront/storeFrontCommodityManagement/${item.store_id}`" size="small" type="primary"
            >商品</van-button
          >
          <van-button :to="`/storefront/storeFrontBusiness/${item.store_id}`" size="small" type="primary"
            >业务信息</van-button
          >
          <van-button :to="`/storefront/storefrontCRU/${item.store_id}`" size="small" type="primary"
            >基础信息</van-button
          >
        </div>
      </van-panel>
      <div class="white-space"></div>
    </div>
    <!-- 弹出层 -->
    <!-- 资质审核 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showAuthPopup">
      <ValidationObserver ref="observer" slim v-slot="{ invalid }">
        <img-cropper :confirm="_pickPic" :count="5" field="资质图片" title="资质图片"></img-cropper>
      </ValidationObserver>
      <van-button @click="_submit" class="auth-btn" type="primary">提交审核</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImgCropper from '@/components/ImgCropper'

export default {
  name: 'storeFrontList',

  mixins: [],

  components: {
    ImgCropper,
  },

  props: {},

  data() {
    return {
      list: [],
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
      auth: {
        0: {
          label: '资质未提交',
          type: 'warning',
        },
        1: {
          label: '资质审核中',
          type: 'primary',
        },
        2: {
          label: '审核拒绝',
          type: 'danger',
        },
        3: {
          label: '审核通过',
          type: 'success',
        },
        4: {
          label: '资质审核中',
          type: 'primary',
        },
        5: {
          label: '审核驳回',
          type: 'danger',
        },
      },
      showAuthPopup: false,
      loading: false,
      auth_files: [],
      last_id: '',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this._getStoreFrontList()
  },

  destroyed() {},

  methods: {
    ...mapActions('storeFront', ['getStoreFrontList', 'storeFroontQualificationAudit']),
    // 创建店铺
    _controlAuthPopup(id) {
      this.last_id = id
      this.showAuthPopup = !this.showAuthPopup
    },
    _pickPic(data) {
      this.auth_files = data
    },
    _getStoreFrontList() {
      if (this.loading) return
      this.loading = true
      this.getStoreFrontList().then(res => {
        this.list = res
        this.loading = false
      })
    },
    // 提交数据
    async _submit() {
      // 锁
      if (this.loading) return
      // 验证表单
      const isValid = await this.$refs.observer.validate()
      // 表单不完整
      if (!isValid) {
        this.$notify({
          type: 'warning',
          message: '请填写完整信息',
        })
      } else {
        // 加锁
        this.loading = true
        this.storeFroontQualificationAudit({
          store_id: this.last_id,
          auth_files: this.auth_files.map(item => item.url),
        })
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this._getStoreFrontList()
                this._controlAuthPopup()
              },
            })
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.row {
  padding: 6px 16px;
  box-sizing: border-box;
  & > .van-col:nth-child(1) {
    display: flex;
  }
  img {
    vertical-align: top;
    margin-right: 10px;
  }
  &-flex1 {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &-title {
    font-size: 16px;
    display: inline-block;
    width: 200px;
  }
  .van-col:last-child {
    text-align: right;
    span {
      font-size: 14px;
    }
  }
}

.footer {
  text-align: right;
}

.auth-btn {
  width: 100%;
  margin-top: 40px;
}

.van-loading {
  text-align: center;
  margin: 50% 0;
}
</style>
