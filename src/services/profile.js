import http from './http'
import { getJWT } from './auth'

const config = {
  headers: {
    'x-auth-token': getJWT() //TODO: use getJWT()
  }
}

export function getProfile() {
  return http.get('profiles/', config)
}

export function updateProfile(updates) {
  return http.put('profiles/', updates, config)
}

export function getAllProfiles() {
  return http.get('profiles/all', config)
}