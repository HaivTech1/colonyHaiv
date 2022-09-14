import axios from 'axios'
import Cookies from 'js-cookie'


const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
})

export default client
