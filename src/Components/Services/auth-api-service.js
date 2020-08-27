import config from '../config'
import TokenService from './token-service'

const AuthApiService = {
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
  },
  postPup(pup) {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    return fetch(`${proxyurl}${config.API_ENDPOINT}/stores`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
    body: pup,
      })
    .then(res =>
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  postComment(comment) {
    return fetch(`${config.API_ENDPOINT}/comments`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
    },
    body: JSON.stringify(comment),
      })
    .then(res =>
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
}

export default AuthApiService