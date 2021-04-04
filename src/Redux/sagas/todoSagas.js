import { call, put, takeEvery } from 'redux-saga/effects'
import API_URL from "../../utils/ApiEndpoints"
import Notification from '../../Components/Notification/Notification'
import {
  getForResponse,
  postForResponse,
  deleteForResponse,
  patchForResponse,
  deleteAllForResponse
} from '../../services/Api'

//          Get all To Do


function* fetchTodo() {
  const request = getForResponse(API_URL.GET_TO_DO, '');
  const response = yield call(request)
  const { data, status } = response

  switch (status) {
    case 'success':
      yield put({ type: 'GET_TODO_SUCCESS', todos: data });
      break
    case 'failed':
      yield put({ type: 'GET_TODO_FAILED' });
      Notification(status, data.message)
      break
    default:
      break
  }
}

//          add to do


function* addTodo(action) {
  const request = postForResponse(API_URL.ADD_TO_DO, action.payload);
  const response = yield call(request)
  const { data, status } = response

  switch (status) {
    case 'success':
      yield put({ type: 'ADD_TODO_SUCCESS', todos: data });
      break
    case 'failed':
      Notification(status, data.message)
      break
    default:
      break
  }
}

//          remove to do


function* removeTodo(action) {
  yield put({ type: 'SET_LOADING_ID', id: action.payload });
  const request = deleteForResponse(API_URL.REMOVE_TO_DO.replace(':todoId', action.payload));
  const response = yield call(request)
  const { data, status } = response

  switch (status) {
    case 'success':
      yield put({ type: 'REMOVE_TODO_SUCCESS', id: action.payload });
      break
    case 'failed':
      yield put({ type: 'REMOVE_TODO_FAILED' });
      Notification(status, data.message)
      break
    default:
      break
  }
}

//          Update to do


function* updateTodo(action) {
  yield put({ type: 'SET_LOADING_ID', id: action.payload.id });

  const { title, description, color, id } = action.payload
  const sendData = {
    title,
    description,
    color,
  }
  const request = patchForResponse(API_URL.UPDATE_TO_DO.replace(':todoId', id), sendData);
  const response = yield call(request)
  const { data, status } = response

  switch (status) {
    case 'success':
      yield put({ type: 'UPDATE_TODO_SUCCESS', todo: data });
      break
    case 'failed':
      yield put({ type: 'UPDATE_TODO_FAILED' });
      Notification(status, data.message)
      break
    default:
      break
  }

}
//          delete all


function* deleteAllTodo(action) {
  const request = deleteAllForResponse(API_URL.REMOVE_TO_DO, action.payload);
  const response = yield call(request)
  const { data, status } = response

  switch (status) {
    case 'success':
      yield put({ type: 'DELETE_ALL_TODO_SUCCESS' });
      break
    case 'failed':
      Notification(status, data.message)
      break
    default:
      break
  }
}


function* todoSaga() {
  yield takeEvery('GET_TODO_REQUESTED', fetchTodo);
  yield takeEvery('ADD_TODO_REQUESTED', addTodo);
  yield takeEvery('REMOVE_TODO_REQUESTED', removeTodo);
  yield takeEvery('UPDATE_TODO_REQUESTED', updateTodo);
  yield takeEvery('DELETE_ALL_TODO_REQUESTED', deleteAllTodo);
}

export default todoSaga;