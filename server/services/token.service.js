const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get('accessSecret'), {
      expiresIn: '1h'
    })
    const refreshToken = jwt.sign(payload, config.get('refreshSecret'))
    return {accessToken, refreshToken, expiresIn: 3600}
  }

  generateAdmin(payload) {
    const accessToken = jwt.sign(payload, config.get('accessSecretAdmin'), {
      expiresIn: '1h'
    })
    const refreshToken = jwt.sign(payload, config.get('refreshSecretAdmin'))
    return {accessToken, refreshToken, expiresIn: 3600}
  }

  async save(user, refreshToken) {
    const data = await Token.findOne({ user })
    if (data) {
      data.refreshToken = refreshToken
      return data.save()
    }

    const token = await Token.create({ user, refreshToken })
    return token
  }

  validateRefresh(refreshToken) {
    try {
       return jwt.verify(refreshToken, config.get('refreshSecret'))
    } catch (e) {
      return null
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get('accessSecret'))
    } catch (e) {
      return null
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken })
    } catch (e) {
      return null
    }
  }

  validateAccessAdmin(accessToken){
    try {
      return jwt.verify(accessToken, config.get('accessSecretAdmin'))
    } catch (e) {
      return null
    }
  }

  validateRefreshAdmin(refreshToken) {
    try {
       return jwt.verify(refreshToken, config.get('refreshSecretAdmin'))
    } catch (e) {
      return null
    }
  }

  async saveAdmin(admin, refreshToken) {
    const data = await Token.findOne({ admin })
    if (data) {
      data.refreshToken = refreshToken
      return data.save()
    }

    const token = await Token.create({ admin, refreshToken })
    return token
  }
}

module.exports = new TokenService()