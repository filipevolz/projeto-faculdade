import { HomeContainer } from './styles'
import { Hero } from '../../components/Hero'
import { About } from '../../components/About'
import { Contact } from '../../components/Contact'
import { Report } from '../../components/Report'

export function Home() {
  return (
    <HomeContainer>
      <Hero />
      <About />
      <Contact />
      <Report />
    </HomeContainer>
  )
}
