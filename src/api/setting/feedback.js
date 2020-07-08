import axios from 'axios'

export default {
  // 获取评价列表
  getFeedbackTypeList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=evaluationContentList', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 创建评价类型
  createFeedbackType: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=evaluationContent', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 更新评价类型
  updateFeedbackType: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=evaluationContent', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 删除评价类型
  deleteFeedbackType: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=delEvaluaition', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取用户评价列表
  getFeedbackList: payload =>
    axios.post('/appapi.php?c=MerchantApp&a=getMerchantAppraiseList', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取评价意图列表
  getFeedbackIntentList: payload =>
    axios.post('/appapi.php?c=MerchantApp&a=getAppraiseIntentList', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取评价类型列表
  getFeedbackTypeList: payload =>
    axios.post('/appapi.php?c=MerchantApp&a=evaluationContentList', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}
