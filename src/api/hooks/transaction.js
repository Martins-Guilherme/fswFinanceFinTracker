import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuthContext } from '@/contexts/auth'

import { TransactionService } from '../services/transaction'
import { getBalanceQueryKey } from './user'

export const createTransactionKey = ['createTransaction']

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  const { user } = useAuthContext()
  return useMutation({
    mutationKey: createTransactionKey,
    mutationFn: (input) => TransactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getBalanceQueryKey({ userId: user.id }),
      })
    },
  })
}
