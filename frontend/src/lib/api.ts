import axios from 'axios'

const api = axios.create({
  baseURL: 'https://projeto-faculdade-nwhu.onrender.com',
})

// Adiciona o token a cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
