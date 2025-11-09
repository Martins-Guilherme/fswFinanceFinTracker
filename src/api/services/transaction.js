import queryString from 'query-string'

import { protectedApi } from '@/lib/axios'

export const TransactionService = {
  /**
   * Cria uma transação para o usuário autenticado.
   * @param {Object} input - Usuário a ser criado.
   * @param {string} input.name - Nome da transação.
   * @param {string} input.date - Data da transação.
   * @param {number} input.amount - Valor da transação.
   * @param {string} input.type - Tipo da operação (EARNING/EXPENSE/INVESTMENT).
   */
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)
    return response.data
  },

  /**
   * Retornando as transações para o usuário autenticado.
   * @param {Object} input
   * @param {string} input.from - Data inicial da transação. (YYY-MM-DD)
   * @param {string} input.to - Data final da transação. (YYY-MM-DD)
   */
  getAll: async (input) => {
    const query = queryString.stringify({
      from: input.from,
      to: input.to,
    })
    const response = await protectedApi.get(`/transactions/me?${query}`)
    return response.data
  },
}
