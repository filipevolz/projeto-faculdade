import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { ReportPage } from './pages/Report'
import { Address } from './pages/Report/components/Address'
import { Description } from './pages/Report/components/Description'
import { Login } from './pages/Login'
import { AccountLayout } from './layouts/AccountLayout'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/denunciar" element={<ReportPage />} />
        <Route path="/denunciar/endereco" element={<Address />} />
        <Route path="/denunciar/endereco/descricao" element={<Description />} />
      </Route>
      <Route path="/account" element={<AccountLayout />}>
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}
