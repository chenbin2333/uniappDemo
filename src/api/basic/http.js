import { http } from './service.js'

class HttpClient {
  getWithLoading(path, params, config) {
    return this.get(path, params, config, true)
  }

  postWithLoading(path, params, config) {
    return this.post(path, params, config, true)
  }

  get(path, params, config, showLoading) {
    return http.get(path, { params, ...config, showLoading: showLoading !== undefined ? showLoading : false })
  }

  post(path, params, config, showLoading) {
    return http.post(path, params, { ...config, showLoading: showLoading !== undefined ? showLoading : false })
  }
}

export const client = new HttpClient()
