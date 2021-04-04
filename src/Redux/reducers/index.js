import { combineReducers } from 'redux';
import toDos from './todos';

const rootReducer = combineReducers({
  toDos: toDos,
});

export default rootReducer;