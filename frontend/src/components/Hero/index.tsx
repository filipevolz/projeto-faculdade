import { Button, Text } from '@radix-ui/themes'
import { HeroContainer, Title } from './styles'
import { ArrowRight } from 'phosphor-react'

export function Hero() {
  return (
    <HeroContainer>
      <Title>
        <Text size="5">Acreditamos em </Text>
        <br />
        <Text
          size="9"
          highContrast
          color="purple"
          style={{ textTransform: 'uppercase' }}
        >
          informação, apoio e coragem
        </Text>
        <br />
        <Text size="5">para romper o ciclo da violência.</Text>
      </Title>

      <Button asChild size="4" radius="medium" color="purple">
        <a href="/projeto-faculdade/denunciar">
          Fazer denuncia
          <ArrowRight />
        </a>
      </Button>
    </HeroContainer>
  )
}
