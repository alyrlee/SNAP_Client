import config from "../../config";

const url = new URL(`${config.API_ENDPOINT}cityState`);
const params = {
  lat: 42.3600825,
  lng: -71.0588801,
  query: "string",
};
url.search = new URLSearchParams(params).toString();

const AuthApiService = {
  getStores(stores) {
    return fetch(`${config.API_ENDPOINT}/stores`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(stores),
    }).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },
  getCityState(city, state) {
    return fetch(`${config.API_ENDPOINT}/stores/cityState`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },
  postCityState(city, state) {
    return fetch(`${config.API_ENDPOINT}/stores/cityState`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        city: city,
        state: state,
      }),
    }).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },
  postStores(stores) {
    return fetch(`${config.API_ENDPOINT}/stores`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(stores),
    }).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  }
  }

export default AuthApiService;
