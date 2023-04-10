import AREA_CONFIGS from '../../my_node_modules/webpack-area-config-use/areaConfig'

const CONFIGS = AREA_CONFIGS
let origin = ''
let USE_GATE = false

// #ifdef H5
import ENV_H5 from './env_h5'
console.log(ENV_H5)
const USE_CONFIG = CONFIGS[ENV_H5.AREA_CONFIG_NAME]

origin = window.location.origin
USE_GATE = window.location.origin.indexOf('xtbg') > 0
// #endif

// #ifdef MP
import ENV_MP from './env_mp-weixin'
console.log(ENV_MP)
const USE_CONFIG = CONFIGS[ENV_MP.AREA_CONFIG_NAME]
// #endif

console.log('USE_CONFIG', USE_CONFIG)

function getUrl(url) {
  if (USE_GATE) {
    return origin + '/' + USE_CONFIG.APP_NAME
  } else {
    return origin + url
  }
}

export const SYS_CONFIG = {
  MAX_INPUT_SIZE_OPINION: 2000,
  FILE_MAX_SIZE: 104857600,
  APP_AREA: USE_CONFIG.APP_AREA,
  APP_NAME: USE_CONFIG.APP_NAME,
  APP_NAME_CN: USE_CONFIG.APP_NAME_CN,
  BASE_PATH: USE_CONFIG.ROUTER_BASE,
  BASE_URL: getUrl(process.env.NODE_ENV === 'production' ? USE_CONFIG.PRODUCTION.BASE_URL : USE_CONFIG.DEV.BASE_URL),
  API_STR: getUrl(process.env.NODE_ENV === 'production' ? USE_CONFIG.PRODUCTION.API_STR : USE_CONFIG.DEV.API_STR),
  FILE_OPEN_PREFIX:
    process.env.NODE_ENV === 'production' ? USE_CONFIG.PRODUCTION.FILE_OPEN_PREFIX : USE_CONFIG.DEV.FILE_OPEN_PREFIX
}

console.log(SYS_CONFIG)

// 全局配置，以后不用在main.js再导入了
export default {
  install(Vue) {
    Vue.prototype.SYS_CONFIG = SYS_CONFIG
  }
}
