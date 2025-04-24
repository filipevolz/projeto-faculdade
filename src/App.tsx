import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Theme>
        <GlobalStyle />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Theme>
    </ThemeProvider>
  )
}
