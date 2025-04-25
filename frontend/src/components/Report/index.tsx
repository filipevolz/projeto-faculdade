import { Text, Heading, Button } from '@radix-ui/themes'
import { PhoneCall, EnvelopeSimple, ArrowRight } from 'phosphor-react'
import {
  ReportContainer,
  ReportCard,
  Cards,
  Divider,
  IconWrapper,
} from './styles'

export function Report() {
  return (
    <ReportContainer id="denunciar">
      <Heading size="8" color="purple" mb="4">
        Denunciar é um ato de coragem
      </Heading>
      <Text size="4" as="p" mb="4">
        Se você está em situação de risco ou conhece alguém que esteja,
        denuncie. Você não está sozinha. Existem canais seguros e gratuitos que
        funcionam 24 horas por dia.
      </Text>

      <Cards>
        <ReportCard>
          <IconWrapper>
            <PhoneCall size={48} weight="duotone" />
          </IconWrapper>
          <Heading size="4">Ligue 180</Heading>
          <Text size="3">
            Central de Atendimento à Mulher — gratuito e sigiloso
          </Text>
        </ReportCard>

        <ReportCard>
          <IconWrapper>
            <EnvelopeSimple size={48} weight="duotone" />
          </IconWrapper>
          <Heading size="4">Delegacias</Heading>
          <Text size="3">
            Procure a Delegacia da Mulher mais próxima ou a delegacia comum mais
            próxima da sua região.
          </Text>
        </ReportCard>
      </Cards>

      <Divider>
        <div></div>
        <span>ou</span>
        <div></div>
      </Divider>

      <Button
        asChild
        size="4"
        radius="medium"
        color="purple"
        style={{ marginTop: '2rem' }}
      >
        <a href="/denunciar">
          Registrar Denúncia
          <ArrowRight />
        </a>
      </Button>
    </ReportContainer>
  )
}
