import { combineReducers } from "redux";
import todolist from "./todolist";
import todos from './todos';

export default combineReducers({
  todolist,
  todos
});
