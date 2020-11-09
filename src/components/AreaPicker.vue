<!--
  功能：省市区级联组件（验证非空）
  作者：cc
  时间：2019年11月20日
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
  备注：  需要包在ValidationObserver内使用
  props：
    title<String>：cellTitle
    field<String>: 验证名称
    data<Array>：默认展示数据
    pickArea<Function>：返回选中的地区数据到父组件
    pickCircle<Function>：返回选中的商圈数据到父组件
    pickMarket<Function>：返回选中的商盟数据到父组件
-->
<template>
  <div>
    <ValidationProvider :name="field" :rules="field ? 'required' : null" slim v-slot="{ errors }">
      <van-field
        :error-message="errors[0]"
        :label="title"
        :required="!!field"
        :value="areaLabel"
        @click="_controlAreaPicker"
        error-message-align="right"
        input-align="right"
        is-link
        placeholder="选择地址"
        readonly
      ></van-field>
    </ValidationProvider>
    <van-field
      :value="circleLabel"
      @click="_controlCirclePicker"
      error-message-align="right"
      input-align="right"
      is-link
      label="所处商圈"
      placeholder="选择商圈"
      readonly
      v-if="circleColumns.length"
      v-show="pickCircle && areaLabel"
    ></van-field>
    <van-field
      :value="marketLabel"
      @click="_controlMarketPicker"
      error-message-align="right"
      input-align="right"
      is-link
      label="所处商盟"
      placeholder="选择商盟"
      readonly
      v-if="marketColumns.length"
      v-show="pickMarket && circleLabel"
    ></van-field>
    <!-- 弹出层 -->
    <!-- 地区选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showAreaPicker">
      <van-picker
        :columns="areaColumns"
        @cancel="_controlAreaPicker"
        @change="_changeArea"
        @confirm="_pickArea"
        show-toolbar
        value-key="label"
        :loading="loading"
      />
    </van-popup>
    <!-- 商圈选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCirclePicker">
      <van-picker
        :columns="circleColumns"
        :default-index="circleIndex"
        @cancel="_controlCirclePicker"
        @confirm="_pickCircle"
        show-toolbar
        value-key="label"
      />
    </van-popup>
    <!-- 商盟选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showMarketPicker">
      <van-picker
        :columns="marketColumns"
        :default-index="marketIndex"
        @cancel="_controlMarketPicker"
        @confirm="_pickMarket"
        show-toolbar
        value-key="label"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'areaPicker',

  mixins: [],

  components: {},

  props: {
    title: {
      type: String,
      required: true,
    },
    field: {
      type: String,
    },
    data: {
      type: Array,
      default: null,
    },
    pickArea: {
      type: Function,
      required: true,
    },
    pickCircle: {
      type: Function,
    },
    pickMarket: {
      type: Function,
    },
  },

  data() {
    return {
      // 展示label所用
      area: [],
      circle_id: '',
      market_id: '',
      // 地区pickerData
      areaColumns: [],
      // 商圈pickerData
      circleColumns: [],
      // 商盟pcikerData
      marketColumns: [],
      showAreaPicker: false,
      showCirclePicker: false,
      showMarketPicker: false,
      loading: false,
    }
  },

  computed: {
    // 店铺所在地非空验证
    areaLabel() {
      if (this.area.length) {
        return this.area[0].label + ' / ' + this.area[1].label + ' / ' + this.area[2].label
      }
      return ''
    },
    circleLabel() {
      const item = this.circleColumns.find(item => item.value === this.circle_id)
      return item && item.label
    },
    circleIndex() {
      const index = this.circleColumns.findIndex(item => item.value === this.circle_id)
      return index
    },
    marketLabel() {
      const item = this.marketColumns.find(item => item.value === this.market_id)
      return item && item.label
    },
    marketIndex() {
      const index = this.marketColumns.findIndex(item => item.value === this.market_id)
      return index
    },
  },

  watch: {
    data() {
      this._getAllAddressColumnsForPicker()
    },
  },

  created() {},

  mounted() {
    !this.data && this._getDefaultAddressColumnsForPicker()
  },

  destroyed() {},

  methods: {
    ...mapActions([
      'getAllAddressColumnsForPicker',
      'getDefaultAddressColumnsForPicker',
      'getProvince',
      'getCity',
      'getArea',
      'getCircle',
      'getMarket',
    ]),
    // 地区选择开关
    _controlAreaPicker() {
      this.showAreaPicker = !this.showAreaPicker
    },
    // 商圈选择开关
    _controlCirclePicker() {
      this.showCirclePicker = !this.showCirclePicker
    },
    // 商盟选择开关
    _controlMarketPicker() {
      this.showMarketPicker = !this.showMarketPicker
    },
    async _changeArea(picker, values, index) {
      switch (index) {
        case 0:
          if (!values[index].children) {
            this.loading = true
            this.getCity({ id: values[index].value, shift: true })
              .then(citys => {
                values[index].children = citys
                picker.setColumnValues(1, citys)
                this.getArea({ id: citys[0].value, shift: true })
                  .then(areas => {
                    this.loading = false
                    citys[0].children = areas
                    picker.setColumnValues(2, areas)
                  })
                  .catch(() => {
                    picker.setColumnValues(2, [])
                    this.loading = false
                  })
              })
              .catch(() => {
                picker.setColumnValues(1, [])
                picker.setColumnValues(2, [])
                this.loading = false
              })
          } else {
            picker.setColumnValues(1, values[index].children)
            picker.setColumnValues(2, values[index].children[0].children)
          }
          break
        case 1:
          console.log(values)
          if (!values[index].children) {
            this.loading = true
            this.getArea({ id: values[index].value, shift: true })
              .then(areas => {
                this.loading = false
                values[index].children = areas
                picker.setColumnValues(2, areas)
              })
              .catch(() => {
                this.loading = false
                picker.setColumnValues(2, [])
              })
          } else {
            picker.setColumnValues(2, values[index].children)
          }
          break
        case 2:
          break
      }
    },
    async _changeArea2(picker, values) {
      console.log(picker)
      if (!values[0].children) {
        this.loading = true
        this.getCity({ id: values[0].value, shift: true })
          .then(res => {
            values[0].children = res
            picker.setColumnValues(1, res)
            this.getArea({ id: res[0].value, shift: true })
              .then(res2 => {
                this.loading = false
                res[0].children = res2
                picker.setColumnValues(2, res2)
              })
              .catch(() => {
                this.loading = false
              })
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        // picker.setColumnValues(1, values[0].children)
        if (!values[1].children) {
          this.loading = true
          this.getArea({ id: values[1].value, shift: true })
            .then(res2 => {
              this.loading = false
              values[1].children = res2
              picker.setColumnValues(2, res2)
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          picker.setColumnValues(2, values[1].children)
        }
      }
    },
    // 地区选择
    _pickArea(data) {
      this.area = data
      this.pickArea(data)
      if (this.pickCircle) {
        this.circleColumns = []
        this.getCircle({ id: data[2].value, shift: true }).then(res => {
          this.circleColumns = res || []
        })
      }
      this._controlAreaPicker()
    },
    // 商圈选择
    _pickCircle(data) {
      this.circle_id = data.value
      this.pickCircle(data)
      if (this.pickMarket) {
        this.marketColumns = []
        this.getMarket({ id: data.value, shift: true }).then(res => {
          this.marketColumns = res || []
        })
      }
      this._controlCirclePicker()
    },
    // 商盟选择
    _pickMarket(data) {
      this.market_id = data.value
      this.pickMarket(data)
      this._controlMarketPicker()
    },
    // 没有地区数据，默认级联
    _getDefaultAddressColumnsForPicker() {
      this.getDefaultAddressColumnsForPicker({ shift: true }).then(res => {
        this.areaColumns = res
      })
    },
    // 根据默认级联数据
    _getAllAddressColumnsForPicker() {
      this.getAllAddressColumnsForPicker({
        province: this.data[0],
        city: this.data[1],
        area: this.data[2],
        circle: this.data[3],
        market: this.data[4],
      }).then(res => {
        this.areaColumns = res.area
        this.area = [
          res.area[0].values[res.area[0].defaultIndex],
          res.area[1].values[res.area[1].defaultIndex],
          res.area[2].values[res.area[2].defaultIndex],
        ]
        this.market_id = res.market_id
        if (this.data[3]) {
          this.circle_id = this.data[3]
          this.circleColumns = res.circle || []
        }
        if (this.data[4]) {
          this.market_id = this.data[4]
          this.marketColumns = res.market || []
        }
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
