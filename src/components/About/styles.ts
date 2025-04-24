import styled from 'styled-components'

export const AboutContainer = styled.section`
  background-color: ${({ theme }) => theme['gray-100']};
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: calc(100vh - 100px);
  padding: 2rem 4rem;
`

export const HighlightBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  div {
    background-color: ${({ theme }) => theme.white};
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    text-align: center;
  }

  h4 {
    margin: 0.75rem 0;
  }
`

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
`
