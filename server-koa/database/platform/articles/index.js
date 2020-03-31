const articlesModel = require('./model')
class Database {
  static async register(accountMobile, password) {
    const register = await articlesModel.create(
      [
        {
          accountMobile: accountMobile,
          password: password
        }
      ]
    )
    return register
  }
  // 检查账号是否已存在
  static async FindUserByAccountMobile(accountMobile) {
    const FindUserByAccountMobile = await articlesModel.findOne({ accountMobile: accountMobile }, { accountMobile: 1, password: 1, nickname: 1 })
    return FindUserByAccountMobile
  }
}
module.exports = Database
