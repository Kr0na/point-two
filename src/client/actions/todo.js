/**@flow*/
import {TODO_CREATE, TODO_DONE, TODO_DELETE, TODO_REOPEN, TODO_UPDATE} from '../../constants'

export function createTodo(value: string) {
  return {
    type: TODO_CREATE,
    value
  }
}

export function doneTodo(id: number) {
  return {
    type: TODO_DONE,
    id
  }
}

export function reopenTodo(id: number) {
  return {
    type: TODO_REOPEN,
    id
  }
}

export function deleteTodo(id: number) {
  return {
    type: TODO_DELETE,
    id
  }
}

export function updateTodo(id: number, value: string) {
  return {
    type: TODO_UPDATE,
    id,
    value
  }
}
