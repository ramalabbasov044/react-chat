import baseUrl from '../constants/base/baseUrl'
import axios from "axios";
import { userTypes } from '../interface/interface'

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

export const register = async (user_information:object) => {
    const response = await instanceAxios.post(`/auth/register`, user_information);
    return response;
};

export const login = async (user_information:object) => {
    const response = await instanceAxios.post(`/auth/login`, user_information);
    return response;
};

export const searchUser = (array: userTypes[], value:string) => {
    const response = array.filter((item) =>item.name.toLowerCase().includes(value.toLowerCase())); 
    return response
}

export const users = async () => {
    const response = await instanceAxios.get(`/auth/users`);
    return response;
};

export const getMessages = async (id: string | number) => {
    const response = await instanceAxios.get(`/auth/message/${id}/user`);
    return response;
};

export const sendMessage = async (message: string) => {
    const response = await instanceAxios.post(`/auth/message`, message);
    return response;
};

export const logOut = (): boolean => {
    try {
        localStorage.removeItem('data');
        localStorage.removeItem('activeData');

        return true;
    } catch (err) {
        return false; 
    }
}


export const getUserProfile = async (id: string | null) => {
    const response = await instanceAxios.get(`/auth/${id}/profile`);
    return response;
};


export const followUser = async (id: number | string) => {
    const response = await instanceAxios.post(`/auth/${id}/follow`);
    return response;
};

export const getFollowers = async () => {
    const response = await instanceAxios.get(`/auth/pending/followers`);
    return response;
};

export const approveUser = async (id: number | string) => {
    const response = await instanceAxios.post(`/auth/${id}/follow/approve`);
    return response;
};

export const rejectUser = async (id: number | string) => {
    const response = await instanceAxios.post(`/auth/${id}/follow/reject`);
    return response;
};

