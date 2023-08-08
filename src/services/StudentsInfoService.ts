import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios' 
import type { studentInfo } from '@/info'

const apiClient : AxiosInstance = axios.create({
    baseURL: 'https://dv-student-backend-2019.appspot.com',
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{
    getStudent(): Promise<AxiosResponse<studentInfo[]>>{
        return apiClient.get<studentInfo[]> ('/students')
    }
}