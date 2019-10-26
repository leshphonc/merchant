import axios from 'axios'

export default {
  // 运费模版列表
  getFreightTemPlateList: () =>
    axios.get('/appapi.php?c=SpaceMerchant&a=select_express_lists', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 创建运费模版
  createFreightTemPlate: ({ name, area }) =>
    axios.post('/appapi.php?c=Merchantapp&a=add_express', {
      name,
      area,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改运费模版
  updateFreightTemPlate: ({ tpl_id, name, area }) =>
    axios.post('/appapi.php?c=Merchantapp&a=edit_express', {
      tpl_id,
      name,
      area,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询运费模版详情
  readFreightTemPlateDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=express_detail', {
      params: {
        tid: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
