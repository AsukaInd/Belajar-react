import axios from 'axios'

export const baseURL = "https://internal.inspxt.com"

export const axiosInstance = axios.create({
    baseURL: `${baseURL}/api/v1`,
    withCredentials: process.env.DEV === false,
});