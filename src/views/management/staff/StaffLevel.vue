<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="技师等级"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <div style="background-color: #f5f5f9;">
        <div class="white-space"></div>
        <van-cell @click="_controlLevelCRUPopup" center clickable title="新增等级">
          <van-icon class="add-icon" color="#1989fa" name="add" slot="icon" />
        </van-cell>
        <div class="white-space"></div>
      </div>
    </van-sticky>
    <van-cell-group v-if="list.length">
      <van-swipe-cell :key="index" v-for="(item, index) in list">
        <van-cell :title="item.name" @click="_changeCurrentLevelID(item)" is-link value="修改名称" />
        <template #right>
          <van-button @click="_deleteStaffLevel(item.id)" square text="删除" type="danger" />
        </template>
      </van-swipe-cell>
    </van-cell-group>
    <van-divider v-else>暂无技师等级</van-divider>
    <van-popup class="category-cru-popup" position="bottom" safe-area-inset-bottom v-model="showLevelCRUPopup">
      <van-form @submit="_onSubmit">
        <van-field
          :rules="[{ required: true, message: '此项为必填项' }]"
          label="等级名称"
          name="name"
          placeholder="技师等级名称"
          v-model="formData.name"
        />
        <div class="white-space-lg"></div>
        <div class="wing-blank-lg">
          <van-button @click="_controlLevelCRUPopup" native-type="button">取消</van-button>
          <van-button native-type="submit" type="primary">保存</van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'staffLevel',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      loading: false,
      list: [],
      showLevelCRUPopup: false,
      formData: {
        name: '',
      },
      curID: '',
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
    this._getStaffLevelList()
  },

  destroyed() {},

  methods: {
    ...mapActions('staff', ['getStaffLevelList', 'modifyStaffLevel', 'deleteStaffLevel']),
    _getStaffLevelList() {
      this.getStaffLevelList().then(res => {
        this.list = res
      })
    },
    _controlLevelCRUPopup() {
      if (this.showLevelCRUPopup === true) {
        this.curID = ''
        this.formData.name = ''
      }
      this.showLevelCRUPopup = !this.showLevelCRUPopup
    },
    _changeCurrentLevelID(item) {
      this.curID = item.id
      this.formData.name = item.name
      this._controlLevelCRUPopup()
    },
    _deleteStaffLevel(id) {
      this.deleteStaffLevel(id).then(res => {
        this.$toast.success({
          message: '删除成功',
          forbidClick: true,
          duration: 1000,
          onClose: () => {
            // 解锁
            this.loading = false
            this._getStaffLevelList()
          },
        })
      })
    },
    _onSubmit(values) {
      if (this.loading) {
        return
      }
      if (this.curID != '') {
        values.id = this.curID
      }
      this.loading = true
      this.modifyStaffLevel(values).then(res => {
        this.$toast.success({
          message: '操作成功',
          forbidClick: true,
          duration: 1000,
          onClose: () => {
            // 解锁
            this.loading = false
            this._getStaffLevelList()
            this._controlLevelCRUPopup()
          },
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.add-icon {
  margin-right: 10px;
  font-size: 18px;
}

.category-cru-popup {
  height: 80vh;
  background-color: #f2f2f2;

  .van-button {
    width: 50%;
    margin: 0;
  }
}
</style>
