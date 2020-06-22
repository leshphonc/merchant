<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="_create"
      fixed
      left-arrow
      right-text="创建"
      title="评价类型"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
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
    this._getFeedbackList()
  },

  destroyed() {},

  methods: {
    ...mapActions('feedback', ['getFeedbackList', 'createFeedbackType', 'updateFeedbackType', 'deleteFeedbackType']),
    _getFeedbackList() {
      this.getFeedbackList().then(res => {
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
              this._getFeedbackList()
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
              this._getFeedbackList()
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
            this._getFeedbackList()
          },
        })
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
