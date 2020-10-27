import config from '../../config';

const testUserName = 'DemoUser2020';
const testPassword = 'DemoUser*';

const AuthApiService = {
    postLogin({userName, password}) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({userName, password})
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

    getStores(stores,userName, password) {
        return fetch(`${config.API_ENDPOINT}/stores`, {
            method: 'GET',
            headers: {
                Authorization: `Schema ${userName}:${password}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(stores),
            // ObjectId: 1,
            // Store_Name: "Walmart Super Center"
        })
        .then(res => {
            return (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        });
    },

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
    },

    getSavedLocations(ObjectId, Store_Name, userName, password) {
        return fetch(`${config.API_ENDPOINT}/SavedLocations`, {
            method: 'GET',
            headers: {
                Authorization: `Schema ${userName}:${password}`,
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
    
    postSavedLocations(ObjectId, Store_Name, userName, password) {
        return fetch(`${config.API_ENDPOINT}/SavedLocations`, {
            method: 'POST',
            headers: {
                Authorization: `Schema ${userName}:${password}`,
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