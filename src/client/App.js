/**@flow*/
import React, {Component} from 'react'
import {Router, browserHistory} from 'react-router'
import Provider from './Provider'
import type {Store} from '../types'

export default function Root(props:{store:Store, routes:Array<React$Element>}):React$Element {
  const store = props.store
  return <Provider store={store}>
    <Router history={browserHistory}>
      {props.routes}
    </Router>
  </Provider>
}
