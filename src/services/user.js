import http from './http'

export async function register(payload) {
  const { data } = await http.post('users', payload)
  return data
}

export async function updateUser(payload) {
  const { data } = await http.patch('users', payload)
  localStorage.setItem('token', data)
  http.setJWT(data)
}

export default {
  register,
  updateUser
}