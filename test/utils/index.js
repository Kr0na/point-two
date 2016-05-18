/**@flow*/
import type {GetState, PointDispatch, PointReducer, PointListen, Store, State, PointAction, ThunkAction} from '../../src/types'
export function waitStore(store: Store, ...actions: Array<PointAction|ThunkAction>): Promise<State> {
  return new Promise(resolve => {
    function tick(action: PointAction | ThunkAction, ...actions: Array<PointAction|ThunkAction>): void {
      const unsubscribe = store.listen(state => {
        unsubscribe()
        if (actions.length) {
          tick(...actions)
        } else {
          resolve(state)
        }
      })
      store.dispatch(action)
    }
    tick(...actions)
  })
}

export function makeMock(object: Object, methodName: string, result: Function|any, promisify:bool = false): Function {
  const original = object[methodName]
  if (typeof result == 'function') {
    object[methodName] = result
  } else {
    object[methodName] = () => promisify ? Promise.resolve(result) : result
  }
  return () => object[methodName] = original
}

export type TestStore = {
  getState: GetState;
  dispatch: PointDispatch;
  listen: PointListen;
  dangerously: {
    replaceReducer: (reducer:PointReducer, safe:bool) => void
  };
  eventDispatched: (eventName: string) => bool;
  eventDispatchedTimes: (eventName: string, times: number) => bool;
  wait: (...actions: Array<PointAction|ThunkAction>) => Promise<State>;
};

export function wrapStore(store: Store): TestStore {
  let events = {}
  function dispatch(event: PointAction | ThunkAction): any {
    if (typeof event == 'function') {
      event(dispatch, store.getState)
    } else {
      if (events.hasOwnProperty(event.type)) {
        events[event.type]++
      } else {
        events[event.type] = 1
      }
      store.dispatch(event)
    }
  }
  return {
    ...store,
    dispatch,
    eventDispatched(eventName: string): bool {
      return events.hasOwnProperty(eventName)
    },
    eventDispatchedTimes(eventName: string, times: number): bool {
      return events.hasOwnProperty(eventName) && events[eventName] == times
    },
    wait(...actions: Array<PointAction|ThunkAction>): Promise<State> {
      return waitStore(store, ...actions)
    }
  }
}
