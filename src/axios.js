import axios from "axios";
import axiosRetry from "axios-retry";


const instance = axios.create({
    baseURL: 'https://experts-vision-erp.herokuapp.com',
});



const retryDelay = (retryNumber = 0) => {
    const seconds = Math.pow(2, retryNumber) * 1000;
    const randomMs = 1000 * Math.random();
    return seconds + randomMs;
};

axiosRetry(instance, {
    retries: 1,
    retryDelay,
    // retry on Network Error & 5xx responses
    retryCondition: axiosRetry.isRetryableError,
});

export default instance;