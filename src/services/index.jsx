import baseUrl from '../constants/base/baseUrl'
import axios from "axios";



const instanceAxios = axios.create({
    baseURL: baseUrl,
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
});

instanceAxios.interceptors.request.use((config) => {
    const accessToken  = localStorage.getItem('data')
    const tokenType  = localStorage.getItem('tokenType')
    config.headers.Authorization = tokenType + ' ' + accessToken

    return config
})

export const register = async (user_information) => {
    const response = await instanceAxios.post(`/auth/register`, user_information);
    return response;
};

export const login = async (user_information) => {
    const response = await instanceAxios.post(`/auth/login`, user_information);
    return response;
};

export const users = async () => {
    const response = await instanceAxios.get(`/auth/users`);
    return response;
};

export const getMessages = async (id) => {
    const response = await instanceAxios.get(`/auth/message/${id}/user`);
    return response;
};

export const sendMessage = async (message) => {
    const response = await instanceAxios.post(`https://chat-intern.codio.az/api/v1/auth/message`, message);
    return response;
};

export const searchUser = (array, value) => {
    const response = array.filter((item) =>item.name.toLowerCase().includes(value.toLowerCase())); 
    return response
}

export const logOut = () => {
    try{
        let item = localStorage.removeItem('data')
        return !!item
    }catch (err){
        console.log(err);
    }
}