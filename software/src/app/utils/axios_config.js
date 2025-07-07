import axios from 'axios';

//const NEXT_PUBLIC_MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI

export const axiosInstance = axios.create({
    baseURL: `https://energy-drive.vercel.app`,
});