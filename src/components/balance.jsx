import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useGetUserBalance } from '@/api/hooks/user'

import BalanceItem from './balance-item'

const Balance = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data } = useGetUserBalance({ from, to })
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        label="Saldo"
        amount={data?.balance || 0}
        icon={<WalletIcon />}
      />

      <BalanceItem
        label="Ganhos"
        amount={data?.earnings || 0}
        icon={<TrendingUpIcon className="text-primary-green" size={16} />}
      />

      <BalanceItem
        label="Gastos"
        amount={data?.expenses || 0}
        icon={<TrendingDownIcon className="text-primary-red" size={16} />}
      />

      <BalanceItem
        label="Investimentos"
        amount={data?.investments || 0}
        icon={<PiggyBankIcon className="text-primary-blue" size={16} />}
      />
    </div>
  )
}

export default Balance
