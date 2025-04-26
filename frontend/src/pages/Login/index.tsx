import { Button, Text } from '@radix-ui/themes'
import { FormError, InputForm } from '../Report/styles'
import { ButtonsForm, LoginForm, LoginPageContainer } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../lib/api'

const loginSchema = z.object({
  email: z
    .string()
    .min(5, { message: 'Email é obrigatório' })
    .email({ message: 'Preenchimento inválido' }),
  password: z.string().min(5, { message: 'Senha é obrigatório' }),
})

export type LoginSchemaFormData = z.infer<typeof loginSchema>
export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaFormData>({
    resolver: zodResolver(loginSchema),
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  async function handleLogin(data: LoginSchemaFormData) {
    setIsLoading(true)
    const user = {
      email: data.email,
      password: data.password,
    }

    try {
      const response = await api.post('https://projeto-faculdade-nwhu.onrender.com/login', user)

      const token = response.data.token
      localStorage.setItem('token', token)

      navigate('/dashboard')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleSubmit(handleLogin)}>
        <h2>Login</h2>

        <InputForm>
          <Text>Email</Text>
          <input type="text" {...register('email')} />
          {errors.email && (
            <FormError size="2">{errors.email.message}</FormError>
          )}
        </InputForm>
        <InputForm>
          <Text>Senha</Text>
          <input type="text" {...register('password')} />
          {errors.password && (
            <FormError size="2">{errors.password.message}</FormError>
          )}
        </InputForm>
        <ButtonsForm>
          <Button
            asChild
            radius="medium"
            color="purple"
            size="3"
            type="submit"
            variant="surface"
            disabled={isLoading}
          >
            <a href="/account/register">Registrar-se</a>
          </Button>
          <Button radius="medium" color="purple" size="3" type="submit" disabled={isLoading}>
            Login
          </Button>
        </ButtonsForm>
      </LoginForm>
    </LoginPageContainer>
  )
}
