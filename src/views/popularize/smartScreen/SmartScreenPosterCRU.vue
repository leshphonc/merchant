<template>
  <div>
    <van-nav-bar :title="`${type}智能屏推广`" @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="关键词1" rules="required|min:2|max:6" slim v-slot="{ errors }">
          <van-field :error-message="errors[0]" label="对话关键词1" placeholder="关键词1" required v-model.trim="keywords[0]" />
        </ValidationProvider>
        <ValidationProvider name="关键词2" rules="min:2|max:6" slim v-slot="{ errors }">
          <van-field :error-message="errors[0]" label="对话关键词2" placeholder="关键词2" v-model.trim="keywords[1]" />
        </ValidationProvider>
        <ValidationProvider name="关键词3" rules="min:2|max:6" slim v-slot="{ errors }">
          <van-field :error-message="errors[0]" label="对话关键词3" placeholder="关键词3" v-model.trim="keywords[2]" />
        </ValidationProvider>
        <ValidationProvider name="排序" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="排序"
            placeholder="请填写排序"
            required
            type="number"
            v-model.trim="formData.sort"
          />
        </ValidationProvider>
        <ValidationProvider name="播报语音" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="播报语音"
            maxlength="100"
            placeholder="请填写播报语音"
            required
            rows="3"
            show-word-limit
            type="textarea"
            v-model.trim="formData.read_txt"
          />
        </ValidationProvider>
        <ValidationProvider name="标签" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="formData.label_ids.length ? '1' : ''"
            @click="_controlTagPicker"
            @click-left-icon.stop="$toast('该标签用于本店与同城推广')"
            error-message-align="right"
            input-align="right"
            is-link
            label="推广标签"
            left-icon="question-o"
            placeholder="请选择"
            readonly
            required
          >
            <div :key="index" slot="input" v-for="(item, index) in formData.label_ids">
              <van-tag type="primary">{{ _tagLabel(item) }}</van-tag>
            </div>
          </van-field>
        </ValidationProvider>
        <ValidationProvider name="分类" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="cateLabel"
            @click="_controlCatePicker"
            @click-left-icon.stop="$toast('该分类用于同城推广')"
            error-message-align="right"
            input-align="right"
            is-link
            label="推广分类"
            left-icon="question-o"
            placeholder="请选择"
            readonly
            required
          />
        </ValidationProvider>
        <!-- <van-cell title="选择商品">
          <van-switch active-value="1" inactive-value="0" v-model="formData.data_type"></van-switch>
        </van-cell>-->
      </van-cell-group>
      <van-cell-group title="推广内容">
        <van-tabs :lazy-render="false" v-model="formData.data_type">
          <van-tab title="海报">
            <ValidationProvider name="海报标题" rules="required" slim v-if="formData.data_type === 0" v-slot="{ errors }">
              <van-field
                :error-message="errors[0]"
                label="海报标题"
                placeholder="请填写海报标题"
                required
                v-model.trim="formData.title"
              />
            </ValidationProvider>
            <ValidationProvider name="海报网址" rules="required" slim v-if="formData.data_type === 0" v-slot="{ errors }">
              <van-field
                :error-message="errors[0]"
                label="海报网址"
                placeholder="请填写海报网址"
                required
                v-model.trim="formData.url"
              />
            </ValidationProvider>
            <img-cropper
              :confirm="_pickPoster"
              :list="posterList"
              :ratio="[7, 10]"
              field="海报图片"
              title="海报图片"
              v-if="formData.data_type === 0"
            ></img-cropper>
            <div class="tip">海报建议上传700*1000分辨率的图片</div>
          </van-tab>
          <van-tab title="商品">
            <commodity-radio
              :id="formData.goods_id"
              :pickCommodity="_pickCommodity"
              :type="formData.goods_type"
              v-show="formData.data_type === 1"
            ></commodity-radio>
          </van-tab>
        </van-tabs>
      </van-cell-group>
    </ValidationObserver>
    <!-- 分类选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCatePicker">
      <van-list
        :finished="cFinished"
        :finished-text="cFinishText"
        :immediate-check="false"
        @load="_cOnLoad"
        v-model="loading"
      >
        <van-radio-group v-model="formData.cate_id">
          <van-cell-group>
            <van-cell :key="index" :title="item.name" @click="_cToggle(index)" clickable v-for="(item, index) in cList">
              <van-radio :name="item.cat_id" ref="radioC" slot="right-icon" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-list>
      <van-button @click="_controlCatePicker">关闭</van-button>
    </van-popup>
    <!-- 标签选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showTagPicker">
      <van-list
        :finished="tFinished"
        :finished-text="tFinishText"
        :immediate-check="false"
        @load="_tOnLoad"
        v-model="loading"
      >
        <van-checkbox-group v-model="formData.label_ids">
          <van-cell-group>
            <van-cell :key="index" :title="item.name" @click="_tToggle(index)" clickable v-for="(item, index) in tList">
              <van-checkbox :name="item.cat_id" ref="checkboxesT" slot="right-icon" />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-list>
      <van-button @click="_controlTagPicker">关闭</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImgCropper from '@/components/ImgCropper'
import CommodityRadio from '@/components/CommodityRadio'

export default {
  name: 'smartScreenPosterCRU',

  mixins: [],

  components: {
    ImgCropper,
    CommodityRadio,
  },

  props: {},

  data() {
    return {
      formData: {
        title: '',
        keywords: '',
        sort: '',
        read_txt: '',
        ad_img: '',
        url: '',
        width: '0.32',
        data_type: 0,
        goods_id: '',
        goods_type: '',
        cate_id: '',
        label_ids: [],
      },
      keywords: [],
      posterList: [],
      showCatePicker: false,
      showTagPicker: false,
      cPage: 1,
      cList: [],
      cFinished: false,
      tPage: 1,
      tList: [],
      tFinished: false,
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    cFinishText() {
      return this.cList.length ? '没有更多了' : '暂无分类'
    },
    tFinishText() {
      return this.tList.length ? '没有更多了' : '暂无标签'
    },
    cateLabel() {
      const item = this.cList.find(item => item.cat_id === this.formData.cate_id)
      return item && item.name
    },
  },

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    id && this._getPosterDetail(id)
    this._cOnLoad()
    this._tOnLoad()
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', [
      'createPoster',
      'getPosterDetail',
      'updatePoster',
      'getSmartScreenPosterTagAndCateList',
    ]),
    _controlCatePicker() {
      this.showCatePicker = !this.showCatePicker
    },
    _controlTagPicker() {
      this.showTagPicker = !this.showTagPicker
    },
    _pickPoster(data) {
      this.formData.ad_img = data[0].url
    },
    _cOnLoad() {
      const { id } = this.$route.params
      this.getSmartScreenPosterTagAndCateList({
        page: this.cPage,
        data_type: 0,
      }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.cFinished = true
        } else {
          this.cPage += 1
        }
        this.cList.push(...res.lists)
      })
    },
    _tOnLoad() {
      const { id } = this.$route.params
      this.getSmartScreenPosterTagAndCateList({
        page: this.tPage,
        data_type: 1,
      }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.tFinished = true
        } else {
          this.tPage += 1
        }
        this.tList.push(...res.lists)
      })
    },
    _getPosterDetail(id) {
      this.getPosterDetail(id).then(res => {
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res[item]
        })
        this.formData.data_type = res.data_type - 0
        this.posterList = [{ url: res.ad_img }]
        this.formData.width = '0.32'
        this.keywords = res.keywords.split(',')
      })
    },
    _pickCommodity(id, type) {
      this.formData.goods_id = id
      this.formData.goods_type = type
    },

    _tagLabel(id) {
      const item = this.tList.find(item => item.cat_id === id)
      return item && item.name
    },
    // 屏幕选择
    _cToggle(index) {
      this.$refs.radioC[index].toggle()
    },
    // 角色选择
    _tToggle(index) {
      this.$refs.checkboxesT[index].toggle()
    },
    // 提交表单
    async _submit() {
      // 锁
      if (this.loading) return
      // 验证表单
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        this.$notify({
          type: 'warning',
          message: '请填写完整信息',
        })
      } else {
        // 加锁
        this.loading = true
        // 表单完整，进行数据修改并提交
        const params = JSON.parse(JSON.stringify(this.formData))
        params.keywords = this.keywords.join()
        let method = 'createPoster'
        const { imax, id } = this.$route.params
        params.imax_id = imax
        if (id) {
          method = 'updatePoster'
          params.ad_id = id
        } else {
          params.isnew = 1
        }
        // 判断是否选择商品
        if (params.data_type === '1' && !params.goods_id) {
          this.$toast.info({
            message: '请选择推广商品',
            forbidClick: true,
            duration: 1000,
          })
          this.loading = false
          return
        }
        // 修改label_ids为字符串
        params.label_ids = params.label_ids.join()
        this[method](params)
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this.$goBack()
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
/deep/.tip {
  font-size: 14px;
  padding: 4px 15px;
  color: @gray-deep-c;
}

.van-popup {
  height: 100vh;
  .van-list {
    padding-bottom: 44px;
  }
  .van-button {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
}
</style>
