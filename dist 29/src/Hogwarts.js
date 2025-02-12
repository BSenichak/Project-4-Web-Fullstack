import axios from "axios";

const instance = axios.create({
    baseURL: "https://hp-api.onrender.com/api/",
    method: "GET",
    responseType: "json",
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;