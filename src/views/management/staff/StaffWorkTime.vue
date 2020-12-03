<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="店员上班时间"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky class="sticky">
      <div style="background-color: #f5f5f9">
        <div class="white-space"></div>
        <van-cell center clickable title="添加模版" @click="showPopup">
          <van-icon class="add-icon" color="#1989fa" name="add" slot="icon" />
        </van-cell>
        <div class="white-space"></div>
      </div>
    </van-sticky>
    <van-cell-group>
      <van-cell :title="item.name" v-for="item in list" :key="item.id">
        <van-button size="mini" @click="deleteItem(item.id)" type="danger">删除</van-button>
        <van-button size="mini" @click="modify(item)">修改</van-button>
      </van-cell>
    </van-cell-group>
    <van-popup v-model="show" position="bottom" safe-area-inset-bottom>
      <van-form @submit="onSubmit">
        <van-field
          v-model="form.name"
          name="name"
          label="名称"
          placeholder="请输入名称"
          :rules="[{ required: true, message: '请填写名称' }]"
        />
        <van-field
          readonly
          clickable
          name="start_time"
          :value="form.start_time"
          label="上班时间"
          placeholder="选择上班时间"
          @click="showStartTimePopup"
        />
        <van-field
          readonly
          clickable
          name="end_time"
          :value="form.end_time"
          label="下班时间"
          placeholder="选择下班时间"
          @click="showEndTimePopup"
        />
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-popup>
    <van-popup v-model="showStartTime">
      <van-datetime-picker
        v-model="start_time"
        type="time"
        title="选择时间"
        :min-hour="0"
        :max-hour="23"
        @confirm="pickStartTime"
        @cancel="showStartTime = false"
      />
    </van-popup>
    <van-popup v-model="showEndTime">
      <van-datetime-picker
        v-model="end_time"
        type="time"
        title="选择时间"
        :min-hour="0"
        :max-hour="23"
        @confirm="pickEndTime"
        @cancel="showEndTime = false"
      />
    </van-popup>
  </div>
</template>

<script>
import api from '@/api/management/staff'
export default {
  name: 'StaffWorkTime',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      form: {
        id: '',
        name: '',
        start_time: '',
        end_time: '',
      },
      show: false,
      showStartTime: false,
      showEndTime: false,
      list: [],
      start_time: '',
      end_time: '',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.getList()
  },

  destroyed() {},

  methods: {
    getList() {
      api.getStaffWorkTimeList().then(res => {
        if (typeof res == 'string') {
          this.$toast.fail(res)
        } else {
          this.list = res
        }
      })
    },
    modify(item) {
      this.form = {
        id: item.id,
        name: item.name,
        start_time: item.start_time,
        end_time: item.end_time,
      }
      this.show = true
    },
    showPopup() {
      this.show = true
    },
    showStartTimePopup() {
      this.showStartTime = true
    },
    showEndTimePopup() {
      this.showEndTime = true
    },
    pickStartTime(val) {
      this.showStartTime = false
      this.form.start_time = val
    },
    pickEndTime(val) {
      this.showEndTime = false
      this.form.end_time = val
    },
    onSubmit() {
      // const flag = this.compareTime(this.form.start_time, this.form.end_time)
      // console.log(flag)
      // if (!flag) {

      // } else {
      //   this.$toast('上班时间不能大于下班时间')
      // }
      api
        .createStaffWorkTimeList({
          id: this.form.id,
          name: this.form.name,
          start_time: this.form.start_time,
          end_time: this.form.end_time,
        })
        .then(res => {
          if (typeof res == 'string') {
            this.$toast.fail(res)
          } else {
            this.$toast('操作成功')
            this.getList()
            this.show = false
          }
        })
        .catch(res => {
          this.$toast.fail(res.errorMsg)
        })
    },
    deleteItem(id) {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否删除此项',
        })
        .then(() => {
          api
            .deleteStaffWorkTimeList({
              id,
            })
            .then(res => {
              if (typeof res == 'string') {
                this.$toast.fail(res)
              } else {
                this.$toast.success('操作成功')
                this.getList()
              }
            })
            .catch(err => {
              this.$toast.fail(err.errorMsg)
            })
        })
        .catch(() => {
          // on cancel
        })
    },
    compareTime(t1, t2) {
      var date = new Date()
      var a = t1.split(':')
      var b = t2.split(':')
      return date.setHours(a[0], a[1]) > date.setHours(b[0], b[1])
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
</style>
