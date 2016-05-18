/**@flow*/
import {createStore, compose} from 'point-one'
import Reducer from '../reducer/index'
import {reduxConverter} from 'point-one/lib/redux/reduxConverter'
import {restoreListen} from 'point-one/lib/redux/restoreListen'
import {syncReduxAndRouter} from 'point-simple-router'
import type {State, Store, PointReducer} from '../types'

export function configureStore(state: Object = {}, history: ?Object): Store {
  if (typeof window == 'undefined') {
    return createStore(Reducer, state)
  }
  const store = createStore(
    Reducer,
    state,
    compose(
      restoreListen,
      window.devToolsExtension ? window.devToolsExtension(): next => next,
      reduxConverter
    )
  )

  syncReduxAndRouter(history, store)

  if (module.hot) {
    module.hot.accept('../reducer', () => {
      console.log('Updated reducer')
      const newReducer = require('../reducer/index').default
      //For situations w/t reduxConverter included
      store.replaceReducer ? store.replaceReducer(newReducer) : store.dangerously.replaceReducer(newReducer, true)
    })
  }

  return store
}
