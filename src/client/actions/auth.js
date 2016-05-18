/**@flow*/
import {AUTH_SUCCESS, AUTH_FAIL} from '../../constants'

export function auth(data: Object) {
  if (data.login == 'admin' && data.password == 'admin') {
    return {
      type: AUTH_SUCCESS,
      data: {
        id: 1,
        login: 'admin'
      },
      token: {
        token: 'asdfaf'
      }
    }
  } else {
    return {
      type: AUTH_FAIL,
      message: 'Check your credentials'
    }
  }
}
