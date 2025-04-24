import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { ReportPage } from './pages/Report'
import { Address } from './pages/Report/components/Address'
import { Description } from './pages/Report/components/Description'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/denunciar" element={<ReportPage />} />
        <Route path="/denunciar/endereco" element={<Address />} />
        <Route path="/denunciar/endereco/descricao" element={<Description />} />
      </Route>
    </Routes>
  )
}
