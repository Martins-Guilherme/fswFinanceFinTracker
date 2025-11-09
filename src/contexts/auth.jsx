import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useLogin, useSignup } from '@/api/hooks/user'
import { UserService } from '@/api/services/user'
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'

export const useAuthContext = () => useContext(AuthContext)

export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  signOut: () => {},
  signup: () => {},
})

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
}

export const AuthContentProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [isInitializing, setIsInitializing] = useState(true)

  const signupMutation = useSignup()

  const loginMutation = useLogin()

  const signup = async (data) => {
    try {
      const createdUser = await signupMutation.mutateAsync(data)
      setUser(createdUser)
      setTokens(createdUser.tokens)
      toast.success('Conta criada com sucesso!')
    } catch (error) {
      toast.error(
        'Erro ao criar a conta. Por favor tente novamente mais tarde.'
      )
      console.error(error)
    }
  }

  const login = async (data) => {
    try {
      const loggedUser = await loginMutation.mutateAsync(data)
      setUser(loggedUser)
      setTokens(loggedUser.tokens)
      toast.success('Conta logada com sucesso!')
    } catch (error) {
      toast.error(
        'Erro ao realizar login. Por favor, verifique suas credencias'
      )
      console.error(error)
    }
  }

  const signOut = () => {
    setUser(null)
    removeTokens()
  }

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        )
        if (!accessToken && !refreshToken) return
        const response = await UserService.me()
        setUser(response)
      } catch (error) {
        setUser(null)
        console.error(error)
      } finally {
        setIsInitializing(false)
      }
    }
    init()
  }, [])
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        isInitializing,
        signOut,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
