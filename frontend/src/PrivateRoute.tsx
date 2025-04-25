import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function PrivateRoute() {
  const { data, isLoading } = useQuery({
    queryKey: ['auth-check'],
    queryFn: async () => {
      const response = await axios.get('https://projeto-faculdade-nwhu.onrender.com/auth/validate', {
        withCredentials: true, // importante para enviar cookies
      })
      return response.data
    },
    retry: false,
  })

  if (isLoading) {
    return <p>Carregando...</p> // pode trocar por skeleton ou spinner
  }

  if (!data?.authenticated) {
    return <Navigate to="/account/login" replace />
  }

  return <Outlet />
}
