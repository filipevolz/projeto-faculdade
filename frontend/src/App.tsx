import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { queryClient } from './lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Theme>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        </QueryClientProvider>
      </Theme>
    </ThemeProvider>
  )
}
