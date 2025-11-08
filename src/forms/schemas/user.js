import z from 'zod'

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({
      message: 'O e-mail é inválido',
    })
    .trim()
    .min(1, {
      message: 'O e-mail é obrigatório',
    }),
  password: z.string().trim().min(6, {
    message: 'Informe a senha correta',
  }),
})

export const createFormSchema = z
  .object({
    firstName: z.string().trim().min(1, {
      message: 'O nome é obrigatório.',
    }),
    lastName: z.string().trim().min(1, {
      message: 'O sobrenome é obrigatório.',
    }),
    email: z
      .string()
      .email({
        message: 'O e-mail é invalido.',
      })
      .trim()
      .min(1, {
        message: 'O e-mail é invalido.',
      }),
    password: z.string().trim().min(6, {
      message: 'A senha deve ter no minimo 6 caracteres.',
    }),
    passwordConfirmation: z.string().trim().min(6, {
      message: 'A confirmação de senha é obrigatória.',
    }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Você precisa aceitar os termos.',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  })
