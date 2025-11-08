import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import signupFormSchema from '../schemas/signup'
import { loginFormSchema } from '../schemas/user'

export const useLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  return form
}

export const useSignupForm = () => {
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })
  return form
}
