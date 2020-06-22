import axios from 'axios'

export default {
  // 获取评价列表
  getFeedbackList: () =>
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
}
