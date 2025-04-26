import styled from 'styled-components'

export const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  text-align: center;

  background-image: url('/projeto-faculdade/preview.jpg');
  background-size: cover;
  background-position: center;

  height: 100vh;
`

export const Title = styled.h1`
  max-width: 700px;
`
