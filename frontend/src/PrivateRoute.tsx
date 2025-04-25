import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function PrivateRoute() {
  const { data } = useQuery({
    queryKey: ['auth-check'],
    queryFn: async () => {
      const response = await axios.get('https://projeto-faculdade-nwhu.onrender.com/auth/validate', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return response.data
    },
    retry: false,
  })
  if (!data?.authenticated) {
    return <Navigate to="/account/login" replace />
  }

  return <Outlet />
}
