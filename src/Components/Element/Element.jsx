import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../FormElements/Input/Input'
import RemoveIcon from '../FormElements/Icons/remove.svg'
import EditIcon from '../FormElements/Icons/edit.svg'
import SaveIcon from '../FormElements/Icons/save.svg'
import CancelIcon from '../FormElements/Icons/cancel3.svg'
import Textarea from '../FormElements/Textarea/Textarea'
import ReactLoading from 'react-loading'

import { removeToDo, UpdateToDo } from '../../Redux/actions/toDos';

import './Element.scss'

const Element = (props) => {

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false)
  const [titleInput, setTitleInput] = useState(props.todo.title)
  const [descriptionInput, setDescriptionInput] = useState(props.todo.description)
  const [colorInput, setColorInput] = useState(props.todo.color)
  const [editable, seteditable] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const loading = useSelector(state => state.toDos.loadingId);
  useEffect(() => {
    if ((titleInput !== props.todo.title ||
      descriptionInput !== props.todo.description ||
      colorInput !== props.todo.color) &&
      (titleInput && descriptionInput && colorInput)) {
      seteditable(true)
    } else {
      seteditable(false)
    }
  }, [
    titleInput,
    descriptionInput,
    colorInput,
    editable,
    showMessage,
    props.todo.title,
    props.todo.description,
    props.todo.color
  ])


  const onColorChange = event => {
    setColorInput(event.target.value)
    setShowMessage(false)
  }

  const onTitleChange = event => {
    setTitleInput(event.target.value)
    setShowMessage(false)
  }

  const onDescriptionChange = event => {
    setDescriptionInput(event.target.value)
    setShowMessage(false)
  }


  const onRemove = () => {
    dispatch(removeToDo(props.todo._id));
  }

  const onEdit = () => {
    setShowMessage(false)
    setIsEdit(!isEdit)
  }

  const onSave = () => {
    if (editable) {
      setShowMessage(false)

      const data = {
        id: props.todo._id,
        title: titleInput,
        description: descriptionInput,
        color: colorInput,
      }

      setIsEdit(!isEdit)
      dispatch(UpdateToDo(data));
      seteditable(false)

    } else {
      setShowMessage(true)
    }
  }

  return (
    <div className={`Element ${showMessage ? 'Error' : ''}`} style={{ borderLeft: `5px solid ${props.todo.color}` }}>
      <div className="Element-row">
        {!isEdit ?
          <div className="Element-column">
            <div className="Element-text-1">{props.todo.title}</div>
            <div className="Element-row">
              <span className="Element-text-2">{props.todo.description}</span>
            </div>
          </div>
          :
          <div className="Element-column">
            {showMessage && <div className="Element-text-Error">Nothing changed or empty field</div>}
            <Input
              value={titleInput}
              onChange={onTitleChange}
            />

            <div className="Element-column">

              <Textarea
                size={'sm'}
                maxLength={1000}
                value={descriptionInput}
                onChange={onDescriptionChange}
              />

              <Input
                style={{ color: colorInput }}
                value={colorInput}
                onChange={onColorChange}
              />
            </div>
          </div>
        }

        <div className="icons">
          {loading !== props.todo._id ?
            <> {!isEdit ?
              <>
                <img className="icon" onClick={onEdit} src={EditIcon} alt="edit"></img>
                <img className="icon" onClick={onRemove} src={RemoveIcon} alt="remove"></img>
              </>
              :
              <>
                <img className="icon" onClick={onSave} src={SaveIcon} alt="Save"></img>
                <img className="icon" onClick={onEdit} src={CancelIcon} alt="Cancel"></img>
              </>
            }
            </>
            :
            <ReactLoading type="spin" color="black" height={20} width={24} />
          }
        </div>
      </div>
    </div>
  )
}
export default Element