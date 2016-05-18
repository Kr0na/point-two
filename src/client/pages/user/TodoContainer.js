/**@flow*/
import React, {Component} from 'react'
import {listen, compose, bindActions} from 'point-one'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import {doneTodo, reopenTodo, deleteTodo, updateTodo, createTodo} from '../../actions/todo'
import type {Todo} from '../../../types'

type State = {
  todo: Array<Todo>
}

type Actions = {
  createTodo: typeof createTodo,
  doneTodo: typeof doneTodo,
  reopenTodo: typeof reopenTodo,
  deleteTodo: typeof deleteTodo,
  updateTodo: typeof updateTodo
}

class TodoContainer extends Component {
  actions: Actions;
  state: State;

  render(): React$Element {
    const
      {todo} = this.state
    return (
      <div className="container-fluid">
        <header className="header">
          <h1>Todos</h1>
          <TodoForm createTodo={value => this.actions.createTodo(value)} />
        </header>
        <section className="main">
          <ul className="todo-list">
            {todo.map(item => (
              <TodoItem
                onDone={e => item.status == 'done' ? this.actions.reopenTodo(item.id) : this.actions.doneTodo(item.id)}
                onDelete={e => this.actions.deleteTodo(item.id)}
                onUpdate={value => this.actions.updateTodo(item.id, value)}
                key={item.id}
                {...item}
              />
            ))}
          </ul>
        </section>
        <footer className="footer">
        </footer>
      </div>
    )
  }
}

export default compose(
  bindActions({doneTodo, reopenTodo, deleteTodo, updateTodo, createTodo}),
  listen(({todo}) => ({todo}))
)(TodoContainer)
