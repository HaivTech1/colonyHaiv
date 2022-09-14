import axios from 'axios'
import Cookies from 'js-cookie'


const client = axios.create({
const accessToken = Cookies.get('app_accessToken')
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
})

export default client
