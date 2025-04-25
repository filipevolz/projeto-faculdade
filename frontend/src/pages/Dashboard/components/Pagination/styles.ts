import styled from 'styled-components'

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PageInfo = styled.div`
  font-size: 14px;
  color: #6b7280;
`

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

export const PageText = styled.div`
  font-size: 14px;
  font-weight: 500;
`

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  height: 32px;
  width: 32px;
  padding: 0;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    height: 16px;
    width: 16px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
  }
`