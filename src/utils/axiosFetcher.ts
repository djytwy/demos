import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com', 
    timeout: 10000,                      
    headers: { 'X-Custom-Header': 'foobar' }
}); 

export const fetcher = async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.get<T>(url);
    return response.data
}