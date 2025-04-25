import styled from 'styled-components'
import { FormContainer } from '../Report/styles'

export const RegisterPageContainer = styled.div`
  height: calc(100vh - 100px);
  background-color: ${(props) => props.theme['gray-100']};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const RegisterForm = styled(FormContainer)`
  h2 {
    color: ${(props) => props.theme.white};
  }

  button {
    cursor: pointer;
  }

  span {
    color: ${(props) => props.theme.white};
  }

  a {
    color: ${(props) => props.theme.white};
    text-decoration: underline;
  }
`
