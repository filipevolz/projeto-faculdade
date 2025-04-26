import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { Skeleton } from '@radix-ui/themes'
import { DashboardHeader } from '../../styles'
import { Logo, LogoIcon } from '../../../../components/Header/styles'
import api from '../../../../lib/api'

const Container = styled.div`
  padding: 2rem 4rem;
  height: calc(100px - 10vh);
  margin: 0 auto;
`

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const Label = styled.span`
  font-weight: 600;
`

const Paragraph = styled.p`
  margin-bottom: 0.75rem;
  line-height: 1.6;
  word-break: break-word;
`

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export function ReportDetails() {
  const { uuid } = useParams<{ uuid: string }>()

  const { data: report, isLoading } = useQuery({
    queryKey: ['report-details', uuid],
    queryFn: async () => {
      const response = await api.get(`https://projeto-faculdade-nwhu.onrender.com/reports/${uuid}`)
      return response.data
    },
    enabled: !!uuid,
  })

  if (isLoading) {
    return (
      <Container>
        <SkeletonWrapper>
          <Skeleton width="40%" height="28px" />
          <Skeleton width="60%" height="20px" />
          <Skeleton width="100%" height="70px" />
          <Skeleton width="50%" height="20px" />
          <Skeleton width="80%" height="20px" />
        </SkeletonWrapper>
      </Container>
    )
  }

  if (!report) {
    return <Container><p>Denúncia não encontrada.</p></Container>
  }

  return (
    <>
      <DashboardHeader>
        <Logo>
          <LogoIcon size={70} />
          <span>
            Violência <br /> Doméstica
          </span>
        </Logo>
      </DashboardHeader>
      <Container>
        <Title>{report.nome}</Title>
        <Paragraph><Label>Email:</Label> {report.email}</Paragraph>
        <Paragraph><Label>Descrição:</Label> {report.descricao}</Paragraph>
        <Paragraph><Label>CEP:</Label> {report.cep}</Paragraph>
        <Paragraph>
          <Label>Endereço:</Label> {report.endereco}, {report.numero}
          {report.complemento && ` - ${report.complemento}`}
        </Paragraph>
        <Paragraph>
          <Label>Data de criação:</Label> {new Date(report.created_at).toLocaleString()}
        </Paragraph>
      </Container></>
  )
}
