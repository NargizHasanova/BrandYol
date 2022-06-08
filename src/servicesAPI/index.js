import axios from 'axios';

const Axios = axios.create({
    baseURL: "https://todos-2aa04-default-rtdb.firebaseio.com"
})

export {Axios}