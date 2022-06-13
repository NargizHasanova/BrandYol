import axios from 'axios';

const Axios = axios.create({
    baseURL: "https://brendyol-default-rtdb.firebaseio.com"
})

export {Axios}