import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { ReportPage } from './pages/Report'
import { Address } from './pages/Report/components/Address'
import { Description } from './pages/Report/components/Description'
import { Login } from './pages/Login'
import { AccountLayout } from './layouts/AccountLayout'
import { Dashboard } from './pages/Dashboard'
import { ReportDetails } from './pages/Dashboard/components/ReportDetails'
import { PrivateRoute } from './PrivateRoute'

export function Router() {
  return (
    <Routes>
      <Route path="/projeto-faculdade" element={<DefaultLayout />}>
        <Route path="/projeto-faculdade" element={<Home />} />
        <Route path="/projeto-faculdade/denunciar" element={<ReportPage />} />
        <Route path="/projeto-faculdade/denunciar/endereco" element={<Address />} />
        <Route path="/projeto-faculdade/denunciar/endereco/descricao" element={<Description />} />
      </Route>
      <Route path="/projeto-faculdade/login" element={<AccountLayout />}>
        <Route path="/projeto-faculdade/login" element={<Login />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/projeto-faculdade/dashboard" element={<Dashboard />} />
        <Route path="/projeto-faculdade/report/:uuid" element={<ReportDetails />} />
      </Route>
    </Routes>
  )
}
