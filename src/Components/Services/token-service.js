
import config from '../../config';

const TokenService = {
    saveAuthToken(token) {
        window.sessionStorage.setItem(config.TOKEN_KEY, token);
    },
    getAuthToken() {
        return window.sessionStorage.getItem(config.TOKEN_KEY);
    },
    clearAuthToken() {
        window.sessionStorage.removeItem(config.TOKEN_KEY);
    }, 
    hasAuthToken() {
        // casting this into a boolean
        return !!TokenService.getAuthToken();
    },
    makeBasicAuthToken(user_name, password) {
        return window.btoa(`${user_name}:${password}`);
    },
};

export default TokenService;