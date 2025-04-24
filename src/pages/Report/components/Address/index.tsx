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
import { Box, Button, Progress, Text } from '@radix-ui/themes'
import { ArrowRight } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

const createReportAddressSchema = z.object({
  cep: z.string().min(8, 'CEP é obrigatório').max(9),
  street: z.string().nonempty('Rua é obrigatório'),
  number: z.string().nonempty('Número é obrigatório'),
  complement: z.string().optional(),
})

export type CreateReportAddressFormData = z.infer<
  typeof createReportAddressSchema
>

export function Address() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateReportAddressFormData>({
    resolver: zodResolver(createReportAddressSchema),
  })

  const cep = watch('cep')

  async function getAddress(zipCode: string) {
    const response = await axios.get(
      `https://viacep.com.br/ws/${zipCode}/json/`,
    )
    const data = response.data
    if (data) {
      setValue('cep', data.cep)
      setValue('street', data.logradouro)
      setValue('number', '')
      setValue('complement', '')
    } else {
      console.error('Failed to fetch address data:', response.status)
      return null
    }
  }

  useEffect(() => {
    const zipCode = cep || ''
    const zipCodeNumber = zipCode.replace('-', '')
    if (zipCodeNumber.length === 8) {
      getAddress(zipCodeNumber)
    }
  }, [cep])

  const navigate = useNavigate()

  async function handleCreateAddressReport(data: CreateReportAddressFormData) {
    const response = await axios.get(
      'https://projeto-faculdade-nwhu.onrender.com',
    )

    console.log(response)

    // console.log(data)
    // await navigate('/denunciar/endereco/descricao')
  }

  return (
    <ReportPageContainer>
      <ReportHeader>
        <h2>Continue o registro abaixo!</h2>
        <span>
          Precisamos de mais algumas informações para continuar sua denúncia!
        </span>
      </ReportHeader>

      <Box width="500px">
        <Text>Passo 2 de 3</Text>
        <Progress value={(100 / 3) * 2} size="2" color="gray" />
      </Box>

      <FormContainer onSubmit={handleSubmit(handleCreateAddressReport)}>
        <InputForm>
          <Text>CEP</Text>
          <input type="text" {...register('cep')} />
          {errors.cep && <FormError size="2">{errors.cep.message}</FormError>}
        </InputForm>
        <InputForm>
          <Text>Endereço</Text>
          <input type="text" {...register('street')} />
          {errors.street && (
            <FormError size="2">{errors.street.message}</FormError>
          )}
        </InputForm>
        <InputForm>
          <Text>Número</Text>
          <input type="text" {...register('number')} />
          {errors.number && (
            <FormError size="2">{errors.number.message}</FormError>
          )}
        </InputForm>
        <InputForm>
          <Text>Complemento</Text>
          <input type="text" {...register('complement')} />
          {errors.complement && (
            <FormError size="2">{errors.complement.message}</FormError>
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
