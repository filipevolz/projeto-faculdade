import { ScrollArea, Table } from '@radix-ui/themes'
import { Logo, LogoIcon } from '../../components/Header/styles'
import { DashboardContainer, DashboardHeader } from './styles'

const data = new Array(20).fill({
  name: 'filipe',
  email: 'filipevolz00@gmail.com',
  description: 'teste',
  cep: '88058340',
  street: 'rua tal',
  numero: '1529',
  complement: 'apto 203',
})

export function Dashboard() {
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
        <input type="text" placeholder="pesquisar" />

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
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.cep}</Table.Cell>
                <Table.Cell>{item.street}</Table.Cell>
                <Table.Cell>{item.numero}</Table.Cell>
                <Table.Cell>{item.complement}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </DashboardContainer>
    </>
  )
}
