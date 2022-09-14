import axios from 'axios'
import { useCookies } from 'react-cookie';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

export default client


const accessToke = Cookies.get('amenities')
export const accessToken = cookie.app_accessToken;

console.log(accessToken);

export const authClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
    authorization: `Bearer ${accessToken}`,
    },
})
