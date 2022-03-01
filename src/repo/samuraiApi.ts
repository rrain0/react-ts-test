import Axios from 'axios'


const baseUrl = "https://social-network.samuraijs.com/api/1.0/";

const ax = Axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "API-KEY": "99b838ca-9fd3-46f6-b97f-38fd123a4e39",
    }
})


// DAL (Data Access Layer) API

type SamuraiResponse<T> = {
    data: T
    messages: string[]
    fieldErrors: unknown[]
    resultCode: number
}

export const authApi = {
    async me(){
        // if not authorized {"data":{},"messages":["You are not authorized"],"fieldsErrors":[],"resultCode":1}
        type ResponseType = SamuraiResponse<{ id: number, login: string, email: string }>
        return ax.get<ResponseType>(`auth/me`)
    },

    async login(email, password, rememberMe = false) {
        type ResponseType = SamuraiResponse<{ "userId":number }>
        return ax.post<ResponseType>(`auth/login`, {email, password, rememberMe})//.then((a)=>{},(e)=>{})
    },

    async logout(){
        type ResponseType = SamuraiResponse<{ }>
        return ax.delete<ResponseType>(`auth/login`)
    }
}