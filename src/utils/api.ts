import axios, { CancelToken } from 'axios';

import { apiBase, authToken } from '../config';
import { DataState, IState } from '../states/appState';

const instance = axios.create({
  baseURL: apiBase,
  timeout: 5000
})

axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

const hasData = function hasDataFunc(data) {
  return !!data
}

const request = (method, url, config: RequestOptions = {}) : Promise<any> => {
  return new Promise(((resolve, reject) => {
    (() => {
      if (config.stateHolder) config.stateHolder.state = DataState.Loading
      if (method === 'get') {
        return instance.request({ url, method, params: config.data, headers: {}, cancelToken: config.cancelToken })
      } else {
        return instance.request({ url, method, data: config.data, headers: {}, cancelToken: config.cancelToken })
      }
    })()
    .then((res) => {
      if (config.stateHolder) {
        if (hasData(res.data))
          config.stateHolder.state = DataState.Loaded
        else
          config.stateHolder.state = DataState.NoData
      }
      resolve(res.data)
    })
    .catch((err) => {
      if (config.stateHolder) config.stateHolder.state = DataState.Error
      reject(err.response)
    })
  }))
}

export interface RequestOptions {
  stateHolder?: IState,
  data?: any,
  cancelToken?: CancelToken
}

export default {
  get: (endpoint, config?: RequestOptions) => {
    return request('get', endpoint, config)
  },
  post: (endpoint, config?: RequestOptions) => {
    return request('post', endpoint, config)
  },
  put: (endpoint, config?: RequestOptions) => {
    return request('put', endpoint, config)
  },
  delete: (endpoint, config?: RequestOptions) => {
    return request('delete', endpoint, config)
  }
}