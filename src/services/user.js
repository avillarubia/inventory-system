import http from './http'
import { getJWT } from './auth'

const config = {
  headers: {
    'x-auth-token': getJWT()
  }
}

export async function register(payload) {
  const { data } = await http.post('users', payload)
  return data
}

export async function updateUser(id, payload) {
  const { data } = await http.patch(`users/update/${id}`, payload, config)
  localStorage.setItem('token', data)
  http.setJWT(data)
}

export default {
  register,
  updateUser
}