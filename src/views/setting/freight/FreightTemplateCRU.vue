<template>
  <div>
    <van-nav-bar :title="`${type}运费模版`" @click-left="_goBack" @click-right="_submit" fixed left-arrow right-text="保存"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <ValidationProvider name="模版名称" rules="required" slim v-slot="{ errors }">
        <van-field :error-message="errors[0]" label="模版名称" placeholder="模版名称" required v-model.trim="formData.name" />
      </ValidationProvider>
      <van-cell-group
        :key="index"
        :title="`区域${index + 1}`"
        class="van-hairline--bottom"
        v-for="(item, index) in formData.area"
      >
        <van-cell center>
          <van-tag :key="id" plain size="medium" slot="title" v-for="id in item.aids">{{ _getAreaName(id) }}</van-tag>
          <van-icon @click="_deleteDom(index)" class="delete-icon" color="red" name="close" slot="right-icon" />
        </van-cell>
        <ValidationProvider :name="`区域${index + 1}运费`" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="运费"
            placeholder="区域内运费"
            required
            type="number"
            v-model="item.freight"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider :name="`区域${index + 1}满免`" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            @click-right-icon="$toast('包邮条件，0表示不包邮')"
            label="满免"
            placeholder="满多少元包邮"
            required
            right-icon="question-o"
            type="number"
            v-model="item.full_money"
          ></van-field>
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>
    <van-button @click="_controlCacheAreaPicker" class="add-btn" icon="plus" round type="primary">选择区域</van-button>

    <!-- 弹出层 -->
    <!-- 配送区域 -->
    <van-popup :style="{ minHeight: '20%' }" position="top" v-model="showAreaPicker">
      <van-checkbox-group class="cache-list" v-model="cache">
        <van-cell-group>
          <van-cell
            :key="item.value"
            :title="item.label"
            @click="_checkCacheArea(index, item.disabled)"
            clickable
            v-for="(item, index) in cacheList"
          >
            <van-checkbox :disabled="item.disabled" :name="item.value" ref="checkboxes" slot="right-icon" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <van-row>
        <van-col span="12">
          <van-button @click="_controlCacheAreaPicker">取消</van-button>
        </van-col>
        <van-col span="12">
          <van-button @click="_pickCacheArea" type="primary">确定</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { TemplateArea } from '@/common/constant'

export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        name: '',
        area: [],
      },
      // 锁
      loading: false,
      // 控制
      showAreaPicker: false,
      // checkbox勾选中的数据
      cache: [],
      // 已选择的地区，用于disable标识
      selected: [],
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    // 配送区域列表
    cacheList() {
      const data = []
      const arr = Object.keys(TemplateArea)
      arr.forEach(item => {
        data.push({
          label: TemplateArea[item][0],
          value: item,
          disabled: this.selected.indexOf(item) !== -1,
        })
      })
      return data
    },
  },

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    id && this._readFreightTemPlateDetail(id)
  },

  destroyed() {},

  methods: {
    ...mapActions('freight', ['createFreightTemPlate', 'readFreightTemPlateDetail', 'updateFreightTemPlate']),
    // 配送区域开关
    _controlCacheAreaPicker() {
      this.showAreaPicker = !this.showAreaPicker
    },
    // 点击行选中地区
    _checkCacheArea(index, disabled) {
      if (disabled) return
      this.$refs.checkboxes[index].toggle()
    },
    // 将选中的地区添加至虚拟dom数据中，并置灰选中项
    _pickCacheArea() {
      this.formData.area.push({
        aids: this.cache,
        freight: '',
        full_money: '0',
      })
      this.selected.push(...this.cache)
      this.cache = []
      this._controlCacheAreaPicker()
    },
    // 删除渲染出的配送地址，并将选项置于可选
    _deleteDom(index) {
      const item = this.formData.area[index]
      item.aids.forEach(item => {
        const index = this.selected.indexOf(item)
        if (index > -1) {
          this.selected.splice(index, 1)
        }
      })
      this.formData.area.splice(index, 1)
    },
    // 根据id获得地区名称
    _getAreaName(id) {
      const { label } = this.cacheList.find(item => item.value === id)
      return label + ' '
    },
    // 获取详情数据
    _readFreightTemPlateDetail(id) {
      this.readFreightTemPlateDetail(id).then(res => {
        this.formData.name = res.name
        this.formData.area = res.value_list.map(item => ({
          aids: item.area_list.map(i => {
            this.selected.push(i.area_id)
            return i.area_id
          }),
          freight: item.freight,
          full_money: item.full_money,
        }))
      })
    },
    async _submit() {
      // 锁
      if (this.loading) return false
      // 验证表单
      console.log(this.formData)
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        this.$notify({
          type: 'warning',
          message: '请填写完整信息',
        })
      } else {
        // 加锁
        this.loading = true
        let method = 'createFreightTemPlate'
        const { id } = this.$route.params
        if (id) {
          method = 'updateFreightTemPlate'
          this.formData.tpl_id = id
        }
        this[method](this.formData)
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this._goBack()
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
.delete-icon {
  font-size: 16px;
}
.add-btn {
  position: fixed;
  bottom: 100px;
  right: 30px;
}
.van-popup {
  .cache-list {
    height: 65vh;
    overflow: scroll;
  }
  .van-button {
    width: 100%;
  }
}
</style>
