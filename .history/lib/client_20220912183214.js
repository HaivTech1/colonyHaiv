import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuth } from '../utils/useAuth'

export const accessToken = Cookies.get('app_accessToken')

export default function client() {


  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  client.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {

        return Promise.reject({status: 401, errors: ['Unauthorized']})
    }

    // if (error.response?.status === 422) {
    //     let errors = Object.values(error?.response?.data?.errors || {})

    //     return Promise.reject({status: 422, errorsRaw: errors, errors: errors.reduce(error => error)})
    // }
    return Promise.reject({status: error.response?.status, errors: ['Oops!']})
  });

  return client
}
