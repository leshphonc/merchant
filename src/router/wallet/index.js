import Index from '@/views/wallet'
import WalletTypePanel from '@/views/wallet/WalletPanel'

export default {
  path: '/wallet',
  component: Index,
  children: [
    {
      // 钱包
      path: '',
      component: WalletTypePanel,
    },
    {
      // 充值
      path: 'addCredit',
      component: () => import('@/views/wallet/AddCredit'),
    },
    {
      // 提现
      path: 'withDraw',
      component: () => import('@/views/wallet/WithDraw'),
    },
    {
      // 账户明细
      path: 'accountDetail',
      component: () => import('@/views/wallet/AccountDetail'),
    },
  ],
}
