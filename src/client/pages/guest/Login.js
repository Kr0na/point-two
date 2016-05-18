/**@flow*/
import React, {Component} from 'react'
import {pushPath} from 'point-simple-router'
import {compose, observeChange, listen, bindActions} from 'point-one'
import {auth} from '../../actions/auth'
import type {State, User} from '../../../types'

type LoginState = State.auth
type Actions = {
  auth: (data: {login: string, password: string}) => any,
  pushPath: (path: string) => any
}

class Login extends Component {
  state: LoginState;
  actions: Actions;

  onIdentityChange(identity: User) {
    if (identity) {
      this.actions.pushPath('/')
    }
  }

  onLogin(e: Event) {
    e.preventDefault()
    this.actions.auth({
      login: this.refs.login.value,
      password: this.refs.password.value
    })
  }

  render():React$Element {
    let error = ""
    if (this.state.error) {
      error = <div className="alert alert-warning">
        {this.state.error}
      </div>
    }

    return (
      <div className="container-fluid login-page">
        <header className="header">
          <h1>Todo</h1>
          <h3>Login</h3>
        </header>
        <form onSubmit={e => this.onLogin(e)}>
          <section className="main">
            {error}
            <div className="form-group">
              <label>Login</label>
              <input ref="login" type="text" className="form-control" placeholder="Login..." />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input ref="password" type="password" className="form-control" placeholder="Password..."/>
            </div>
          </section>
          <footer className="footer">
            <button style={{marginBottom: 10}} type="submit" className="clear-completed">Login</button>
          </footer>
        </form>
      </div>
    )
  }
}

export default compose(
  bindActions({auth, pushPath}),
  observeChange(['identity']),
  listen(state => state.auth)
)(Login)
