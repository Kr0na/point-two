/**@flow*/
import {concatReducers} from 'point-one'
import {routeReducer as routing} from 'point-simple-router'
import auth from './auth'
import todo from './todo'

export default concatReducers({
  routing,
  auth,
  todo
})
