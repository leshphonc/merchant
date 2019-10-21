<template>
  <div>
    <merchant-card></merchant-card>
    <div class="white-space"></div>
    <div class="wing-blank">
      <div class="card-panel">
        <map-grid :data="settingData"></map-grid>
      </div>
    </div>
    <div class="white-space"></div>
    <div class="wing-blank">
      <div class="card-panel">
        <map-grid :data="billData"></map-grid>
      </div>
    </div>
  </div>
</template>

<script>
import MerchantCard from '@/components/MerchantCard'
import MapGrid from '@/components/MapGrid'
import { SettingGrid, BillGrid } from '@/common/grid'
export default {
  name: '',

  mixins: [],

  components: {
    MerchantCard,
    MapGrid,
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
