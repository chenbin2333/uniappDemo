import { client } from './basic/http.js'

module.exports = {
  queryLoginInfo(centerId) {
    const url = '/api/center/reserve/getLoginInfo'
    return client.getWithLoading(url, {}, { showError: true })
  },
  querySignState(ticket) {
    const url = '/api/center/reserve/getSignState'
    return client.get(url, { ticket }, { showError: true, showLoading: false })
  },
  queryLoginNickName() {
    const url = '/api/center/reserve/nickname'
    return client.get(url, { showError: false })
  },
  loginout() {
    const url = '/api/center/reserve/logout'
    return client.getWithLoading(url, { showError: false })
  }
}
