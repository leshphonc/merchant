import Index from '@/views/wallet'
import WalletTypePanel from '@/views/wallet/WalletPanel'

export default {
  path: '/wallet',
  component: Index,
  children: [
    {
      path: '',
      component: WalletTypePanel,
    },
    {
      path: 'withDraw',
      component: () => import('@/views/wallet/WithDraw'),
    },
    {
      path: 'accountDetail',
      component: () => import('@/views/wallet/AccountDetail'),
    },
  ],
}
