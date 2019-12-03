<template>
  <div>
    <van-nav-bar @click-left="$goBack" @click-right="_create" fixed left-arrow right-text="创建" title="店铺优惠"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <div :key="index" v-for="(item, index) in list">
      <van-panel
        :desc="item.type === '0' ? '新单' : '满减'"
        :status="item.status === '1' ? '启用' : '停用'"
        :title="`满${item.full_money}减${item.reduce_money}`"
      >
        <div slot="footer">
          <van-button size="mini" type="primary">编辑</van-button>
        </div>
      </van-panel>
      <div class="white-space"></div>
    </div>
    <!-- 弹出层 -->
    <!-- 优惠编辑 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showEditor">
      <ValidationObserver ref="observer" slim v-slot="{ invalid }">
        <van-cell-group>
          <ValidationProvider name="优惠条件" rules="required|numeric" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="优惠条件"
              placeholder="请输入满足金额"
              required
              type="number"
              v-model="formData.full_money"
            />
          </ValidationProvider>
          <ValidationProvider name="优惠金额" rules="required|numeric" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="优惠金额"
              placeholder="请输入优惠金额"
              required
              type="number"
              v-model="formData.reduce_money"
            />
          </ValidationProvider>
          <van-field :value="typeLabel" input-align="right" is-link label="优惠类型" readonly />
          <van-field :value="typeLabel" input-align="right" is-link label="使用状态" readonly />
        </van-cell-group>
      </ValidationObserver>
      <div class="btn-group">
        <van-button @click="_controlEditor">关闭</van-button>
        <van-button @click="_submit" type="primary">保存</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'eCommerceSettingPreferential',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        full_money: '',
        reduce_money: '',
        type: '0',
        status: '0',
      },
      list: [],
      showEditor: false,
      typeColumns: [{ label: '新单', value: '0' }, { label: '满减', value: '1' }],
      statusColumns: [{ label: '停用', value: '0' }, { label: '启用', value: '1' }],
    }
  },

  computed: {
    typeLabel() {
      return ''
    },
  },

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    id && this._getStoreFrontPreferentialList(id)
  },

  destroyed() {},

  methods: {
    ...mapActions('storeFront', ['getStoreFrontPreferentialList']),
    _controlEditor() {
      this.showEditor = !this.showEditor
    },
    _getStoreFrontPreferentialList(id) {
      this.getStoreFrontPreferentialList(id).then(res => {
        console.log(res)
        this.list = res
      })
    },
    _create() {
      this.formData = {
        full_money: '',
        reduce_money: '',
        type: '0',
        status: '0',
      }
      this._controlEditor()
    },
    _submit() {},
  },
}
</script>

<style lang="less" scoped>
.btn-group {
  .van-button {
    width: 50%;
    margin: 0;
  }
}
.van-panel__footer {
  text-align: right;
}
</style>
