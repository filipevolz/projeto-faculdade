import styled from 'styled-components'
import { ShieldWarning } from 'phosphor-react'

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 2rem 4rem;

  background-color: white;
  color: ${(props) => props.theme['gray-600']};
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  span {
    font-weight: bold;
    font-size: 1.5rem;
    line-height: normal;
    color: ${(props) => props.theme.primary};
  }
`

export const LogoIcon = styled(ShieldWarning)`
  color: ${(props) => props.theme.primary};
`
