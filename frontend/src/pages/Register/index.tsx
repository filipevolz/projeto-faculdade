import { Button, Link, Text } from '@radix-ui/themes'
import { FormError, InputForm } from '../Report/styles'
import { RegisterForm, RegisterPageContainer } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

const registerSchema = z.object({
  name: z.string().min(3, { message: 'Nome é obrigatório' }),
  email: z
    .string()
    .min(5, { message: 'Email é obrigatório' })
    .email({ message: 'Preenchimento inválido' }),
  password: z.string().min(5, { message: 'Senha é obrigatório' }),
})

export type RegisterSchemaFormData = z.infer<typeof registerSchema>
export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaFormData>({
    resolver: zodResolver(registerSchema),
  })

  async function handleRegister(data: RegisterSchemaFormData) {
    const newUser = {
      nome: data.name,
      email: data.email,
      password: data.password,
    }

    try {
      const response = await axios.post(
        'https://projeto-faculdade-nwhu.onrender.com/register',
        newUser,
      )
      console.log(response)
    } catch (error) {
      console.error('Erro ao enviar denúncia:', error)
    }
  }

  return (
    <RegisterPageContainer>
      <RegisterForm onSubmit={handleSubmit(handleRegister)}>
        <h2>Registro</h2>

        <InputForm>
          <Text>Nome completo</Text>
          <input type="text" {...register('name')} />
          {errors.name && <FormError size="2">{errors.name.message}</FormError>}
        </InputForm>

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

        <Button radius="medium" color="purple" size="3" type="submit">
          Registrar-se
        </Button>

        <span>
          Já possui cadastro? <Link href="/account/login">Faça login</Link>
        </span>
      </RegisterForm>
    </RegisterPageContainer>
  )
}
