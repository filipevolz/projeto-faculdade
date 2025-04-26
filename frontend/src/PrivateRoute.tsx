import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from './lib/api'

export function PrivateRoute() {
  const { data } = useQuery({
    queryKey: ['auth-check'],
    queryFn: async () => {
      const response = await api.get('https://projeto-faculdade-nwhu.onrender.com/auth/validate')
      return response.data
    },
    retry: false,
  })
  if (data?.authenticated === false) {
    return <Navigate to="/projeto-faculdade/login" />
  }

  return <Outlet />
}
