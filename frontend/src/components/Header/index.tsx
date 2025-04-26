import { TabNav } from '@radix-ui/themes'
import { HeaderContainer, Logo, LogoIcon } from './styles'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function Header() {
  const { pathname } = useLocation()
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)

    window.addEventListener('hashchange', onHashChange)

    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  console.log(pathname)

  return (
    <HeaderContainer
      style={{
        justifyContent: pathname !== '/projeto-faculdade/' ? 'center' : 'justify-between',
      }}
    >
      <Logo>
        <LogoIcon size={70} />
        <span>
          Violência <br /> Doméstica
        </span>
      </Logo>

      {pathname === '/projeto-faculdade/' && (
        <TabNav.Root color="purple" highContrast>
          <TabNav.Link asChild active={hash === ''}>
            <a href="/projeto-faculdade">Home</a>
          </TabNav.Link>
          <TabNav.Link asChild active={hash === '#sobre'}>
            <a href="#sobre">Sobre</a>
          </TabNav.Link>
          <TabNav.Link asChild active={hash === '#contato'}>
            <a href="#contato">Contato</a>
          </TabNav.Link>
          <TabNav.Link asChild active={hash === '#denunciar'}>
            <a href="#denunciar">Denunciar</a>
          </TabNav.Link>
          <TabNav.Link asChild>
            <a href="/projeto-faculdade/login">Login</a>
          </TabNav.Link>
        </TabNav.Root>
      )}
    </HeaderContainer>
  )
}
