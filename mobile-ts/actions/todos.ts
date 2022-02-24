import { api } from "../util";
import {
  GET_TODO_LIST,
  ADD_TODO_ITEM,
  REMOVE_TODO_ITEM,
  COMPLETE_TODO_ITEM,
  UPDATE_TODO_ITEM,
  GET_TODO_LIST_ERROR,
  ADD_TODO_ITEM_ERROR,
  REMOVE_TODO_ITEM_ERROR,
  COMPLETE_TODO_ITEM_ERROR,
  UPDATE_TODO_ITEM_ERROR,
} from "./types";

export const getTodos = (todoListId: string) => async (dispatch: any) => {
  try {
    const res = await api.get(`/todos/${todoListId}`, {});
    dispatch({ type: GET_TODO_LIST, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_TODO_LIST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addTodo =
  (todoListId: string, content: string) => async (dispatch: any) => {
    try {
      const res = await api.post(`/todos/${todoListId}/items`, {
        content,
        complete: `${false}`,
      });
      dispatch({ type: ADD_TODO_ITEM, payload: res.data });
    } catch (err) {
      dispatch({
        type: ADD_TODO_ITEM_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

export const removeTodo =
  (todoListId: string, itemId: string) => async (dispatch: any) => {
    try {
      const res = await api.delete(`/todos/${todoListId}/items/${itemId}`);
      dispatch({ type: REMOVE_TODO_ITEM, payload: itemId });
    } catch (err) {
      dispatch({
        type: REMOVE_TODO_ITEM_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

export const completeTodo =
  (todoListId: string, itemId: string, complete: boolean) =>
  async (dispatch: any) => {
    try {
      const res = await api.put(`/todos/${todoListId}/items/${itemId}`, {
        complete: `${complete}`,
      });
      dispatch({ type: COMPLETE_TODO_ITEM, payload: res.data });
    } catch (err) {
      dispatch({
        type: COMPLETE_TODO_ITEM_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

export const updateTodo =
  (todoListId: string, itemId: string, content: string) =>
  async (dispatch: any) => {
    try {
      const res = await api.put(`/todos/${todoListId}/items/${itemId}`, {
        content,
      });
      dispatch({ type: UPDATE_TODO_ITEM, payload: res.data });
    } catch (err) {
      dispatch({
        type: UPDATE_TODO_ITEM_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
