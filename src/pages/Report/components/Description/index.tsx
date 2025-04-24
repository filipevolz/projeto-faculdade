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

const createReportSchema = z.object({
  descripton: z.string().min(10, {
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

  async function handleCreateReport(data: CreateReportFormData) {
    const step1 = JSON.parse(localStorage.getItem('reportStep1') || '{}')
    const step2 = JSON.parse(localStorage.getItem('reportStep2') || '{}')

    const fullReport = {
      ...step1,
      ...step2,
      description: data.descripton,
    }

    try {
      await axios.post(
        'https://projeto-faculdade-nwhu.onrender.com',
        fullReport,
      )
      // Limpa localStorage se quiser
      localStorage.removeItem('reportStep1')
      localStorage.removeItem('reportStep2')
      // Redireciona ou mostra mensagem de sucesso
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
            {...register('descripton')}
            size="3"
            color="gray"
            style={{ height: '400px' }}
          />
          {errors.descripton && (
            <FormError size="2">{errors.descripton.message}</FormError>
          )}
        </InputForm>
        <Button radius="medium" color="purple" size="3" type="submit">
          Registrar denúncia
        </Button>
      </FormContainer>
    </ReportPageContainer>
  )
}
