import TokenService from '../Services/token-service';
import config from '../../config';

const user_name = 'DemoUser2020';
const password = 'DemoUser*';

const url = new URL(`${config.API_ENDPOINT}/cityState`);
const params = {
    lat: 42.3600825, 
    lng: -71.0588801,
    query: 'string',
}
url.search = new URLSearchParams(params).toString();

const AuthApiService = {
    postLogin({user_name, password}) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                Authorization: `Schema ${user_name}:${password}`,
                'authorization': `basic ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({user_name, password})
        })
            .then(res => {
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            });
    },
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                Authorization: `Schema ${user_name}:${password}`,
                'authorization': `basic ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(res => {
            return (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        });
    },  
    getProfile(){
        return fetch(`${config.API_ENDPOINT}/profile/${TokenService.getUserName()}`, {
          headers: {'authorization': `bearer ${TokenService.getAuthToken()}`},})
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
      },
    getStores(stores, user_name, password) {
        return fetch(`${config.API_ENDPOINT}/stores`, {
            method: 'GET',
            headers: {
                Authorization: `Schema ${user_name}:${password}`,
                'authorization': `basic ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(stores),
        })
        .then(res => {
            return (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        });
    },

    getcityState(city, state) {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        return fetch(`${config.API_ENDPOINT}/cityState`,  {
            method: 'GET',
            headers: {
                // Authorization: `Schema ${user_name}:${password}`,
                'authorization': `basic ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
             // body: JSON.stringify({
            //     city: city, 
            //     state: state}),
        })       
        .then(res => {
            return (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        });
    },

    postStores(stores, user_name, password) {
        return fetch(`${config.API_ENDPOINT}/stores`, {
            method: 'POST',
            headers: {
                Authorization: `Schema ${user_name}:${password}`,
                'authorization': `basic ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(stores)
        })
        .then(res => {
            return (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        });
    },

    getSavedLocations(ObjectId, Store_Name, user_name, password) {
        return fetch(`${config.API_ENDPOINT}/SavedLocations`, {
            method: 'GET',
            headers: {
                Authorization: `Schema ${user_name}:${password}`,
                'authorization': `basic ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                ObjectId: ObjectId,
                Store_Name: Store_Name
            })
        })
        .then(res => {
            return (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        });
    },
    
    postSavedLocations(ObjectId, Store_Name, user_name, password) {
        return fetch(`${config.API_ENDPOINT}/SavedLocations`, {
            method: 'POST',
            headers: {
                Authorization: `Schema ${user_name}:${password}`,
                'authorization': `basic ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                ObjectId: ObjectId,
                Store_Name: Store_Name,
            })
        })
        .then(res => {
            return (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()  
        });
    }
}   

export default AuthApiService;