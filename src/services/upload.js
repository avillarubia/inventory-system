import { getJWT } from './auth'
import http from './http'

const config = {
    headers: {
        'x-auth-token': getJWT(),
        'content-type': 'multipart/form-data'
    }
}

export function uploadImage(payload) {
    return http.post('uploads', payload, config)
}

export default {
    uploadImage
}
