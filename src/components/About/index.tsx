import { Text, Heading } from '@radix-ui/themes'
import { AboutContainer, HighlightBox, IconWrapper } from './styles'
import { ChatCircleText, ShieldCheck, Handshake } from 'phosphor-react'

export function About() {
  return (
    <AboutContainer id="sobre">
      <Heading size="8" color="purple" mb="4">
        Quem somos
      </Heading>
      <Text size="4" as="p" mb="4">
        Somos uma iniciativa dedicada a combater e prevenir a violência
        doméstica e familiar contra a mulher. Nosso objetivo é promover o
        acolhimento, a informação e o empoderamento para que vítimas e pessoas
        ao redor possam agir com segurança e consciência.
      </Text>

      <Text size="4" as="p" mb="6">
        Acreditamos que transformar a realidade de muitas mulheres começa com
        conhecimento acessível, canais de denúncia seguros e uma rede de apoio
        eficaz. Esta plataforma foi criada com carinho para orientar, apoiar e
        inspirar coragem.
      </Text>

      <HighlightBox>
        <div>
          <IconWrapper>
            <Handshake size={60} weight="duotone" />
          </IconWrapper>
          <Heading size="4">Nossa Missão</Heading>
          <Text size="3">
            Conscientizar, apoiar e empoderar mulheres para que rompam o ciclo
            da violência com segurança e dignidade.
          </Text>
        </div>

        <div>
          <IconWrapper>
            <ShieldCheck size={60} weight="duotone" />
          </IconWrapper>
          <Heading size="4">Nossa Visão</Heading>
          <Text size="3">
            Ser uma referência de acolhimento e informação no combate à
            violência doméstica no Brasil.
          </Text>
        </div>

        <div>
          <IconWrapper>
            <ChatCircleText size={60} weight="duotone" />
          </IconWrapper>
          <Heading size="4">Nossos Valores</Heading>
          <Text size="3">
            Respeito, escuta, empatia, proteção e justiça. Esses são os pilares
            que guiam nossas ações.
          </Text>
        </div>
      </HighlightBox>
    </AboutContainer>
  )
}
