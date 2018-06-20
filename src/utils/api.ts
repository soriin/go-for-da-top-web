import axios from 'axios'

import {apiBase, authToken} from '../config'

const instance = axios.create({
  baseURL: apiBase,
  timeout: 5000
})

axios.defaults.headers.common['Authorization'] = authToken

const request = (method, url, data, cancelToken?) => {
  return new Promise(((resolve, reject) => {
    (() => {
      if (method === 'get') {
        return instance.request({ url, method, params: data, headers: {}, cancelToken })
      } else {
        return instance.request({ url, method, data, headers: {}, cancelToken })
      }
    })()
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err.response)
    })
  }))
}

export default {
  get: (endpoint, data) => {
    return request('get', endpoint, data)
  },
  post: (endpoint, data) => {
    return request('post', endpoint, data)
  },
  put: (endpoint, data) => {
    return request('put', endpoint, data)
  },
  delete: (endpoint, data) => {
    return request('delete', endpoint, data)
  }
}