/**@flow*/
import React from 'react'
import {render} from 'react-dom'
import {browserHistory} from 'react-router'
import {configureStore} from '../store/configureStore'
import {configureRoutes} from './routes'
import { AppContainer } from 'react-hot-loader'
import Root from './App'

const store = configureStore(window.__INITIAL_STATE__ || {}, browserHistory)
let routes = configureRoutes(store)

if (module.hot)
  module.hot.accept()
render(
  <AppContainer>
    <Root store={store} routes={routes}/>
  </AppContainer>,
  document.getElementById('wrapper')
)
// if (module.hot) {
//   module.hot.accept('./App', () => {
//     const NewComponent = require('./App').default
//     render(
//       <AppContainer>
//         <NewComponent store={store} routes={routes}/>
//       </AppContainer>
//     , document.getElementById('wrapper'))
//   })
// }
