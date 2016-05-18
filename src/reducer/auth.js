/**@flow*/
import {concatReducers} from 'point-one'
import {events, event, init, value, project, set} from 'point-reducer-builder'
import {AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT} from '../constants'

const setNull = () => null

const identity = events(
  event(AUTH_SUCCESS, value('data')),
  event(/AUTH/, setNull),
  init(null)
)

const error = events(
  event(AUTH_FAIL, value('message')),
  event(/AUTH/, setNull),
  init(null)
)

const token = events(
  event(AUTH_SUCCESS, project(e => e.token, value('token'))),
  event(/AUTH/, setNull),
  init(null)
)

export default concatReducers({
  identity,
  token,
  error
})
