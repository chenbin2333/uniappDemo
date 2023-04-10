const coreRules = require('./rules')
const orderRules = require('./rules/order')

module.exports = {
  extends: ['stylelint-config-prettier', 'stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: { ...coreRules, ...orderRules, 'prettier/prettier': true }
}
