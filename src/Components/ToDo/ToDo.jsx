import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToDos, DeleteAllToDo } from '../../Redux/actions/toDos';
import ReactLoading from 'react-loading'

import Element from '../Element/Element';

import NewElement from '../NewElement/NewElement'
import Button from '../FormElements/Button/Button'

import './ToDo.scss'

const ToDo = () => {

  const dispatch = useDispatch();

  const todos = useSelector(state => state.toDos.toDos);
  const loading = useSelector(state => state.toDos.loading);
  const loadingADD = useSelector(state => state.toDos.loadingADD);

  const [isOpen, setIsOpen] = useState(false)

  const onDeleteAll = () => {
    dispatch(DeleteAllToDo(todos));
  }

  useEffect(() => {
    dispatch(getToDos());
  }, [dispatch])


  return (
    <div className='ToDo'>
      <div className='Page-Name'>
        My To Do List
      </div>
      {
        isOpen ?
          <NewElement setIsOpen={setIsOpen} />
          :
          <Button
            className="Add-New"
            size="sm"
            onClick={() => setIsOpen(true)}
            disabled={loadingADD}
            color="lightBlue"
          >
            Add New
        </Button>
      }
      <div className="Elements">
        {
          !loading ?
            <>
              {
                todos.length > 0 && todos.map((todo) => (
                  <Element key={todo._id} todo={todo} />
                ))
              }
              {
                todos.length === 0 && <p>There Is No To Do !</p>
              }
              {
                loadingADD &&
                <ReactLoading className="Loading-Add" type="spin" color="black" height={30} width={30} />
              }
            </>
            :
            <ReactLoading className="Loading-Main" type="spin" color="black" height={50} width={50} />
        }
      </div>
      {
        todos.length > 0 && !loading &&
        <Button
          size="sm"
          data-toggle="modal"
          data-target="#myModalQuestion"
          color="red"
        >
          Delete All
        </Button>
      }

      <div className="modal fade" id="myModalQuestion" role="dialog">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <p>Do you want to delete all items?</p>
            </div>
            <div className="modal-footer">

              <Button
                size="sm"
                color="lightBlue"
                data-dismiss="modal"
              >
                No
              </Button>
              <Button
                size="sm"
                onClick={onDeleteAll}
                color="lightBlue"
                data-dismiss="modal"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div >
  )
}

export default ToDo;