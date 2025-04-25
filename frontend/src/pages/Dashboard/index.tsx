import { Button, Link, Skeleton, Table, TextField } from '@radix-ui/themes'
import { Logo, LogoIcon } from '../../components/Header/styles'
import { DashboardContainer, DashboardHeader, TableContainer } from './styles'
import { ArrowRight, MagnifyingGlass } from 'phosphor-react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { Pagination } from './components/Pagination'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

export interface ReportResponse {
  data: Report[]
  totalCount: number
}

export interface Report {
  uuid: string
  nome: string
  email: string
  cep: string
  endereco: string
  numero: string
  complemento?: string
  descricao: string
  created_at: string
}

export function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const perPage = 10
  const [debouncedSearch] = useDebounce(search, 100)

  const searchTerm = debouncedSearch

  const { data: reportsResponse, isLoading } = useQuery<ReportResponse>({
    queryKey: ['get-reports', page, searchTerm],
    queryFn: async () => {
      const response = await axios.get('https://projeto-faculdade-nwhu.onrender.com/reports', {
        params: {
          page,
          per_page: perPage,
          q: searchTerm,
        },
      })
      return response.data
    },
    placeholderData: keepPreviousData,
  })  

  function handlePagination(pageIndex: number) {
    setSearchParams({
      page: (pageIndex + 1).toString(),
    })
  }

  return (
    <>
      <DashboardHeader>
        <Logo>
          <LogoIcon size={70} />
          <span>
            Violência <br /> Doméstica
          </span>
        </Logo>
      </DashboardHeader>

      <DashboardContainer>
        <div>
          <TextField.Root
            placeholder="Pesquisar..."
            color="purple"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size='3'
          >
            <TextField.Slot>
              <MagnifyingGlass height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>

          <TableContainer>
            <Table.Root layout="fixed">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Nome Completo</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Descrição</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Cep</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Endereço</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Número</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Complemento</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Detalhes do projeto</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {isLoading
                  && Array.from({ length: 14 }).map((_, index) => (
                      <Table.Row key={index}>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                      </Table.Row>
                    ))
                  }
                  {reportsResponse && reportsResponse.data.map((report) => (
  <Table.Row key={report.uuid}>
    <Table.Cell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
      {report.nome}
    </Table.Cell>
    <Table.Cell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
      {report.email}
    </Table.Cell>
    <Table.Cell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
      {report.descricao}
    </Table.Cell>
    <Table.Cell>{report.cep}</Table.Cell>
    <Table.Cell>{report.endereco}</Table.Cell>
    <Table.Cell>{report.numero}</Table.Cell>
    <Table.Cell>{report.complemento}</Table.Cell>
    <Table.Cell>
      <Button asChild>
        <Link href={`/report/${report.uuid}`} color='purple'>
          Ver detalhes
          <ArrowRight size={16} />
        </Link>
      </Button>
    </Table.Cell>
  </Table.Row>
))}

              </Table.Body>
            </Table.Root>
          </TableContainer>
        </div>

        {!isLoading && (
          <Pagination
            pageIndex={page - 1} // página começa do 0
            totalCount={reportsResponse?.totalCount || 0}
            perPage={perPage}
            onPageChange={handlePagination} // ajusta para o backend
          />
        )}
      </DashboardContainer>
    </>
  )
}
