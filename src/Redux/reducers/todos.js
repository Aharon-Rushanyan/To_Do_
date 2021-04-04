import * as type from '../types';

const initialState = {
  toDos: [],
}

export default function users(state = initialState, action) {
  switch (action.type) {

    //    get to do

    case type.GET_TODO_REQUESTED:
      return {
        ...state,
        loading: true,
      }

    case type.GET_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        toDos: action.todos
      }

    case type.GET_TODO_FAILED:
      return {
        ...state,
        loading: false,
      }

    //    add to do

    case type.ADD_TODO_REQUESTED:
      return {
        ...state,
        loadingADD: true,
      }

    case type.ADD_TODO_SUCCESS:
      return {
        ...state,
        toDos: [...state.toDos, action.todos],
        loadingADD: false,
      }

      case type.ADD_TODO_FAILED:
        return {
          ...state,
          loadingADD: false,
        }
  

    //    remove to do

    case type.REMOVE_TODO_REQUESTED:
      return {
        ...state,
      }

    case type.REMOVE_TODO_SUCCESS:
      const temp = state.toDos.filter(todo => todo._id !== action.id);
      return {
        ...state,
        loadingId: false,
        toDos: [...temp]
      }

    case type.REMOVE_TODO_FAILED:
      return {
        ...state,
        loadingId: false,
      }


    // Update to do

    case type.UPDATE_TODO_REQUESTED:
      return {
        ...state,
      }

    case type.UPDATE_TODO_SUCCESS:
      const newToDo = state.toDos.map((todo) => {
        if (todo._id === action.todo._id) {
          return {
            title: action.todo.title,
            _id: action.todo._id,
            description: action.todo.description,
            color: action.todo.color,
          }
        } else {
          return todo
        }
      })

      return {
        ...state,
        loadingId: false,
        toDos: newToDo
      }

    case type.UPDATE_TODO_FAILED:
      return {
        ...state,
        loadingId: false,
      }


    //    delete all

    case type.DELETE_ALL_TODO_REQUESTED:
      return {
        ...state,
      }

    case type.DELETE_ALL_TODO_SUCCESS:
      return {
        ...state,
        toDos: []
      }


    //    loadings

    case type.SET_LOADING_ID:
      return {
        ...state,
        loadingId: action.id,
      }

    default:
      return state
  }
}