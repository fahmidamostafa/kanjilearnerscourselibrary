import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://project5-16cae.firebaseio.com/'
});

export default instance;