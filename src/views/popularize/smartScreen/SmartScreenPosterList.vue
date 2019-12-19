<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="() => $router.push('/smartScreen/smartScreenPosterCRU')"
      fixed
      left-arrow
      right-text="创建"
      title="智能屏推广列表"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky v-model="active">
      <van-tab title="启用中">
        <van-pull-refresh @refresh="_getSmartScreenPosterList" v-model="eRefreshing">
          <div :key="item.id" v-for="item in eList">
            <van-panel :icon="item.ad_img" :status="_currentStatus(item)" :title="item.title">
              <div>
                <van-row>
                  <van-col span="10">触达人数：{{ item.reach || 111 }}</van-col>
                  <van-col span="10">播报次数：{{ item.scan || 111 }}</van-col>
                </van-row>
                <div class="white-space"></div>
                <van-row>
                  <van-col span="10">浏览人数：{{ item.wait || 111 }}</van-col>
                  <van-col span="10">下单人数：{{ item.buy || 111 }}</van-col>
                </van-row>
                <div class="white-space"></div>
                <van-row>
                  <van-col span="5">关键词：</van-col>
                  <van-col span="19">{{ item.keywords }}</van-col>
                </van-row>
                <div class="white-space"></div>
                <van-row>
                  <van-col span="5">播报语音：</van-col>
                  <van-col span="19">{{ item.read_txt }}</van-col>
                </van-row>
                <div class="white-space"></div>
              </div>
              <div slot="footer" v-if="item.is_shelves === '1'">
                <van-button disabled size="small" v-if="item.audit === '2'">审核中</van-button>
                <van-button @click="_changeRelease(item.id)" size="small" type="danger" v-else>取消发布</van-button>
              </div>
              <div slot="footer" v-else-if="item.is_shelves === '2'">
                <van-button @click="_changeStatus(item.id)" size="small" type="danger">禁用</van-button>
                <van-button @click="_changeRelease(item.id)" size="small" type="primary">发布</van-button>
                <van-button :to="`/smartScreen/smartScreenPosterCRU/${$route.params.id}/${item.id}`" size="small"
                  >编辑</van-button
                >
              </div>
            </van-panel>
            <div class="white-space"></div>
          </div>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="禁用中">
        <van-pull-refresh @refresh="_getSmartScreenPosterList" v-model="dRefreshing">
          <div :key="item.id" v-for="item in dList">
            <van-panel :icon="item.ad_img" :status="_currentStatus(item)" :title="item.title">
              <div>
                <van-row>
                  <van-col span="10">触达人数：{{ item.reach || 111 }}</van-col>
                  <van-col span="10">播报次数：{{ item.scan || 111 }}</van-col>
                </van-row>
                <div class="white-space"></div>
                <van-row>
                  <van-col span="10">浏览人数：{{ item.wait || 111 }}</van-col>
                  <van-col span="10">下单人数：{{ item.buy || 111 }}</van-col>
                </van-row>
                <div class="white-space"></div>
                <van-row>
                  <van-col span="5">关键词：</van-col>
                  <van-col span="19">{{ item.keywords }}</van-col>
                </van-row>
                <div class="white-space"></div>
                <van-row>
                  <van-col span="5">播报语音：</van-col>
                  <van-col span="19">{{ item.read_txt }}</van-col>
                </van-row>
                <div class="white-space"></div>
              </div>
              <div slot="footer">
                <van-button @click="_changeStatus(item.id)" size="small" type="primary">启用</van-button>
              </div>
            </van-panel>
            <div class="white-space"></div>
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'smartScreenPoster',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      active: 0,
      eList: [],
      eRefreshing: false,
      dList: [],
      dRefreshing: false,
      loading: false,
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getSmartScreenPosterList()
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', ['getSmartScreenPosterList', 'changePosterRelease', 'changePosterStatus']),
    _getSmartScreenPosterList() {
      const { id } = this.$route.params
      this.getSmartScreenPosterList({
        imax_id: id,
        status: '1',
      }).then(res => {
        this.eList = res
        this.eRefreshing = false
      })
      this.getSmartScreenPosterList({
        imax_id: id,
        status: '0',
      }).then(res => {
        this.dList = res
        this.dRefreshing = false
      })
    },
    _currentStatus(item) {
      if (item.is_shelves === '2') {
        if (item.audit === '9') {
          return '未上架'
        } else if (item.audit === '3') {
          return '审核失败'
        } else if (item.audit === '2') {
          return '未发布'
        } else {
          return '未上架'
        }
      } else if (item.audit === '1') {
        return '审核成功'
      } else if (item.audit === '2') {
        return '审核中'
      }
    },
    _changeRelease(id) {
      if (this.loading) return
      this.loading = true
      this.changePosterRelease(id)
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._getSmartScreenPosterList()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    _changeStatus(id) {
      if (this.loading) return
      this.loading = true
      this.changePosterStatus(id)
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._getSmartScreenPosterList()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
.van-cell__left-icon {
  font-size: 80px;
  height: 80px;
}

.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
}

.van-panel__footer {
  text-align: right;
}
</style>
