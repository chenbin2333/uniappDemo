/**
 * 默认的全局配置
 */

export default {
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',
  // #ifndef MP-ALIPAY
  responseType: 'text',
  // #endif
  custom: {},
  showLoading: true,
  showError: false,
  // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
  timeout: 10000,
  // #endif
  // #ifdef APP-PLUS
  sslVerify: true,
  // #endif
  // #ifdef H5
  withCredentials: false,
  // #endif
  // #ifdef APP-PLUS
  firstIpv4: false,
  // #endif
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300
  }
}
