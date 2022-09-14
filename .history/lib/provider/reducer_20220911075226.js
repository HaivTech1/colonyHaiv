import Cookies from 'js-cookie'
import { useCookies } from 'react-cookie'

export const initialState = {
  amenities: Cookies.get('amenities') ? JSON.parse(Cookies.get('amenities')) : [],
  furnish: Cookies.get('furnish') ? JSON.parse(Cookies.get('furnish')) : [],
  paymentMethod: Cookies.get('paymentMethod') ? Cookies.get('paymentMethod') : '',
}

const Reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'ADD_AMENITIES':
      console.log('ADD_AMENITIES', payload.amenities)
      Cookies.set('amenities', JSON.stringify(payload.amenities), {
        path: '/',
        expires: 1 / 48,
        sameSite: true,
      })
      return {
        ...state,
        amenities: payload.amenities,
      }
    case 'ADD_FURNISH':
      console.log('ADD_FURNISH', payload.furnish)
      Cookies.set('furnish', JSON.stringify(payload.furnish), {
        path: '/',
        expires: 1 / 48,
        sameSite: true,
      })
      return {
        ...state,
        furnish: payload.furnish,
      }
    case 'SAVE_PAYMENT_METHOD':
      console.log('SAVE_PAYMENT_METHOD', payload.paymentMethod)
      Cookies.set('paymentMethod', payload.paymentMethod)
      return {
        ...state,
        paymentMethod: payload.paymentMethod,
      }
    case 'BOOKING_CLEAR':
      Cookies.remove('amenities')
      Cookies.remove('furnish')
      Cookies.remove('paymentMethod')
      return {
        ...state,
        amenities: [],
        furnish: [],
        paymentMethod: ''
      }
    default:
      throw new Error(`No case for type ${type} found in Reducer.`)
  }
}

export default Reducer
