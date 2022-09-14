import axios from 'axios'
import Cookies from 'js-cookie'


const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

export default client

export const accessToken = Cookies.get('app_accessToken');
console.log(accessToken);

export const authClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
    authorization: `Bearer ${accessToken}`,
    },
})
