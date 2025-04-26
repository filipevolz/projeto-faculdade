import { Outlet } from 'react-router-dom'
import { HeaderContainer } from './styles'
import { Logo, LogoIcon } from '../../components/Header/styles'
import { Button } from '@radix-ui/themes'
import { ArrowLeft } from 'phosphor-react'

export function AccountLayout() {
  return (
    <>
      <HeaderContainer>
        <Button color="purple" asChild>
          <a href="/projeto-faculdade">
            <ArrowLeft size={24} /> Retornar
          </a>
        </Button>

        <Logo>
          <LogoIcon size={70} />
          <span>
            Violência <br /> Doméstica
          </span>
        </Logo>
      </HeaderContainer>

      <Outlet />
    </>
  )
}
