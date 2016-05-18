/**@flow*/
import React, {Component} from 'react'

export default class Provider extends Component {

  static childContextTypes = {
    store: React.PropTypes.any,
    dispatch: React.PropTypes.any
  };

  getChildContext(): {store: Store, dispatch: Function} {
    return {
      store: this.props.store,
      dispatch: this.props.store.dispatch
    }
  }

  render() {
    return this.props.children
  }
}
