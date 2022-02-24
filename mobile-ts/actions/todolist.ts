import { api } from "../util";
import {
  GET_TODO_LISTS,
  GET_TODO_LISTS_ERROR,
  ADD_TODO_LIST,
  ADD_TODO_LIST_ERROR,
  UPDATE_TODO_LIST,
  UPDATE_TODO_LIST_ERROR,
  REMOVE_TODO_LIST,
  REMOVE_TODO_LIST_ERROR,
} from "./types";

export const getTodoLists = () => async (dispatch: any) => {
  try {
    const res = await api.get("/todos", {});
    dispatch({ type: GET_TODO_LISTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_TODO_LISTS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addTodoList = (title: string) => async (dispatch: any) => {
  try {
    const res = await api.post("/todos", { title });
    dispatch({ type: ADD_TODO_LIST, payload: res.data });
  } catch (err) {
    dispatch({
      type: ADD_TODO_LIST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const updateTodoList =
  (id: string, title: string) => async (dispatch: any) => {
    try {
      const res = await api.put(`/todos/${id}`, { title });
      dispatch({ type: UPDATE_TODO_LIST, payload: res.data });
    } catch (err) {
      dispatch({
        type: UPDATE_TODO_LIST_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

export const deleteTodoList = (id: string) => async (dispatch: any) => {
  try {
    await api.delete(`/todos/${id}`);
    dispatch({ type: REMOVE_TODO_LIST, payload: id });
  } catch (err) {
    dispatch({
      type: REMOVE_TODO_LIST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
