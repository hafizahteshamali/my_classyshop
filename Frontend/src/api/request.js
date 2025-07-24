import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 4000,
    headers: {
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.response.use(
  (response) => {
    return response; // response.data wali value yahan se jaati hai
  },
  (error) => {
    return Promise.reject(error); // ❗ must reject error, not return directly
  }
);


export default apiClient;