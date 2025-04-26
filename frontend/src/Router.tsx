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
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/denunciar" element={<ReportPage />} />
        <Route path="/denunciar/endereco" element={<Address />} />
        <Route path="/denunciar/endereco/descricao" element={<Description />} />
      </Route>
      <Route path="/login" element={<AccountLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report/:uuid" element={<ReportDetails />} />
      </Route>
    </Routes>
  )
}
