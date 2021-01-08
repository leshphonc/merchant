<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="环境地图"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <div class="canvas-box">
      <canvas ref="canvas"></canvas>
    </div>
    <van-cell-group title="绿点（机器人），黄点（已标记），红点（未标记）">
      <van-cell v-if="markList.length == 0">暂无可标记点</van-cell>
      <van-cell :title="`标记点${index + 1}`" v-for="(item, index) in markList" :key="index">
        <van-button size="mini" @click="preViewMark(item.id)">查看标记</van-button>
        <van-button size="mini" v-if="item.marked == '1'" disabled>已标记</van-button>
        <van-button size="mini" v-else @click="changeMarkStatus(item.id, item.marked)">标记此处</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import api from '@/api/management/smartScreen'
export default {
  name: 'Workspace',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      markList: [],
      robotPoint: {},
      proportion: 1,
      pStyle: 1,
      // fixedScale: 62.5,
      // rectScale: 6.25,
      // robotScale: 15,
      // markScale: 5,
    }
  },

  computed: {
    fixedScale() {
      return 31.25 * this.proportion
    },
    rectScale() {
      return 3.125 * this.proportion
    },
    robotScale() {
      return 7.5 * this.proportion
    },
    markScale() {
      return 2.5 * this.proportion
    },
  },

  watch: {},

  created() {},

  mounted() {
    let c = this.$refs['canvas']
    c.width = window.screen.width
    c.height = window.screen.height - 60

    this.robotPoint = {
      x: c.offsetWidth / 2,
      y: c.offsetHeight / 2,
    }
    this.$toast.loading('正在绘制地图...')

    const { imei } = this.$route.params
    api.getMap(imei).then(res => {
      if (typeof res == 'string') {
        this.$toast.fail(res)
      } else {
        if (res.code === 6001) {
          this.$toast({
            forbidClick: true,
            message: '暂未上传地图数据',
            onClose: () => {
              this.$goBack()
            },
          })
        }

        let maxX = 0
        let maxY = 0
        let minX = 0
        let minY = 0
        var points = this.transPoints(res.data.points, this.fixedScale)
        points.forEach(item => {
          if (item[0] < minX) {
            minX = item[0]
          }
          if (item[0] > maxX) {
            maxX = item[0]
          }
          if (item[1] < minY) {
            minY = item[1]
          }
          if (item[1] > maxY) {
            maxY = item[1]
          }
        })
        c.width = maxX + 30 < window.screen.width ? window.screen.width : maxX + 30
        c.height = maxY + 30 < window.screen.height - 60 ? window.screen.height - 60 : maxY + 30

        // var directionX = ''
        // var directionY = ''
        // if (Math.abs(minX) > Math.abs(maxX)) {
        //   directionX = 'left'
        // } else {
        //   directionX = 'right'
        // }
        // if (Math.abs(minY) > Math.abs(maxY)) {
        //   directionY = 'bottom'
        // } else {
        //   directionY = 'top'
        // }
        // if (directionX == 'left') {
        //   this.robotScale.x = c.offsetWidth / 2 - (Math.abs(maxX) - Math.abs(minX))
        // } else {
        //   this.robotScale.x = c.offsetWidth / 2 + (Math.abs(maxX) - Math.abs(minX))
        // }

        // if (directionY == 'top') {
        //   this.robotScale.y = c.offsetHeight / 2 - (Math.abs(maxY) - Math.abs(minY))
        // } else {
        //   this.robotScale.y = c.offsetHeight / 2 - (Math.abs(maxY) - Math.abs(minY))
        // }

        this.createMap(c.width, c.height)
        this.strokePoints(res.data.points)
        api.getMapMarkList(imei).then(res => {
          if (typeof res == 'string') {
            this.$toast.fail(res)
          } else {
            this.markList = res.data || []
            this.strokeMarks(res.data)
          }
        })
      }
    })
  },

  destroyed() {},

  methods: {
    changeMarkStatus(id, marked) {
      const { imei } = this.$route.params
      api
        .changeMapMarkStatus({
          id,
          imei,
          status: marked == '1' ? '0' : '1',
        })
        .then(res => {
          if (typeof res == 'string') {
            this.$toast.fail(res)
          } else {
            this.$toast('标记成功')
            api.getMapMarkList(imei).then(res => {
              if (typeof res == 'string') {
                this.$toast.fail(res)
              } else {
                this.markList = res.data || []
                this.strokeMarks(res.data)
              }
            })
          }
        })
    },
    transPoints(list, d) {
      return list.map(item => {
        return [this.robotPoint.x + (item[0] - 0) * d, this.robotPoint.y + (item[1] - 0) * d]
      })
    },
    getCTX() {
      let c = this.$refs['canvas']
      let ctx = c.getContext('2d')
      return ctx
    },
    createMap(width, height) {
      var ctx = this.getCTX()
      ctx.beginPath()
      ctx.fillStyle = '#eee'
      ctx.fillRect(0, 0, width, height)
      ctx.beginPath()
    },
    strokePoints(list) {
      var points = this.transPoints(list, this.fixedScale)
      var ctx = this.getCTX()
      // ctx.rotate((20 * Math.PI) / 180)
      ctx.strokeStyle = '#000'
      points.forEach(item => {
        if (this.pStyle == 1) {
          ctx.beginPath()
          ctx.fillRect(item[0], item[1], this.rectScale, this.rectScale)
          ctx.fillStyle = '#000'
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(item[0], item[1], this.rectScale / 2, 0, Math.PI * 2, false)
          ctx.fillStyle = '#000'
          ctx.fill()
        }

        // ctx.arc(item[0], item[1], 1, 0, Math.PI * 2, false)
        // ctx.arc(item[0], item[1], 10, 0, Math.PI * 2, false)

        // ctx.moveTo(item[0], item[1])
        // ctx.lineTo(item[0] + 1, item[1] + 1)
        // ctx.arc(item[0], item[1], 1, 0, Math.PI * 2, false)
        // ctx.beginPath()
        // ctx.moveTo(item[0], item[1])
        // ctx.lineTo(item[0] + 1, item[1] + 1)
        // ctx.stroke()
      })
      ctx.beginPath()
      ctx.fillStyle = '#5fc461'
      ctx.arc(this.robotPoint.x, this.robotPoint.y, this.robotScale, 0, Math.PI * 2, false)
      ctx.fill()
    },
    strokeMarks(list, id) {
      var arr = list.map(item => {
        return [item.point[0], item.point[1]]
      })
      var points = this.transPoints(arr, this.fixedScale)
      var ctx = this.getCTX()
      ctx.strokeStyle = 'red'
      points.forEach((item, index) => {
        ctx.fillStyle = 'red'
        if (list[index].marked == 1) {
          ctx.fillStyle = 'orange'
        }
        ctx.beginPath()
        ctx.arc(item[0], item[1], this.markScale, 0, Math.PI * 2, false)
        // ctx.arc(item[0], item[1], 1, 0, Math.PI * 2, false)
        // ctx.arc(item[0], item[1], 10, 0, Math.PI * 2, false)
        // ctx.moveTo(item[0], item[1])
        // ctx.lineTo(item[0] + 1, item[1] + 1)
        ctx.fill()
      })
      if (id) {
        const index = list.findIndex(item => {
          if (item.id == id) {
            return item
          }
        })
        ctx.beginPath()
        ctx.arc(points[index][0], points[index][1], this.markScale, 0, Math.PI * 2, false)
        // ctx.arc(item[0], item[1], 1, 0, Math.PI * 2, false)
        // ctx.arc(item[0], item[1], 10, 0, Math.PI * 2, false)
        ctx.fillStyle = 'purple'
        // ctx.moveTo(item[0], item[1])
        // ctx.lineTo(item[0] + 1, item[1] + 1)
        ctx.fill()
      }
    },
    preViewMark(id) {
      this.strokeMarks(this.markList, id)
    },
  },
}
</script>

<style lang="less" scoped>
.canvas-box {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
</style>
