import { getJWT } from './auth'
import http from './http'

const config = {
    headers: {
        'x-auth-token': getJWT()
    }
}

export function getItems() {
    return http.get('items', config)
}

export function saveItem(payload) {
    return http.post('items', payload, config)
}

export function updateItem(payload) {
    return http.patch('items', payload, config)
}

export function removeItem(id) {
    return http.delete(`items/${id}`, config)
}

export default {
    getItems,
    saveItem,
    updateItem,
    removeItem
}
