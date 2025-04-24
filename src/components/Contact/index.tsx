import {
  ContactContainer,
  ContactGrid,
  ContactCard,
  IconWrapper,
} from './styles'
import { Heading, Text } from '@radix-ui/themes'
import { EnvelopeSimple, PhoneCall, InstagramLogo } from 'phosphor-react'

export function Contact() {
  return (
    <ContactContainer id="contato">
      <Heading size="8" color="crimson" mb="4">
        Fale conosco
      </Heading>

      <Text size="4" as="p" mb="6">
        Se você precisa de ajuda, quer saber mais sobre o projeto ou deseja
        colaborar, entre em contato por um dos canais abaixo. Estamos aqui para
        ouvir e acolher.
      </Text>

      <ContactGrid>
        <ContactCard>
          <IconWrapper>
            <EnvelopeSimple size={48} weight="duotone" />
          </IconWrapper>
          <Heading size="4">E-mail</Heading>
          <Text size="3">atendimento@institutomariadapenha.org.br</Text>
        </ContactCard>

        <ContactCard>
          <IconWrapper>
            <PhoneCall size={48} weight="duotone" />
          </IconWrapper>
          <Heading size="4">Telefone</Heading>
          <Text size="3">(85) 4102 5429</Text>
        </ContactCard>

        <ContactCard>
          <IconWrapper>
            <InstagramLogo size={48} weight="duotone" />
          </IconWrapper>
          <Heading size="4">Instagram</Heading>
          <Text size="3">@projetoseguro</Text>
        </ContactCard>
      </ContactGrid>
    </ContactContainer>
  )
}
