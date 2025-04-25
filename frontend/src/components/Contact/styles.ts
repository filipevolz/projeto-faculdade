import styled from 'styled-components'

export const ContactContainer = styled.section`
  height: calc(100vh - 100px);
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme['gray-100']};
`

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 900px;
`

export const ContactCard = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
`
