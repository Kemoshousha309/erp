import axios from "axios";

const instance = axios.create({
    baseURL: 'https://experts-vision.herokuapp.com',
    
});

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-Methods"] = "GET, DELETE, HEAD, OPTIONS, POST";
axios.defaults.headers.post["Access-Control-Allow-Headers"] = "Content-Type, Authorization";


export default instance;