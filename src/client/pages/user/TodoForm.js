/**@flow*/
import React, {Component} from 'react'

type Props = {
  createTodo: (value: string) => any;
}

export default class TodoForm extends Component {
  props: Props;

  createTodo(e: SyntheticKeyboardEvent): void {
    const {createTodo} = this.props
    if (e.keyCode == 13 && this.refs.input.value.trim().length > 1) {
      createTodo(this.refs.input.value)
      this.refs.input.value = ""
    }
  }

  render(): React$Element {
    return (
      <input className="new-todo" ref="input" onKeyUp={e => this.createTodo(e)} placeholder="What needs to be done?"/>
    )
  }
}
