/**
 * @version 3.0.5
 * @Author lu-ch
 * @Email webwork.s@qq.com
 * 文档: https://www.quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: beat-3.0.4 alpha-3.0.4
 */

import Request from '../network/luch-request'
import { SYS_CONFIG } from '../../config/config'
// import { User } from '../../store/User'

const getUserLoginId = () => {
  // return User.getUser().loginId
}

const getUserToken = () => {
  // if (wx) {
  //   // #ifdef H5
  //   return 'eyJhbGciOiJIUzUxMiJ9.eyJncmFudF90eXBlIjoid2VjaGF0X2FwcGxldF95cWZrIiwiYXV0aGVudGljYXRpb25faWQiOiJzcXlxZms6b0RueXk1WUhGZUhfOEx4NDhhUTZmSEFhZWZpNCIsInN1YiI6Im9Ebnl5NVlIRmVIXzhMeDQ4YVE2ZkhBYWVmaTQiLCJleHAiOjE2NzU4NDM2Mzl9.kx_0prbkNDJRLEtxMHqVPX37mUgMo9JEqN-y_MLD0qvjd8EVnSqEfa2YXI6DRXZ9dt6DwueA1ztOapi6M0sE3w'
  //   // #endif
  // }
  // return User.getUser().token
}

/**
 * 修改全局配置示例
 const test = new Request({
    header: {a:1}, // 举例
    baseURL: 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest',
    validateStatus: (statusCode) => { // statusCode 必存在。此处示例为全局默认配置
        return statusCode >= 200 && statusCode < 300
    }
})
 test.config.baseURL = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest'
 **/

const http = new Request()
console.log(SYS_CONFIG.BASE_URL)
http.setConfig(config => {
  /* 设置全局配置 */
  config.baseURL = SYS_CONFIG.BASE_URL /* 根域名不同 */
  config.header = {
    ...config.header
  }
  config.reLogin = true
  return config
})

http.interceptors.request.use(
  config => {
    /* 请求之前拦截器。可以使用async await 做异步操作 */
    config.header = {
      ...config.header
      // token: getTokenStorage()
    }

    // console.log(config)
    if (config.showLoading) {
      // console.log('showloading', config.showLoading)
      uni.showLoading({
        title: typeof config.showLoading === 'string' && config.showLoading.length > 1 ? config.showLoading : '加载中'
      })
    }

    config.header['loginId'] = getUserLoginId()

    config.header['Authorization'] = `Bearer ${getUserToken()}`

    /*
   if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
     return Promise.reject(config)
   }
   */
    return config
  },
  config => {
    return Promise.reject(config)
  }
)

http.interceptors.response.use(
  async response => {
    const code = response.data.errcode !== undefined ? response.data.errcode : response.data.code
    const msg = response.data.errmsg !== undefined ? response.data.errmsg : response.data.message

    /* 请求之后拦截器。可以使用async await 做异步操作  */
    if (response.config.showLoading) {
      uni.hideLoading()
    }

    if (code === 100503) {
      showTips('服务拥挤,稍后再试')
      return Promise.reject(response)
    } else if (code === 100401) {
      // 服务端返回的状态码不等于200，则reject()
      // console.log(response.data)
      // console.log(response.config)

      // #ifdef MP
      // console.log(response.config.params.FEHasRetry)
      if (!response.config.params.FEHasRetry) {
        // 重设用户态
        // 尝试重新登录
        // console.log(response.config.params)
        uni.login({
          provider: 'weixin',
          success: loginRes => {
            http
              .post('/api/token', {
                code: loginRes.code,
                grantType: 'wechat_applet_yqfk',
                wechatAppId: 'sqyqfk'
              })
              .then(res => {
                if (res.data.code !== 0) {
                  // redirectToLogin()
                  response.config.params.FEHasRetry = true
                  return Promise.reject(response)
                }

                User.setUser({
                  loginId: res.data.data.loginId,
                  token: res.data.data.token,
                  expiredTime: res.data.data.expiredTime,
                  lastLoginTime: new Date().getTime()
                })

                const promise = http.middleware(response.config)
                response.config.params.FEHasRetry = false
                return promise
              })
              .catch(err => {
                console.log(err)
                response.config.params.FEHasRetry = true
                return Promise.reject(response)
              })
          }
        })
      }
      // #endif

      // console.log(response.config.params.FEHasRetry)
      // redirectToLogin()
      return Promise.reject(response)
    } else if (response.statusCode === 502) {
      // 网络繁忙
      uni.showModal({
        title: '提示',
        content: '网络连接异常，请稍后再试',
        showCancel: false
      })
      return Promise.reject(response)
    } else if (code !== 0) {
      if (response.config.showError) {
        showTips(msg)
      }
      console.log('fail', response)
      return Promise.reject(response)
    } else {
      return response
    }
  },
  response => {
    // 请求错误做点什么。可以使用async await 做异步操作

    const code = response.data.errcode !== undefined ? response.data.errcode : response.data.code

    console.log('onreject', response)
    // console.log('onreject', response.data.code)
    // 服务器无响应

    if (code !== 100503) {
      if (!response.config.params.FEHasRetry) response.config.params.FEHasRetry = 0
      if (response.config.params.FEHasRetry + 1 < 3) {
        const promise = http.middleware(response.config)
        response.config.params.FEHasRetry = response.config.params.FEHasRetry + 1

        return promise
      }
    } else {
      uni.hideLoading()
      console.log('服务忙,稍后再试')
      showTips('服务忙,稍后再试')
      return Promise.reject(response)
    }
  }
)

let modalShowing = false

function showTips(msg) {
  if (modalShowing) {
    return
  }
  modalShowing = true
  uni.showModal({
    title: '提示',
    content: '错误:' + msg,
    showCancel: false,
    success: ee => {
      modalShowing = false
      // if (ee.confirm) {
      // }
    }
  })
}

export { http }
