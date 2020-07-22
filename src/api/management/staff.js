import axios from 'axios'

export default {
  // 店员列表
  getStaffList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=staff', {
      params: {
        ...payload,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取店员所有权限
  getAllStaffPermission: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getStaffRule', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取店员权限
  getStaffPermission: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getSelStaffRule', {
      staff_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改店员权限
  updateStaffPermission: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=setStaffRule', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 店员调岗
  staffTransfer: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=relocationPost', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 店员客服状态修改
  staffKFStatusChange: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=setStoreKefu', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 店员状态更改
  staffStatusChange: id =>
    axios.post('/appapi.php?c=Merchantapp&a=staff_dell', {
      staff_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取店员类型
  getStaffType: () =>
    axios.get('/appapi.php?c=Merchantapp&a=staff_type', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 创建店员
  createStaff: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=staff_add', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改店员
  updateStaff: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=staff_edit', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询店员详情
  readStaffDetail: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=staff_detail', {
      params: {
        ...payload,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 店员到岗记录
  staffArrivalRecord: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=clockList', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 店员开单记录
  staffBillingRecord: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=getStaffDoorPay', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 店员服务记录
  staffServiceRecord: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=...', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 店员销售记录
  staffSalesRecord: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=getStoreSellLog', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 技师等级列表
  getStaffLevelList: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=getTechnicianGradeList', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建或修改技师等级
  modifyStaffLevel: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=EditTechnicianGrade', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 删除技师等级
  deleteStaffLevel: id =>
    axios.post('/appapi.php?c=Merchantapp&a=DeleteTechnicianGrade', {
      id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取店铺和打卡类型
  getStoreAndClockInType: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=clockType', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询岗位与岗位下等级
  getPostAndLevel: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=merchantPostAndGrade', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}
