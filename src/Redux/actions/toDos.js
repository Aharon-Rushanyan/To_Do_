import * as type from '../types';

// Get All
export function getToDos() {
  return {
    type: type.GET_TODO_REQUESTED,
  }
}

// Add to do
export function addToDo(todo) {
  return {
    type: type.ADD_TODO_REQUESTED,
    payload: todo,
  }
}

//remove to do
export function removeToDo(id) {
  return {
    type: type.REMOVE_TODO_REQUESTED,
    payload: id,
  }
}

//    update to do
export function UpdateToDo(todo) {
  return {
    type: type.UPDATE_TODO_REQUESTED,
    payload: todo,
  }
}

//    delete all to do
export function DeleteAllToDo(todo) {
  return {
    type: type.DELETE_ALL_TODO_REQUESTED,
    payload: todo,
  }
}
