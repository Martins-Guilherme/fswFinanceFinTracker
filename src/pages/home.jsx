import { Navigate } from 'react-router'

import AddTransactionButton from '@/components/add-transaction-button'
import Balance from '@/components/balance'
import DateSelection from '@/components/date-selection'
import Header from '@/components/header'
import TransactionTypeChart from '@/components/transaction-type-chart'
import TransactionsTable from '@/components/transactions-table'
import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user, isInitializing } = useAuthContext()
  if (isInitializing) return null

  if (!user) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <Header />
      <div className="space-y-6 p-4 sm:p-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="text-center text-2xl font-bold sm:text-left">
            Dashboard
          </h2>
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <DateSelection />
            <AddTransactionButton />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr,1fr]">
          <Balance />
          <TransactionTypeChart />
        </div>
        <TransactionsTable />
      </div>
    </>
  )
}

export default HomePage
