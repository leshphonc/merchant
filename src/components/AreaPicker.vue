<template>
  <div>
    <ValidationProvider :name="title" rules="required" slim v-slot="{ errors }">
      <van-field
        :error-message="errors[0]"
        :label="title"
        :value="areaLabel"
        @click="_controlAreaPicker"
        error-message-align="right"
        input-align="right"
        is-link
        placeholder="选择地址"
        readonly
        required
      ></van-field>
    </ValidationProvider>
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
    data: {
      type: Object,
    },
    pickArea: {
      type: Function,
      required: true,
    },
    callbackDefault: {
      type: Function,
    },
  },

  data() {
    return {
      area: [],
      areaColumns: [],
      showAreaPicker: false,
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
    async _changeArea(picker, values) {
      if (!values[0].children) {
        this.getCity({ id: values[0].value, shift: true }).then(res => {
          console.log(res)
          values[0].children = res
          picker.setColumnValues(1, res)
          this.getArea({ id: res[0].value, shift: true }).then(res2 => {
            res.children = res2
            picker.setColumnValues(2, res2)
          })
        })
      } else {
        const second = values[0].children[0]
        picker.setColumnValues(1, values[0].children)
        if (!second.children) {
          this.getArea({ id: second.value, shift: true }).then(res2 => {
            second.children = res2
            picker.setColumnValues(2, res2)
          })
        } else {
          picker.setColumnValues(2, second.children)
        }
      }
    },
    // 地区选择
    _pickArea(data) {
      this.area = data
      this.pickArea(data)
      // this.circleColumns = []
      // this.formData.circle_id = ''
      // this.getCircle({ id: data[2].value, shift: true }).then(res => {
      //   console.log(res)
      //   this.circleColumns = res
      // })
      this._controlAreaPicker()
    },
    // 没有地区数据，默认级联
    _getDefaultAddressColumnsForPicker() {
      this.getDefaultAddressColumnsForPicker({ shift: true }).then(res => {
        console.log(res)
        this.areaColumns = res
      })
    },
    // 根据默认级联数据
    _getAllAddressColumnsForPicker() {
      console.log(this.data)
      this.getAllAddressColumnsForPicker({
        province: this.data.province_id,
        city: this.data.city_id,
        area: this.data.area_id,
      }).then(res => {
        this.areaColumns = res.area
        this.area = [
          res.area[0].values[res.area[0].defaultIndex],
          res.area[1].values[res.area[1].defaultIndex],
          res.area[2].values[res.area[2].defaultIndex],
        ]
        console.log(this.area)
        this.callbackDefault(this.area)
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
