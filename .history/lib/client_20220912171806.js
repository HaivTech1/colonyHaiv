import axios from 'axios'
import Cookies from 'js-cookie'

export const accessToken = Cookies.get('app_accessToken')

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
})

export default client
