<template>
  <div>
    <van-nav-bar :title="`${type}套餐`" @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="套餐名称" rules="required" slim v-slot="{ errors }">
          <van-field :error-message="errors[0]" label="套餐名称" placeholder="套餐名称" required v-model.trim="formData.name"></van-field>
        </ValidationProvider>
        <ValidationProvider name="价格" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="价格"
            placeholder="套餐价格"
            required
            type="number"
            v-model.trim="formData.price"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="套餐总数" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="总数"
            placeholder="套餐总数"
            required
            type="number"
            v-model.trim="formData.total_num"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="限购数量" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="每人限购"
            placeholder="限购数量"
            required
            type="number"
            v-model.trim="formData.person_num"
          ></van-field>
        </ValidationProvider>
        <van-cell @click="_controlServiceCommodityPicker" clickable title="套餐包含项目">
          <van-icon name="point-gift-o" slot="right-icon" style="line-height: inherit;" />
        </van-cell>
      </van-cell-group>
      <van-cell-group :key="index" v-for="(item, index) in formData.project_data">
        <van-cell :title="item.name">
          <van-stepper min="1" v-model="item.meal_num" />
        </van-cell>

        <!-- 写到这了 -->
      </van-cell-group>
    </ValidationObserver>
    <van-popup :style="{ minHeight: '20%' }" position="top" v-model="showServiceCommodityPicker">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <van-checkbox-group class="cache-list" v-model="cache">
          <van-cell-group>
            <van-cell
              :key="index"
              :title="item.appoint_name"
              @click="_toggle(index)"
              clickable
              v-for="(item, index) in list"
            >
              <van-checkbox :name="item" ref="checkboxes" slot="right-icon"></van-checkbox>
              <div slot="title">
                <img :src="item.pic" alt />
                {{ item.appoint_name }}
              </div>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-list>
      <van-row>
        <van-col span="12">
          <van-button @click="_controlServiceCommodityPicker">取消</van-button>
        </van-col>
        <van-col span="12">
          <van-button @click="_pickCacheCommodity" type="primary">确定</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'packageCommodityCRU',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        name: '',
        price: '',
        total_num: '',
        person_num: '',
        project_data: [],
      },
      list: [],
      page: 1,
      finished: false,
      loading: false,
      showServiceCommodityPicker: false,
      cache: [],
      // 已选择的服务商品
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    finishText() {
      return this.list.length ? '没有更多了' : ''
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('commodity', ['getServiceCommodityList']),
    // 服务商品选择开关
    _controlServiceCommodityPicker() {
      this.showServiceCommodityPicker = !this.showServiceCommodityPicker
    },
    // checkbox选中状态切换
    _toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    // 更新电商商品数据
    _onLoad() {
      this.getServiceCommodityList(this.page).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
          this.list.push(...res)
        }
      })
    },
    // 选中要包含的服务商品
    _pickCacheCommodity() {
      this.cache.forEach(item => {
        this.formData.project_data.push({
          appoint_id: item.appoint_id,
          name: item.appoint_name,
          meal_num: '',
          start_time: '',
          end_time: '',
        })
      })
      this._controlServiceCommodityPicker()
    },
    // 提交表单
    _submit() {
      console.log(this.formData)
    },
  },
}
</script>

<style lang="less" scoped>
img {
  width: 30px;
  height: 30px;
  vertical-align: -9px;
  margin-right: 10px;
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
