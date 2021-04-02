import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500

  const isCancel = axios.isCancel(expectedError)

  if (isCancel) {
    return
  }

  if (!expectedError) {
    //TODO: logger
    console.log(error)

    //TODO: create toast when client side error occurs
  }

  return Promise.reject(error)
})

function setJWT(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt
}

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
  patch: axios.patch,
  setJWT
}
