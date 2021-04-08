import axios from "axios";

const instance = axios.create({
    baseURL: 'https://experts-vision-erp.herokuapp.com',
    
});
// https://experts-vision-erp.herokuapp.com/public/labels

export default instance;