import { Text } from '@radix-ui/themes'
import styled from 'styled-components'

export const ReportPageContainer = styled.div`
  height: 100vh;
  padding-top: 100px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme['gray-100']};
  gap: 1rem;
`

export const ReportHeader = styled.div`
  width: 500px;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  border-radius: 8px;
  width: 540px;

  background-color: ${(props) => props.theme['gray-600']};
`

export const InputForm = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: white;

  input {
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    color: ${(props) => props.theme.white};
    font-weight: 400;
    background-color: ${(props) => props.theme['gray-900']};
    border: 0;
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 5px;

    &:focus {
      outline: 0;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &::placeholder {
      color: ${(props) => props.theme['gray-400']};
    }
  }
`

export const FormError = styled(Text)`
  color: ${(props) => props.theme['red-500']};
`
