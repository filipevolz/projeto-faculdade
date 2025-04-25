import styled from 'styled-components'

export const ReportContainer = styled.section`
  background-color: ${({ theme }) => theme['gray-100']};
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);
`

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
`

export const ReportCard = styled.div`
  background-color: ${({ theme }) => theme.white};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
`

export const Divider = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 50%;

  font-size: 14px;
  color: $gray-bg;
  font-weight: 400;
  text-transform: uppercase;

  div {
    flex-grow: 1;
    height: 2px;
    background-color: ${(props) => props.theme['gray-400']};
  }
`

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
`
