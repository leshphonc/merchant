<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="智能屏布局内容"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group title="轮播图">
      <van-swipe-cell :key="index" v-for="(item, index) in swipeList">
        <van-field
          @click="_controlCarouselPopup(index + '')"
          input-align="right"
          is-link
          placeholder="点击配置"
          readonly
        >
          <van-image :src="item.pic" slot="left-icon" />
        </van-field>
        <template slot="right">
          <van-button @click="_delete(item.id)" square text="删除" type="danger" />
        </template>
      </van-swipe-cell>
      <van-button @click="_controlCarouselPopup()" icon="plus" style="width: 100%">添加轮播图</van-button>
    </van-cell-group>
    <van-cell-group title="菜单">
      <van-field
        @click="showMenuPicker = true"
        input-align="right"
        is-link
        label="已选功能"
        placeholder="点击勾选"
        readonly
      >
        <div slot="input" v-if="menu.length > 0">
          <van-tag :key="index" type="primary" v-for="(item, index) in menu">{{ _getMenuName(item) }}</van-tag>
        </div>
      </van-field>
    </van-cell-group>
    <van-cell-group title="菜单选中抽奖后生效">
      <van-field
        :value="lotteryLabel"
        @click="_controlLotteryPicker()"
        input-align="right"
        is-link
        label="抽奖活动"
        placeholder="点击配置"
        readonly
      ></van-field>
    </van-cell-group>
    <!-- 弹出层 -->
    <!-- 轮播图配置 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCarouselPopup">
      <img-cropper
        :compression="1"
        :confirm="_pickPic"
        :list="picList"
        :ratio="[675, 252]"
        title="轮播海报图"
      ></img-cropper>
      <van-field label="跳转地址" placeholder="点击海报跳转的地址" v-model="formData.pic_url"></van-field>
      <div class="btn-group">
        <van-button @click="_controlCarouselPopup()">取消</van-button>
        <van-button @click="_submit" type="primary">确定</van-button>
      </div>
    </van-popup>
    <!-- 菜单功能选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showMenuPicker">
      <van-checkbox-group v-model="menu">
        <van-cell-group>
          <van-cell
            :key="item.id"
            :title="item.site_name"
            @click="_toggle(index, item.id)"
            clickable
            v-for="(item, index) in menuList"
          >
            <van-checkbox :name="item.id" ref="checkboxes" slot="right-icon" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <div class="btn-group">
        <van-button @click="_controlMenuPicker()" style="width: 100%;">关闭</van-button>
      </div>
    </van-popup>
    <!-- 抽奖地址选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showLotteryPicker">
      <van-picker
        :columns="lotteryColumns"
        :default-index="lotteryIndex"
        @cancel="_controlLotteryPicker"
        @confirm="_pickLottery"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Utils from '@/utils'
import ImgCropper from '@/components/ImgCropper'
export default {
  name: 'smartScreenLayout',

  mixins: [],

  components: {
    ImgCropper,
  },

  props: {},

  data() {
    return {
      formData: {
        id: '',
        pic: '',
        pic_url: '',
      },
      picList: [],
      menu: [],
      menuList: [],
      showCarouselPopup: false,
      showMenuPicker: false,
      swipeList: [],
      loading: false,
      showLotteryPicker: false,
      lotteryColumns: [],
      menuID: '',
    }
  },

  computed: {
    lotteryIndex() {
      const menu = this.menuList.find(item => item.site_name === '抽奖')
      if (menu) {
        const id = Utils.getUrlParam('lottery_id', menu.pic_url)
        const index = this.lotteryColumns.findIndex(item => item.value === id)
        return index
      } else {
        return 0
      }
    },
    lotteryLabel() {
      const menu = this.menuList.find(item => item.site_name === '抽奖')
      if (menu) {
        const id = Utils.getUrlParam('lottery_id', menu.pic_url)
        const item = this.lotteryColumns.find(item => item.value === id)
        return item && item.label
      } else {
        return ''
      }
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getSmartScreenLayout()
    this.getLotteryList().then(res => {
      this.lotteryColumns = res.map(item => {
        return {
          label: item.title,
          value: item.id,
        }
      })
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', [
      'getSmartScreenLayout',
      'createCarousel',
      'updateCarousel',
      'deleteCarousel',
      'selectSmartScreenMenu',
      'updateMenuLotteryUrl',
      'getLotteryList',
    ]),
    _controlCarouselPopup(index) {
      if (index) {
        this.picList = [{ url: this.swipeList[index].pic }]
        this.formData.id = this.swipeList[index].id
        this.formData.pic = [this.swipeList[index].pic]
        this.formData.pic_url = this.swipeList[index].pic_url
      } else {
        this.picList = []
        this.formData.id = ''
        this.formData.pic = ''
        this.formData.pic_url = ''
      }
      this.showCarouselPopup = !this.showCarouselPopup
    },
    _controlMenuPicker() {
      this.showMenuPicker = !this.showMenuPicker
    },
    _controlLotteryPicker() {
      this.showLotteryPicker = !this.showLotteryPicker
    },
    _pickPic(data) {
      this.formData.pic = data.map(item => item.url)
    },
    _pickLottery(item) {
      if (this.loading) return
      this.loading = true
      const { imax } = this.$route.params
      const menu = this.menuList.find(item => item.site_name === '抽奖')
      this.updateMenuLotteryUrl({
        id: menu.id,
        imax_id: imax,
        lottery_id: item.value,
      })
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._controlLotteryPicker()
              this._getSmartScreenLayout()
            },
          })
        })
        .catch(() => {
          this.loading = true
        })
    },
    _toggle(index, id) {
      if (this.loading) return
      this.$refs.checkboxes[index].toggle()
      this._selectSmartScreenMenu(id)
    },
    _delete(id) {
      if (this.swipeList.length === 1) {
        this.$toast.fail({
          message: '至少保留一张轮播图',
          forbidClick: true,
          duration: 1500,
        })
        return
      }
      if (this.loading) return
      this.loading = true
      const { imax } = this.$route.params
      this.loading = true
      this.deleteCarousel({
        id,
        imax_id: imax,
      })
        .then(res => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._getSmartScreenLayout()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    _getMenuName(id) {
      const item = this.menuList.find(item => item.id === id)
      return item && item.site_name
    },
    // 获取布局详情
    _getSmartScreenLayout() {
      const { imax } = this.$route.params
      this.getSmartScreenLayout(imax).then(res => {
        // 轮播图
        this.swipeList = res[0].itemList

        // 菜单
        this.menuList = res[1].itemList
        this.menuID = res[1].site_id
        let m = []
        res[1].itemList.forEach(item => {
          if (item.is_selected === '1') {
            m.push(item.id)
          }
        })
        this.menu = m
      })
    },
    _submit() {
      if (this.loading) return
      const { imax } = this.$route.params
      this.loading = true
      const params = JSON.parse(JSON.stringify(this.formData))
      let method = 'createCarousel'
      if (params.id) {
        method = 'updateCarousel'
      } else {
        params.fid = this.swipeList[0].fid
      }
      params.imax_id = imax
      params.pic = params.pic[0]
      this[method](params)
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._getSmartScreenLayout()
              this.formData = {
                id: '',
                pic: '',
                pic_url: '',
              }
              this._controlCarouselPopup()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    _selectSmartScreenMenu(id) {
      const { imax } = this.$route.params
      this.loading = true
      this.selectSmartScreenMenu({
        id,
        imax_id: imax,
      })
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
.van-popup {
  padding-bottom: 44px;
  .btn-group {
    position: fixed;
    bottom: 0;
    width: 100%;
    .van-button {
      width: 50%;
      margin: 0;
    }
  }
}

.van-tag {
  margin: 0 4px;
}

.van-field__left-icon {
  .van-image {
    width: 120px;
    height: 100%;
  }
}

.van-swipe-cell__right {
  .van-button {
    height: 100%;
  }
}
</style>
