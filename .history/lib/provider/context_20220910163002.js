import axios from 'axios'
import React, { useContext, useReducer, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import Reducer, { initialState } from './reducer'


// create new context
const Context = React.createContext({})

export default function DashboardProvider({ children }) {
  const [user, setUser] = useState([]);
  const [cookie, setCookie] = useCookies(['app_accessToken'])
  const accessToken = cookie.app_accessToken;

  const [state, dispatch] = useReducer(Reducer, initialState)


  // console.log(accessToken.app_accessToken);

  const authClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  const loggedInUser = async () => {
    await authClient.get('/auth/profile')
      .then(response => {
        console.log(response.data.data)
        setUser(response.data.data)
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    loggedInUser();
  }, []);

  const addPaymentMethod = (paymentType) => {
    const updateData = paymentType

    dispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: {
        paymentMethod: updateData,
      },
    })
  }

  const addAmenities = (amenities) => {
    // console.log(amenities)

    dispatch({
      type: 'ADD_AMENITIES',
      payload: {
        amenities: amenities,
      },
    })
  }

  const addFurnish = (furnish) => {
    const updateData = furnish
    dispatch({
      type: 'ADD_FURNISH',
      payload: {
        furnish: updateData,
      },
    })
  }

  const booking = async() => {
    await client.post({
      property_uuid: id,
      amenities,
      furnish,
      author: user.id,
    }).then((response) => {
      console.log(response);
      toast.success(response.data.message);
    }).catch((error) => {
      setIsLoading(false)
      toast.error(error)
  }

  const value = {
    user,
    amenities: state.amenities,
    furnish: state.furnish,
    addFurnish,
    addAmenities,
    booking
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useAdmin = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useAdmin must be used within Context')
  }

  return context
}
