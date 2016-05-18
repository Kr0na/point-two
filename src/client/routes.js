/**@flow*/
import React from 'react'
import {Route, IndexRoute, Redirect} from 'react-router'
import {pushPath} from 'point-simple-router'
import type {Store} from '../types'
import Register from './pages/guest/Register'
import Login from './pages/guest/Login'
import Layout from './pages/user/Layout'
import TodoContainer from './pages/user/TodoContainer'

export function configureRoutes(store: Store): Array<React$Element> {
  const redirect = global
    ? (nextState, transition, callback) => {transition('/login'), callback()}
    : () => store.dispatch(pushPath('/login'))

  const isAuthenticated = () => !!store.getState().auth.identity
  const auth = (params, transition, callback) => {
    isAuthenticated() ? callback() : redirect(params, transition, callback)
  }

  return [
    <Route key={0} path="/" onEnter={auth} component={Layout}>
      <IndexRoute component={TodoContainer} />
      <Route path="/unsafe" component={TodoContainer} />
    </Route>,
    <Route key={1}>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Route>
  ]
}
