import http from './http'

export async function register(payload) {
  const { data } = await http.post('users', payload)
  return data
}
