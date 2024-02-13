import axios from "axios";


const client = axios.create({
    baseURL: 'http://192.168.0.32:9000',
});

export default client; 