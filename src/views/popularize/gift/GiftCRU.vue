<template>
  <div>
    <van-nav-bar :title="`${type}礼品`" @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="礼品名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="礼品名称"
            placeholder="请填写礼品名称"
            required
            v-model.trim="formData.gift_name"
          />
        </ValidationProvider>
        <ValidationProvider name="礼品分类" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="categoryLabel1"
            @click="_controlCategoryPicker1"
            error-message-align="right"
            input-align="right"
            is-link
            label="选择分类"
            placeholder="请选择"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider name="分类产品" rules="required" slim v-if="categoryLabel1" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="categoryLabel2"
            @click="_controlCategoryPicker2"
            error-message-align="right"
            input-align="right"
            is-link
            label="选择分类产品"
            placeholder="请选择"
            readonly
            required
          />
        </ValidationProvider>
        <van-cell title="是否到店自提">
          <van-switch active-value="1" inactive-value="0" v-model="formData.pick_in_store" />
        </van-cell>
        <area-picker
          :data="defaultArea"
          :field="formData.pick_in_store === '0' ? '兑换地区' : ''"
          :pickArea="_pickArea"
          :pickCircle="_pickCircle"
          :pickMarket="_pickMarket"
          title="兑换地区"
          v-show="formData.pick_in_store === '0'"
        ></area-picker>
        <ValidationProvider name="自提店铺" rules="required" slim v-if="formData.pick_in_store === '1'" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="formData.store.length ? '1' : ''"
            @click="_controlStorePopup"
            error-message-align="right"
            input-align="right"
            is-link
            label="选择自提店铺"
            placeholder="请选择"
            readonly
            required
          >
            <div slot="input" v-if="formData.store.length">
              <div :key="item" v-for="item in formData.store">
                <van-tag type="primary">{{ _storeLabel(item) }}</van-tag>
              </div>
            </div>
          </van-field>
        </ValidationProvider>
        <ValidationProvider name="结算价格" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="结算价格"
            placeholder="最多支持2位小数"
            required
            v-model.trim="formData.worth"
          />
        </ValidationProvider>
        <ValidationProvider name="库存数量" rules="required|gte-1" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="库存数量"
            placeholder="请填写礼品库存量"
            required
            v-model.trim="formData.sku"
          />
        </ValidationProvider>
        <img-cropper :confirm="_pickPic" :count="5" :list="pic" field="图片" title="图片"></img-cropper>
        <ValidationProvider name="礼品简述" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="简述"
            maxlength="50"
            placeholder="简短描述信息"
            required
            rows="2"
            show-word-limit
            type="textarea"
            v-model.trim="formData.intro"
          />
        </ValidationProvider>
        <ValidationProvider name="礼品规格" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="礼品规格"
            placeholder="礼品规格信息"
            required
            type="textarea"
            v-model.trim="formData.specification"
          />
        </ValidationProvider>
        <ValidationProvider name="发货清单" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="发货清单"
            placeholder="请填写发货清单"
            required
            type="textarea"
            v-model.trim="formData.invoice_content"
          />
        </ValidationProvider>
        <van-cell required title="礼品描述"></van-cell>
        <quill-editor :changeHtml="_changeHtml" :context="formData.gift_content" ref="editor"></quill-editor>
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
    <!-- 父分类 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCategoryPicker1">
      <van-picker
        :columns="categoryColumns1"
        :default-index="categoryIndex1"
        @cancel="_controlCategoryPicker1"
        @confirm="_pickCategory1"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 子分类 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCategoryPicker2">
      <van-picker
        :columns="categoryColumns2"
        :default-index="categoryIndex2"
        @cancel="_controlCategoryPicker2"
        @confirm="_pickCategory2"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 店铺选择 -->
    <van-popup position="top" safe-area-inset-bottom v-model="showStorePopup">
      <van-checkbox-group class="cache-list" v-model="cache">
        <van-cell-group>
          <van-cell
            :key="index"
            :title="item.label"
            @click="_toggle(index)"
            clickable
            v-for="(item, index) in storeList"
          >
            <van-checkbox :name="item" ref="checkboxes" slot="right-icon"></van-checkbox>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <van-row>
        <van-col span="12">
          <van-button @click="_controlStorePopup">取消</van-button>
        </van-col>
        <van-col span="12">
          <van-button @click="_pickStore" type="primary">确定</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AreaPicker from '@/components/AreaPicker'
import ImgCropper from '@/components/ImgCropper'
import QuillEditor from '@/components/QuillEditor'
export default {
  name: 'giftCRU',

  mixins: [],

  components: {
    AreaPicker,
    ImgCropper,
    QuillEditor,
  },

  props: {},

  data() {
    return {
      formData: {
        gift_name: '',
        cat_fid: '',
        cat_id: '',
        pick_in_store: '0',
        store: [],
        province_idss: '',
        city_idss: '',
        area_idss: '',
        circle_idss: '',
        market_idss: '',
        worth: '',
        sku: '',
        wap_pic: [],
        intro: '',
        specification: '',
        invoice_content: '',
        gift_content: '',
      },
      defaultArea: null,
      pic: [],
      categoryColumns1: [],
      categoryColumns2: [],
      showCategoryPicker1: false,
      showCategoryPicker2: false,
      showStorePopup: false,
      loading: false,
      cache: [],
      storeList: [],
    }
  },

  computed: {
    type() {
      const { id } = this.$route.params
      return id ? '编辑' : '创建'
    },
    categoryLabel1() {
      const item = this.categoryColumns1.find(item => item.value === this.formData.cat_fid)
      return item && item.label
    },
    categoryLabel2() {
      const item = this.categoryColumns2.find(item => item.value === this.formData.cat_id)
      return item && item.label
    },
    categoryIndex1() {
      const index = this.categoryColumns1.findIndex(item => item.value === this.formData.cat_fid)
      return index
    },
    categoryIndex2() {
      const index = this.categoryColumns2.findIndex(item => item.value === this.formData.cat_fid)
      return index
    },
  },

  watch: {},

  created() {},

  async mounted() {
    await this.getStoreList().then(res => {
      this.storeList = res.store_list
    })
    this._getGiftCategory()
    const { id } = this.$route.params
    id && this._readGiftDetail(id)
  },

  destroyed() {},

  methods: {
    ...mapActions(['getStoreList']),
    ...mapActions('gift', ['getGiftCategory', 'createGift', 'readGiftDetail', 'updateGift']),
    // 礼品分类开关
    _controlCategoryPicker1() {
      this.showCategoryPicker1 = !this.showCategoryPicker1
    },
    // 店铺选择开关
    _controlStorePopup() {
      this.showStorePopup = !this.showStorePopup
    },
    // 礼品分类选择
    _pickCategory1(data) {
      this.formData.cat_fid = data.value
      this._getGiftCategory(data.value)
      this._controlCategoryPicker1()
    },
    _controlCategoryPicker2() {
      this.showCategoryPicker2 = !this.showCategoryPicker2
    },
    _pickStore() {
      const arr = []
      this.cache.forEach(item => {
        arr.push(item.value)
      })
      this.formData.store = arr
      this._controlStorePopup()
    },
    _pickCategory2(data) {
      this.formData.cat_id = data.value
      this._controlCategoryPicker2()
    },
    _pickArea(data) {
      this.formData.province_idss = data[0].value
      this.formData.city_idss = data[1].value
      this.formData.area_idss = data[2].value
    },
    _pickCircle(data) {
      this.formData.circle_idss = data.value
    },
    _pickMarket(data) {
      this.formData.market_idss = data.value
    },
    _pickPic(data) {
      this.formData.wap_pic = data.map(item => item.url)
    },
    _changeHtml(data) {
      this.formData.gift_content = data.html
    },
    // checkbox选中状态切换
    _toggle(index, flag) {
      // 判断是否选可选
      !flag && this.$refs.checkboxes[index].toggle()
    },
    _getGiftCategory(id) {
      this.getGiftCategory(id).then(res => {
        if (id) {
          this.categoryColumns2 = res
        } else {
          this.categoryColumns1 = res
        }
      })
    },
    _storeLabel(id) {
      const item = this.storeList.find(item => item.value === id)
      return item && `${item.label} - ${item.adress}`
    },
    // 读取礼品默认数据
    _readGiftDetail(id) {
      this.readGiftDetail(id).then(res => {
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res[item]
        })
        this.formData.store = res.store_arr
        // 设置默认选中的店铺
        const cache = []
        res.store_arr.forEach(item => {
          const result = this.storeList.find(i => i.value === item)
          result && cache.push(result)
        })
        this.cache = cache
        this.formData.wap_pic = res.wap_pic.split(',')
        res.province_idss !== '0' &&
          (this.defaultArea = [res.province_idss, res.city_idss, res.area_idss, res.circle_idss, res.market_idss])
        this._getGiftCategory(res.cat_fid)
        this.pic = res.wap_pic_list
        this.$nextTick(function() {
          this.$refs.editor.$refs.quillEditor.quill.blur()
          window.scroll(0, 0)
        })
      })
    },
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
        if (!this.$refs.editor.editorHtml) {
          this.$notify({
            type: 'warning',
            message: '请填写完整信息',
          })
        } else {
          // 加锁
          this.loading = true
          // 表单完整，进行数据修改并提交
          const { id } = this.$route.params
          let method = 'createGift'
          const params = JSON.parse(JSON.stringify(this.formData))
          if (id) {
            params.gift_id = id
            method = 'updateGift'
          }
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
      }
    },
  },
}
</script>

<style lang="less" scoped>
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
