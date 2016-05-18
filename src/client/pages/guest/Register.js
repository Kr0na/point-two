/**@flow*/
import React, {Component} from 'react'
import {compose, observeChange, listen} from 'point-one'
import type {State, User} from '../../../types'

type LoginState = State.auth

class Register extends Component {
  state: LoginState;

  onIdentityChange(identity: User) {
    if (identity) {
      console.log('sfdsdf')
    }
  }

  render():React$Element {
    let error = ""
    if (this.state.error) {
      error = <div className="error">
        {this.state.error}
      </div>
    }

    return (
      <div className="register-page">
        <form>
          <p>asasffsad</p>
          Register page 2
        </form>
      </div>
    )
  }
}

export default compose(
  listen(state => state.auth)
)(Register)
