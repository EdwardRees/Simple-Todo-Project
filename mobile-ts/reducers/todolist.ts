import {
  GET_TODO_LISTS,
  ADD_TODO_LIST,
  UPDATE_TODO_LIST,
  REMOVE_TODO_LIST,
} from "../actions/types";

const initialState = {
  todoLists: [],
  loading: true,
  error: {},
};

const todoListReducer = (state: any = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TODO_LISTS:
      return {
        ...state,
        todoLists: payload,
        loading: false,
      };
    case ADD_TODO_LIST:
      return {
        ...state,
        todoLists: [payload, ...state.todoLists],
        loading: false,
      };
    case UPDATE_TODO_LIST:
      return {
        ...state,
        todoLists: state.todoLists.map((todoList) => {
          if (todoList.id === payload.id) {
            return payload;
          }
          return todoList;
        }),
        loading: false,
      };
    case REMOVE_TODO_LIST:
      return {
        ...state,
        todoLists: state.todoLists.filter(
          (todoList: any) => todoList.id !== payload
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export default todoListReducer;
