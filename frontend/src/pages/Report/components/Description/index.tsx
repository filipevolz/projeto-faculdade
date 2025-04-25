import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  FormContainer,
  InputForm,
  ReportHeader,
  ReportPageContainer,
  FormError,
} from '../../styles'
import { Box, Button, Progress, Text, TextArea } from '@radix-ui/themes'
import axios from 'axios'
import { useState } from 'react'
import { SuccessMessage } from './styles'
import { useNavigate } from 'react-router-dom'

const createReportSchema = z.object({
  description: z.string().min(10, {
    message:
      'O preenchimento é obrigatório da descrição para entender melhor o problema que está passando.',
  }),
})

export type CreateReportFormData = z.infer<typeof createReportSchema>

export function Description() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReportFormData>({
    resolver: zodResolver(createReportSchema),
  })
  const [messageSuccess, setMessageSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  async function handleCreateReport(data: CreateReportFormData) {
    const step1 = JSON.parse(localStorage.getItem('reportStep1') || '{}')
    const step2 = JSON.parse(localStorage.getItem('reportStep2') || '{}')

    const fullReport = {
      nome: step1.name,
      email: step1.email,
      cep: step2.cep,
      endereco: step2.street,
      numero: step2.number,
      complemento: step2.complement,
      descricao: data.description,
    }

    try {
      setIsLoading(true)
      setMessageSuccess('')
      await axios.post(
        'https://projeto-faculdade-nwhu.onrender.com/reports',
        fullReport,
      )
      setIsLoading(false)
      localStorage.removeItem('reportStep1')
      localStorage.removeItem('reportStep2')
      setMessageSuccess("Denúncia criada com sucesso!")
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (error) {
      console.error('Erro ao enviar denúncia:', error)
    }
  }

  return (
    <ReportPageContainer>
      <ReportHeader>
        <h2>Último passo para o registro!</h2>
        <span>Descreva com detalhes a situação que está passando.</span>
      </ReportHeader>

      <Box width="500px">
        <Text>Passo 3 de 3</Text>
        <Progress value={100} size="2" color="gray" />
      </Box>

      <FormContainer onSubmit={handleSubmit(handleCreateReport)}>
        <InputForm>
          <Text>Descrição</Text>
          <TextArea
            {...register('description')}
            size="3"
            color="gray"
            style={{ height: '400px' }}
          />
          {errors.description && (
            <FormError size="2">{errors.description.message}</FormError>
          )}
        </InputForm>
        <Button radius="medium" color="purple" size="3" type="submit" disabled={isLoading}>
          Registrar denúncia
        </Button>
        <SuccessMessage>{messageSuccess}</SuccessMessage>
      </FormContainer>
    </ReportPageContainer>
  )
}
