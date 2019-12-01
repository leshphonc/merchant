<template>
  <div>
    <van-nav-bar :right-text="rightText" @click-left="$goBack" @click-right="_clickRight" fixed left-arrow title="领卡会员"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky v-model="active">
      <van-tab title="会员卡信息">
        <van-cell-group title="商家会员卡">
          <van-cell is-link title="基础信息" to="/member/basicMemberCard"></van-cell>
          <van-cell is-link title="余额管理" to="/member/basicMemberCardBalance"></van-cell>
        </van-cell-group>
        <van-cell-group title="微信会员卡">
          <van-cell is-link title="基础信息" to="/member/basicMemberCardInWX"></van-cell>
        </van-cell-group>
      </van-tab>
      <van-tab title="领卡会员">
        <van-pull-refresh @refresh="_onRefresh1" v-model="refreshing1">
          <van-list :finished="finished1" @load="_onLoad1" finished-text="没有更多了" v-model="loading">
            <van-card :key="item.id" :thumb="item.avatar" :title="item.nickname" lazy-load v-for="item in list1">
              <div class="desc" slot="desc">
                <a :href="'tel:' + item.phone">
                  {{ item.phone }}
                  <van-icon color="#1989fa" name="phone-o" />
                </a>
              </div>
              <div slot="tags">
                <div>
                  <van-tag plain type="danger">余额：{{ item.card_money }}</van-tag>
                </div>
                <div>
                  <van-tag plain type="danger">赠送金额：{{ item.card_money_give }}</van-tag>
                </div>
                <div>
                  <van-tag plain type="danger">会员卡积分：{{ item.card_score }}</van-tag>
                </div>
              </div>
              <div class="footer" slot="footer">
                <span>领卡时间：{{ $moment(item.add_time * 1000).format('YYYY-MM-DD HH:mm') }}</span>
                <van-button :to="`/member/memberCardAddCreditRecord/${item.id}`" size="small" type="primary">充值记录</van-button>
              </div>
            </van-card>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="会员卡分组">
        <van-pull-refresh @refresh="_onRefresh2" v-model="refreshing2">
          <van-list :finished="finished2" @load="_onLoad2" finished-text="没有更多了" v-model="loading">
            <van-panel
              :desc="item.des"
              :key="item.id"
              :status="`${item.discount}折`"
              :title="item.name"
              v-for="item in list2"
            >
              <div class="panel-footer" slot="footer">
                <div>用户数量：{{ item.user_count }}</div>
                <div>
                  <van-button @click="() => $router.push(`/member/memberGroupCRU/${item.id}`)" size="small">编辑</van-button>
                  <van-button size="small" type="primary">查看分组用户</van-button>
                </div>
              </div>
            </van-panel>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'collarCardMemberList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      active: 0,
      loading: false,
      page1: 1,
      list1: [],
      refreshing1: false,
      finished1: false,
      page2: 1,
      list2: [],
      refreshing2: false,
      finished2: false,
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    rightText() {
      let text = ''
      switch (this.active) {
        case 0:
          break
        case 1:
          text = '创建会员'
          break
        case 2:
          text = '创建分组'
          break
      }
      return text
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('member', ['getCollarCardMemberList', 'getMemberGroupList']),
    // 刷新领卡会员
    _onRefresh1() {
      this.getCollarCardMemberList(1).then(res => {
        this.refreshing1 = false
        this.page1 = 2
        this.list1 = res.lists
      })
    },
    // 领卡会员加载
    _onLoad1() {
      this.getCollarCardMemberList(this.page1).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished1 = true
        } else {
          this.page1 += 1
        }
        this.list1.push(...res.lists)
      })
    },
    // 刷新会员分组
    _onRefresh2() {
      this.getMemberGroupList(1).then(res => {
        this.refreshing2 = false
        this.page2 = 2
        this.list2 = res.lists
      })
    },
    // 会员分组加载
    _onLoad2() {
      this.getMemberGroupList(this.page2).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished2 = true
        } else {
          this.page2 += 1
        }
        this.list2.push(...res.lists)
      })
    },
    _createGroup() {
      console.log(1)
    },
    _clickRight() {
      switch (this.active) {
        case 1:
          this.$router.push('/member/memberCardCRU')
          break
        case 2:
          this.$router.push('/member/memberGroupCRU')
          break
        default:
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.desc {
  margin-bottom: 1px;
  a {
    color: @black-light-c !important;
    .van-icon {
      vertical-align: -2px;
    }
  }
  font-size: 12px;
}

.footer {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.van-panel + .van-panel {
  margin-top: 8px;
}

.panel-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: @font-gray-c;
}
</style>
