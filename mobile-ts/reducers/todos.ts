import {
  GET_TODO_LIST,
  ADD_TODO_ITEM,
  REMOVE_TODO_ITEM,
  COMPLETE_TODO_ITEM,
  UPDATE_TODO_ITEM,
} from "../actions/types";

const initialState = {
  todoList: {
    id: "",
    title: "",
    todoItems: [],
  },
  loading: true,
  error: {},
};

const todosReducer = (state: any = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TODO_LIST:
      return {
        ...state,
        todoList: payload,
        loading: false,
      };
    case ADD_TODO_ITEM:
      return {
        ...state,
        todoList: {
          ...state.todoList,
          todoItems: [payload, ...state.todoList.todoItems],
        },
        loading: false,
      };
    case REMOVE_TODO_ITEM:
      return {
        ...state,
        todoList: {
          ...state.todoList,
          todoItems: state.todoList.todoItems.filter(
            (item: any) => item.id !== payload
          ),
        },
        loading: false,
      };
    case COMPLETE_TODO_ITEM:
      return {
        ...state,
        todoList: {
          ...state.todoList,
          todoItems: state.todoList.todoItems.map((item: any) => {
            if (item.id === payload.id) {
              return {
                ...item,
                complete: !item.complete,
              };
            }
            return item;
          }),
        },
        loading: false,
      };
    case UPDATE_TODO_ITEM:
      return {
        ...state,
        todoList: {
          ...state.todoList,
          todoItems: state.todoList.todoItems.map((item: any) => {
            if (item.id === payload.id) {
              return payload;
            }
            return item;
          }),
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default todosReducer;
