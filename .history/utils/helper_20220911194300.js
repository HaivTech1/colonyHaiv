import Cookies from 'js-cookie'
import cookie from 'cookie'

import client from '../lib/client'


export const sendError = (res, error, status = 401) => {
  res.sendStatus(status).json({ success: false, error })
}


export const price = (num) => {
  (Math.round(num * 100) / 100).toFixed(2)
  return num;
};