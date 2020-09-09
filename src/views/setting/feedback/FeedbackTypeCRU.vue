<template>
  <div>
    <van-cell-group :key="index" v-for="(item, index) in list">
      <van-cell :title="item.name" @click="_controlLevelCRUPopup(item)" is-link value="管理" />
      <template #right>
        <van-button @click="_deleteType(item.id)" square text="删除" type="danger" />
      </template>
    </van-cell-group>
    <van-popup class="category-popup" position="right" safe-area-inset-bottom v-model="showPopup">
      <van-cell @click="_create()" center clickable title="新增评价">
        <van-icon class="add-icon" color="#1989fa" name="add" slot="icon" />
      </van-cell>
      <div class="white-space"></div>
      <van-cell-group v-if="typeList.length">
        <van-swipe-cell :key="index" v-for="(item, index) in typeList">
          <van-cell :title="item.name" @click="_modifyType(item)" is-link value="修改名称" />
          <template #right>
            <van-button @click="_deleteType(item.id)" square text="删除" type="danger" />
          </template>
        </van-swipe-cell>
      </van-cell-group>
    </van-popup>
    <van-dialog @confirm="_confirm" show-cancel-button :title="curTitle" v-model="show">
      <van-field input-align="center" placeholder="请输入评价名称" v-model="name" />
    </van-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'typeCRU',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      show: false,
      name: '',
      id: '',
      showPopup: false,
      typeList: [],
      curPID: '',
      curTitle: '',
      loading: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this._getFeedbackTypeList()
  },

  destroyed() {},

  methods: {
    ...mapActions('feedback', [
      'getFeedbackTypeList',
      'createFeedbackType',
      'updateFeedbackType',
      'deleteFeedbackType',
    ]),
    _getFeedbackTypeList() {
      this.getFeedbackTypeList().then(res => {
        this.list = res
        if (this.curPID) {
          const p = res.find(item => {
            if (item.id == this.curPID) {
              return item
            }
          })
          this.typeList = p.type_list
        }
      })
    },
    _controlLevelCRUPopup(item) {
      this.curPID = item.id
      this.curTitle = item.name
      this.typeList = item.type_list
      this.showPopup = !this.showPopup
    },
    _changeCurrentLevelID(item) {
      this.curID = item.id
      this.formData.name = item.name
      this.showLevelCRUPopup = true
    },
    _deleteStaffLevel(id) {
      this.$dialog.confirm({
        title: '技师等级',
        message: '删除后无法恢复，是否删除？',
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            this.loading = true
            this.deleteStaffLevel(id).then(res => {
              this.$toast.success({
                message: '删除成功',
                forbidClick: true,
                duration: 1000,
                onClose: () => {
                  this.loading = false
                  this._getStaffLevelList(this.curType)
                  done()
                },
              })
            })
          } else {
            done()
          }
        },
      })
    },
    _create() {
      this.show = true
      this.name = ''
      this.id = ''
    },
    _modifyType(item) {
      this.name = item.name
      this.id = item.id
      this.show = true
    },
    _confirm() {
      if (this.name == '') {
        this.$toast.fail('请输入评价名称')
        return
      }
      if (this.id) {
        this.createFeedbackType({
          id: this.id,
          intent_id: this.curPID,
          name: this.name,
        }).then(res => {
          this.$toast.success({
            message: '修改成功',
            forbidClick: true,
            duration: 1000,
            onClose: () => {
              // 解锁
              this._getFeedbackTypeList()
            },
          })
        })
      } else {
        this.createFeedbackType({
          intent_id: this.curPID,
          name: this.name,
        }).then(res => {
          this.$toast.success({
            message: '创建成功',
            forbidClick: true,
            duration: 1000,
            onClose: () => {
              // 解锁
              this._getFeedbackTypeList()
            },
          })
        })
      }
    },
    _deleteType(id) {
      this.deleteFeedbackType({ id }).then(() => {
        this.$toast.success({
          message: '删除成功',
          forbidClick: true,
          duration: 1000,
          onClose: () => {
            // 解锁
            this._getFeedbackTypeList()
          },
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.category-popup {
  width: 70vw;
  height: 100vh;
  background: #f2f2f2;
}
</style>
