import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { ButtonGroup, ControlsContainer, PageInfo, PageText, PaginationButton, PaginationContainer } from './styles'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) {

  // Certifique-se de calcular o total de páginas corretamente
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <PaginationContainer>
      <PageInfo>Total de {totalCount} item(s)</PageInfo>

      {pages > 1 && ( // Exibe a navegação apenas se houver mais de uma página
        <ControlsContainer>
          <PageText>
            Página {pageIndex + 1} de {pages}
          </PageText>

          <ButtonGroup>
            <PaginationButton
              onClick={() => onPageChange(0)}
              disabled={pageIndex === 0}
            >
              <ChevronsLeft />
            </PaginationButton>
            <PaginationButton
              onClick={() => onPageChange(pageIndex - 1)}
              disabled={pageIndex === 0}
            >
              <ChevronLeft />
            </PaginationButton>
            <PaginationButton
              onClick={() => onPageChange(pageIndex + 1)}
              disabled={pageIndex + 1 >= pages}
            >
              <ChevronRight />
            </PaginationButton>
            <PaginationButton
              onClick={() => onPageChange(pages - 1)}
              disabled={pageIndex === pages - 1}
            >
              <ChevronsRight />
            </PaginationButton>
          </ButtonGroup>
        </ControlsContainer>
      )}
    </PaginationContainer>
  )
}
