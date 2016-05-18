/**@flow*/
import React, {Component} from 'react'

export default class Layout extends Component {

  render() {
    return (
      <div className="some">
        {this.props.children}
      </div>
    )
  }
}
