import { getJWT } from './auth'
import http from './http'

const config = {
    headers: {
        'x-auth-token': getJWT(),
        'content-type': 'multipart/form-data'
    }
}

export async function uploadImage(payload) {
    const { data } = await http.post('uploads', payload, config)
    localStorage.setItem('token', data)
    http.setJWT(data)
}

export default {
    uploadImage
}
