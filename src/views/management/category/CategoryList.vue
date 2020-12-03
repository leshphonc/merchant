<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="分类管理"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky class="sticky">
      <div style="background-color: #f5f5f9">
        <div class="white-space"></div>
        <van-cell center clickable title="新增分类" @click="showCateCRUDPopup">
          <van-icon class="add-icon" color="#1989fa" name="add" slot="icon" />
        </van-cell>
        <div class="white-space"></div>
      </div>
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell @click="showChildPopup(item)" is-link v-for="item in list" :key="item.id">
          <div slot="title">
            {{ item.name }}
            <van-button @click.stop="modifyCategory(item)" size="mini" style="margin-left: 10px">编辑</van-button>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>

    <van-popup v-model="showCateCRUD" :style="{ width: '75%' }" round>
      <van-form @submit="onSubmit">
        <van-field
          v-model="form.name"
          name="name"
          label="分类名称"
          placeholder="分类名称"
          :rules="[
            { required: true, message: '请填写分类名' },
            {
              pattern: /^[\u4e00-\u9fa5]+$/,
              message: '只支持中文',
            },
          ]"
        />
        <van-field
          v-model="form.sort"
          name="sort"
          type="digit"
          label="排序"
          placeholder="排序越大越靠前"
          :rules="[{ required: true, message: '请填写排序' }]"
        />
        <van-field
          v-model="FCateName"
          name="fid"
          input-align="right"
          readonly
          is-link
          label="父级分类"
          @click="showCatePickerPopup"
          placeholder="无"
        />
        <div style="margin: 16px" class="btn-group">
          <van-button
            round
            block
            type="danger"
            native-type="button"
            plain
            v-if="btnName == '修改'"
            :loading="loading"
            @click="deleteCategory"
          >
            删除
          </van-button>
          <van-button round block type="primary" :loading="loading" native-type="submit">{{ btnName }}</van-button>
        </div>
      </van-form>
    </van-popup>
    <van-popup v-model="showCatePicker" safe-area-inset-bottom position="bottom">
      <van-picker
        show-toolbar
        :columns="listHasEmpty"
        @cancel="showCatePicker = false"
        @confirm="pickCate"
        value-key="name"
      />
    </van-popup>
    <van-popup
      v-model="showChild"
      get-container="body"
      safe-area-inset-bottom
      position="right"
      :style="{ width: '40%', height: '100%' }"
    >
      <van-cell :title="item.name" is-link @click="modifyCategory(item)" v-for="item in child" :key="item.id" />
      <van-cell v-if="child.length == 0">暂无分类</van-cell>
      <!-- <van-button block type="primary" @click="showCateCRUDPopup(item)" class="childAddBtn">添加</van-button> -->
    </van-popup>
  </div>
</template>

<script>
import api from '@/api/management/category'

export default {
  name: 'CategoryList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      page: 1,
      size: 10,
      list: [],
      child: [],
      showChild: false,
      showCateCRUD: false,
      showCatePicker: false,
      form: {
        name: '',
        sort: '',
        fid: '',
        id: '',
      },
      loading: false,
      finished: false,
      refreshing: false,
      btnName: '',
    }
  },

  computed: {
    FCateName() {
      const item = this.list.find(item => {
        if (item.id == this.form.fid) {
          return item
        }
      })
      return (item && item.name) || ''
    },
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    listHasEmpty() {
      return [{ name: '无', id: '' }, ...this.list]
    },
  },

  watch: {},

  created() {},

  mounted() {
    // this.getCategoryList()
  },

  destroyed() {},

  methods: {
    onLoad() {
      api
        .getCategoryList({
          page: this.page,
          size: this.size,
        })
        .then(res => {
          if (typeof res == 'string') {
            this.$toast.fail(res)
          } else {
            if (res.length < 10) {
              this.finished = true
            } else {
              this.page += 1
            }
            this.list.push(...res)
          }
          this.loading = false
        })
    },
    onRefresh() {
      this.page = 1
      this.list = []
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    showChildPopup(item) {
      this.child = item.child || []
      this.showChild = true
    },
    showCateCRUDPopup(item) {
      this.btnName = '创建'
      this.showCateCRUD = true
      this.form = {
        name: '',
        sort: '',
        fid: '',
        id: '',
      }
    },
    modifyCategory(item) {
      this.btnName = '修改'
      this.form = {
        name: item.name,
        sort: item.sort,
        fid: item.fid,
        id: item.id,
      }
      this.showCateCRUD = true
    },
    showCatePickerPopup(item) {
      this.showCatePicker = true
    },
    pickCate(item) {
      this.showCatePicker = false
      this.form.fid = item.id
    },
    getFCateName(value, rule) {
      this.form.fid = value.name
    },
    deleteCategory() {
      this.$dialog
        .confirm({
          title: '删除分类',
          message: `确认删除 ${this.form.name} 分类吗？`,
        })
        .then(() => {
          api.deleteCategory(this.form.id).then(res => {
            if (typeof res === 'string') {
              this.$toast.fail(res)
            } else {
              this.$toast.success('删除成功')
              this.showCateCRUD = false
              this.showChild = false
              this.onRefresh()
            }
          })
        })
    },
    onSubmit(value) {
      this.loading = true
      api
        .createOrModifyCategory(this.form)
        .then(res => {
          if (typeof res == 'string') {
            this.$toast.fail(res)
          } else {
            this.showCateCRUD = false
            this.showChild = false
            this.$toast.success('操作成功')
            this.onRefresh()
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
.sticky {
  position: relative;
  z-index: 10;
}
.add-icon {
  margin-right: 10px;
  font-size: 18px;
}

.btn-group {
  .van-button {
    margin: 10px 0;
  }
}
</style>
