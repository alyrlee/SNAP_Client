import config from '../../config';

const userName = 'DemoUser2020'
const password = 'DemoUser*'

fetch(`${config.API_ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: {
        Authorization: `Schema ${userName}:${password}`    
    },
    body: JSON.stringify({
        userName, 
        password
    })
})

const AuthApiService = {
    // client-side POST for handling user logins. //
    postLogin({user_name, password}) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
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
    // client-side POST for registering new users. //
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            });
    },


getStores(stores,userName, password) {
    return fetch(`${config.API_ENDPOINT}/stores`, {
        method: 'GET',
        headers: {
        Authorization: `Schema ${userName}:${password}`,
        'content-type': 'application/json',
        },
        body: JSON.stringify(stores)
        // ObjectId: 1,
        // Store_Name: "Walmart Super Center"
    })
    .then(res => {
        return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    });
},


//client side POST for store locations when user us logged in //
    postStores(stores,userName, password) {
        return fetch(`${config.API_ENDPOINT}/stores`, {
            method: 'POST',
            headers: {
            Authorization: `Schema ${userName}:${password}`,
            'content-type': 'application/json',
            },
            body: JSON.stringify(stores)
            // ObjectId: 1,
            // Store_Name: "Walmart Super Center"
        })
        .then(res => {
            return (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        });
    }
}

export default AuthApiService;

