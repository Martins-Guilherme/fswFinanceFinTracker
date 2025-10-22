import { useMutation } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  sugnup: () => {},
})

export const AuthContentProvider = ({ children }) => {
  const [user, setUser] = useState()

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await api.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.accessToken
        const refreshToken = createdUser.tokens.refreshToken
        setUser(createdUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        toast.success('Conta criada com sucesso!')
        console.log(data)
      },
      onError: () => {
        toast.error(
          'Erro ao criar a conta. Por favor tente novamente mais tarde.'
        )
      },
    })
  }

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (!accessToken && !refreshToken) return
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      }
    }
    init()
  }, [])
  return (
    <AuthContext.Provider
      value={{
        user: user,
        login: () => {},
        signup: signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
