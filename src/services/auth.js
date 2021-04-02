import jwt from 'jsonwebtoken'
import http from './http'

export async function login(payload) {
  const { data } = await http.post('auth', payload)
  localStorage.setItem('token', data)
  http.setJWT(data)

  return data
}

export function logout() {
  localStorage.removeItem('token')
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem('token')
    return jwt.decode(token)
  } catch (error) {
    return null
  }
}

export function getJWT() {
  return localStorage.getItem('token')
}

export default {
  login,
  logout,
  getCurrentUser,
  getJWT
}
