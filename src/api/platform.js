import axios from 'axios'

export default {
  // 读取可加入子平台列表
  getSubPlatformList: () =>
    axios.get('/appapi.php?c=MerchantSubPlatform&a=subPlatformList', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 加入子平台
  joinTheSubPlatform: id =>
    axios.post('/appapi.php?c=MerchantSubPlatform&a=subPlatformRelation', {
      plat_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
}
