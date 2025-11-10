'use client'
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useGetUserBalance } from '@/api/hooks/user'
import { Card, CardContent } from '@/components/ui/card'

import TransactionTypeChartLabel from './transaction-type-chart-label'
import TransactionTypeIcon from './transaction-type-icon'

const TransactionTypeChart = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') // YYYY-MM-DD
  const to = searchParams.get('to') // YYYY-MM-DD
  const { data } = useGetUserBalance({ from, to })

  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-auto items-center justify-center pb-0">
        {/* ITENS */}
        <div className="space-y-8">
          <TransactionTypeChartLabel
            icon={
              <TransactionTypeIcon
                icon={
                  <TrendingUpIcon className="text-primary-green" size={16} />
                }
                label="Ganhos"
              />
            }
            value={`${data?.earningsPercentage || 0}%`}
          />
          <TransactionTypeChartLabel
            icon={
              <TransactionTypeIcon
                icon={
                  <TrendingDownIcon className="text-primary-red" size={16} />
                }
                label="Gastos"
              />
            }
            value={`${data?.expensesPercentage || 0}%`}
          />
          <TransactionTypeChartLabel
            icon={
              <TransactionTypeIcon
                icon={<PiggyBankIcon className="text-primary-blue" size={16} />}
                label="Investimentos"
              />
            }
            label="Investimentos"
            value={`${data?.investmentsPercentage || 0}%`}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionTypeChart
