import axios from "axios";

const instance = axios.create({
    baseURL: 'https://experts-vision.herokuapp.com',
    
});

export default instance;