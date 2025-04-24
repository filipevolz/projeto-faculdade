import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  FormContainer,
  InputForm,
  ReportHeader,
  ReportPageContainer,
  FormError,
} from './styles'
import { Box, Button, Progress, Text } from '@radix-ui/themes'
import { ArrowRight } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

const createReportInfoSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
  email: z.string().email({ message: 'Email é obrigatório.' }),
})

export type CreateReportInfoFormData = z.infer<typeof createReportInfoSchema>

export function ReportPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReportInfoFormData>({
    resolver: zodResolver(createReportInfoSchema),
  })

  const navigate = useNavigate()

  async function handleCreateReport(data: CreateReportInfoFormData) {
    localStorage.setItem('reportStep1', JSON.stringify(data))
    await navigate('/denunciar/endereco')
  }

  return (
    <ReportPageContainer>
      <ReportHeader>
        <h2>Faça o registro abaixo!</h2>
        <span>Precisamos de algumas informações para criar sua denúncia!</span>
      </ReportHeader>

      <Box width="500px">
        <Text>Passo 1 de 3</Text>
        <Progress value={100 / 3} size="2" color="gray" />
      </Box>

      <FormContainer onSubmit={handleSubmit(handleCreateReport)}>
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
        <Button radius="medium" color="purple" size="3" type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </FormContainer>
    </ReportPageContainer>
  )
}
