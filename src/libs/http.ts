import axios from 'axios'

axios.interceptors.request.use(
  function (config) {
    return {
      ...config,
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

function HttpClient() {
  return {
    get: axios.get,
    post: axios.post,
    patch: axios.patch,
    put: axios.put,
    delete: axios.delete,
  }
}

export default HttpClient()
