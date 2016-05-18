/**@flow*/
import React, {Component} from 'react'

type Props = {
  id: number;
  value: string;
  status: ?string;
  onDone: Function;
  onDelete: Function;
  onUpdate: Function;
}

type State = {
  editMode: bool;
}

export default class TodoItem extends Component<void, Props, State> {
  state: State;

  constructor(...opts: Array<any>) {
    super(...opts)
    this.state = {
      editMode: false
    }
  }

  render(): React$Element {
    const {
      value,
      status,
      onDone,
      onDelete,
      onUpdate
    } = this.props
    const {editMode} = this.state
    return (
      <li className={`${status == 'done' ? 'completed': ''} ${editMode ? 'editing': '' }`}>
        <div className="view">
          <input className="toggle" checked={status == 'done'} type="checkbox" onChange={onDone}/>
          {editMode ? null
            : <label onDoubleClick={e => this.setState({editMode: true})}>{value}</label>
          }
          <button className="destroy" onClick={onDelete}></button>
        </div>
        <input type="text" defaultValue={value} onBlur={e => onUpdate(e.target.value) && this.setState({editMode: false})} className="edit" />
      </li>
    )
  }
}
