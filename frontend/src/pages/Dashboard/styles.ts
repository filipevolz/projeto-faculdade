import styled from 'styled-components'

export const DashboardHeader = styled.header`
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const DashboardContainer = styled.div`
  min-height: calc(100vh - 100px);
  max-height: calc(100vh - 100px);
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const TableContainer = styled.div`
  max-height: 700px; /* Altura máxima para a tabela */
  overflow-y: auto; /* Permite rolar a tabela quando ultrapassar o limite de altura */
`