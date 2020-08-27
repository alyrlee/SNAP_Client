  
import config from '../../config'

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },
  saveUserName(user_name){
    window.localStorage.setItem(config.USER_NAME, user_name)
  },
  saveUserId(user_id){
    window.localStorage.setItem(config.USER_ID, user_id)
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  getUserName() {
    return window.localStorage.getItem(config.USER_NAME)
  },
  getUserId() {
    return window.localStorage.getItem(config.USER_ID)
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY)
  },
  clearUserName() {
    window.localStorage.removeItem(config.USER_NAME)
  },
  clearUserId() {
    window.localStorage.removeItem(config.USER_ID)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
}

export default TokenService