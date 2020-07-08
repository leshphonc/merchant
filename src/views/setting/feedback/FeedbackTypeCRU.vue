<template>
  <div>
    <van-swipe-cell :key="index" v-for="(item, index) in list">
      <van-cell :border="false" :title="item.name" @click="_modifyType(item)" is-link />
      <template #right>
        <van-button @click="_deleteType(item.id)" square text="删除" type="danger" />
      </template>
    </van-swipe-cell>
    <van-dialog @confirm="_confirm" show-cancel-button title="评价类型" v-model="show">
      <van-field input-align="center" placeholder="请输入评价类型名称" v-model="name" />
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

<style lang="less" scoped></style>
