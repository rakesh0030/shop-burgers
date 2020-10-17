import axios from 'axios';

const instance = axios.create({
  baseURL : "https://shop-burger.firebaseio.com/"
})

export default instance;
