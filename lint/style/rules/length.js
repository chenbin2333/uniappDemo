/**
 * @rulesName 长度
 * @rulesDesc 禁止零长度单位
 */

module.exports = {
  // 禁止零长度单位
  'length-zero-no-unit': [
    true,
    {
      message: '禁止零长度单位'
    }
  ]
}
