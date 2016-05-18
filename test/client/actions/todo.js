/**@flow*/
import {assert} from 'chai'
import {configureStore} from '../../../src/store/configureStore'
import {wrapStore} from '../../utils/index'
import {createTodo, doneTodo, reopenTodo, updateTodo, deleteTodo} from '../../../src/client/actions/todo'

describe('Client', () => {
  describe('Action', () => {
    describe('todo', () => {
      it('should create todo', () => {
        const store = wrapStore(configureStore())
        return store.wait(createTodo('some')).then(state => {
          assert.deepPropertyVal(state, 'todo[0].value', 'some')
          assert.deepProperty(state, 'todo[0].id')
        })
      })

      it('should update and done todo', () => {
        const store = wrapStore(configureStore())
        return store.wait(createTodo('some'))
          .then(state => state.todo[0].id)
          .then(id => store.wait(doneTodo(id), updateTodo(id, 'newValue')))
          .then(state => {
            assert.deepPropertyVal(state, 'todo[0].value', 'newValue')
            assert.deepPropertyVal(state, 'todo[0].status', 'done')
          })
      })

      it('should reopen todo', () => {
        const store = wrapStore(configureStore())
        return store.wait(createTodo('some'))
          .then(state => state.todo[0].id)
          .then(id => store.wait(reopenTodo(id)))
          .then(state => {
            assert.deepPropertyVal(state, 'todo[0].value', 'some')
            assert.deepPropertyVal(state, 'todo[0].status', 'reopen')
          })
      })

      it('should delete todo', () => {
        const store = wrapStore(configureStore())
        return store.wait(createTodo('some'))
          .then(state => state.todo[0].id)
          .then(id => store.wait(deleteTodo(id)))
          .then(state => {
            assert.lengthOf(state.todo, 0)
          })
      })
    })
  })
})
