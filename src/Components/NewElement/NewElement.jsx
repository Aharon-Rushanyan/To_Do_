import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToDo } from '../../Redux/actions/toDos';


import Textarea from '../FormElements/Textarea/Textarea'
import Button from '../FormElements/Button/Button'
import Input from '../FormElements/Input/Input'

import './NewElement.scss'

const NewToDo = ({ setIsOpen }) => {

  const dispatch = useDispatch();

  const [titleInput, setTitleInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [colorInput, setColorInput] = useState('')
  const [disabled, setDisabled] = useState(true)

  const onColorChange = event => {
    setColorInput(event.target.value)
  }

  const onTitleChange = event => {
    setTitleInput(event.target.value)
  }

  const onDescriptionChange = event => {
    setDescriptionInput(event.target.value)
  }

  const goToStart = () => {
    setColorInput('')
    setTitleInput('')
    setDescriptionInput('')
  }

  const onSave = () => {
    setIsOpen(false)
    dispatch(addToDo({
      title: titleInput,
      description: descriptionInput,
      color: colorInput
    }));
    goToStart()
  }

  useEffect(() => {
    if (titleInput && descriptionInput && colorInput) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [titleInput, descriptionInput, colorInput])

  return (
    <div className="NewElement">

      <div>Add New To Do</div>

      <Input
        name="title"
        value={titleInput}
        onChange={onTitleChange}
        placeholder="Title"
      />

      <Textarea
        placeholder="Description"
        size={'sm'}
        maxLength={1000}
        value={descriptionInput}
        onChange={onDescriptionChange}
      />

      <Input
        name="color"
        value={colorInput}
        onChange={onColorChange}
        placeholder="Color"
      />

      <div className="Buttons">
        <Button
          size="sm"
          onClick={() => setIsOpen(false)}
          color="lightBlue"
        >
          Cancel
        </Button>

        <Button
          size="sm"
          onClick={onSave}
          color="lightBlue"
          disabled={disabled}
        >
          Save
        </Button>
      </div>
    </div>

  )
}

export default NewToDo;