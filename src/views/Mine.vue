<template>
  <div>
    <merchant-card></merchant-card>
    <div class="white-space"></div>
    <div class="wing-blank">
      <div class="card-panel">
        <grid-map :data="settingData"></grid-map>
      </div>
    </div>
    <div class="white-space"></div>
    <div class="wing-blank">
      <div class="card-panel">
        <grid-map :data="billData"></grid-map>
      </div>
    </div>
  </div>
</template>

<script>
import MerchantCard from '@/components/MerchantCard'
import GridMap from '@/components/GridMap'
import { SettingGrid, BillGrid } from '@/common/grid'
export default {
  name: '',

  mixins: [],

  components: {
    MerchantCard,
    GridMap,
  },

  props: {},

  data() {
    return {
      settingData: SettingGrid,
      billData: BillGrid,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {},
}
</script>

<style lang="less" scoped></style>
