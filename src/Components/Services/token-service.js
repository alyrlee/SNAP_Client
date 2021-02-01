
import config from '../../config';

const TokenService = {
    saveAuthToken(token) {
        window.sessionStorage.setItem(config.TOKEN_KEY, token);
    },
    saveUserName(user_name){
        window.localStorage.setItem(config.USER_NAME, user_name)
    },
      saveUserId(user_id){
        window.localStorage.setItem(config.USER_ID, user_id)
    },
    getUserName() {
        return window.localStorage.getItem(config.USER_NAME)
      },
    getAuthToken() {
        return window.sessionStorage.getItem(config.TOKEN_KEY);
    },
    clearAuthToken() {
        window.sessionStorage.removeItem(config.TOKEN_KEY);
    }, 
    hasAuthToken() {
        return !!TokenService.getAuthToken();
    },
    makeBasicAuthToken(user_name, password) {
        return window.btoa(`${user_name}:${password}`);
    },
};

export default TokenService;