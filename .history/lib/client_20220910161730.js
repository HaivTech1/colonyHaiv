import axios from 'axios'

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

export default client


const [cookie, setCookie] = useCookies(['app_accessToken'])
export const accessToken = cookie.app_accessToken;

console.log(accessToken);

export default function api() {
    const authClient = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
        authorization: `Bearer ${accessToken}`,
        },
    })

}