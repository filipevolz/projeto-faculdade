import styled from 'styled-components'
import { FormContainer } from '../Report/styles'

export const LoginPageContainer = styled.div`
  height: calc(100vh - 100px);
  background-color: ${(props) => props.theme['gray-100']};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoginForm = styled(FormContainer)`
  h2 {
    color: ${(props) => props.theme.white};
  }
`
