import axios from "axios";
import * as React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Left, Navbar, Row } from "../../components";
import { api } from "../../constants";
import { toTitleCase } from "../../util";

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Padding = styled.div`
  padding: 0 50pt;
`;

const SpecificList = () => {
  const { id } = useParams();

  const [todos, setTodos] = useState([]);
  const [, setRefreshList] = useState([]);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState({ id: "", content: "" });

  const getTodos = () => {
    return axios
      .get(`${api}/todos/${id}`, {})
      .then((res) => {
        setTodos(res.data.todoItems);
        setName(res.data.title);
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

  const addTodo = (todoListId: string, content: string) => {
    return axios
      .post(`${api}/todos/${todoListId}/items`, { content }, {})
      .then((res) => {
        setRefreshList(res.data);
        setNewTodo("");
        getTodos();
      })
      .catch((err) => setErrors(err.response.data));
  };

  const updateComplete = (
    todoId: string,
    todoItemId: string,
    complete: boolean
  ) => {
    return axios
      .put(`${api}/todos/${todoId}/items/${todoItemId}`, {
        complete: `${complete}`,
      })
      .then((res) => {
        setRefreshList(res.data);
        getTodos();
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

  const updateContent = (
    todoId: string,
    todoItemId: string,
    content: string
  ) => {
    return axios
      .put(`${api}/todos/${todoId}/items/${todoItemId}`, { content })
      .then((res) => {
        setRefreshList(res.data);
        setEditingTodo({ id: "", content: "" });
        setIsEditing(!isEditing);
        getTodos();
      })
      .catch((err) => setErrors(err.response.data));
  };

  const deleteTodo = (todoId: string, todoItemId: string) => {
    return axios
      .delete(`${api}/todos/${todoId}/items/${todoItemId}`)
      .then((res) => {
        setRefreshList(res.data);
        getTodos();
      })
      .catch((err) => setErrors(err.response.data));
  };

  const parseTodos = (id: any, todos: any) => {
    if (todos.length === 0) {
      return <li>No Todos</li>;
    }
    return todos.map((todo: any) => {
      const { content, complete } = todo;
      const todoId = todo.id;
      return (
        <li key={todoId}>
          <SpaceBetween>
            {isEditing && editingTodo.id === todoId ? (
              <div>{renderEditTodo(id, todoId)}</div>
            ) : (
              <div>
                <span className={complete ? "strike-through" : ""}>{content}</span>
              </div>
            )}
            {isEditing && editingTodo.id === todoId ? (
              <div> </div>
            ) : (
              <div>
                {complete ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => updateComplete(id, todoId, !complete)}
                  >
                    Mark as Incomplete
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => updateComplete(id, todoId, !complete)}
                  >
                    Mark as Done
                  </button>
                )}
                <button
                  className="btn btn-info"
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setEditingTodo({ id: todoId, content: content });
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(id, todoId)}
                >
                  Delete Todo
                </button>
              </div>
            )}
          </SpaceBetween>
        </li>
      );
    });
  };

  const renderAddTodo = (id: any) => {
    return (
      <div>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Add Todo"
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              addTodo(id, newTodo);
            }}
          >
            Add Todo
          </button>
        </div>
      </div>
    );
  };

  const renderEditTodo = (id: any, todoId: string) => {
    return (
      <div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              setEditingTodo({ ...editingTodo, content: e.target.value })
            }
            value={editingTodo.content}
          />
          <button
            className="btn btn-info"
            onClick={() => updateContent(id, todoId, editingTodo.content)}
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Container>
        <h1>
          <strong>{toTitleCase(name)}</strong>
        </h1>
        <br />
        <Row>{renderAddTodo(id)}</Row>
        <br />
        <Padding>
          <ul>{parseTodos(id, todos)}</ul>
        </Padding>
      </Container>
    </React.Fragment>
  );
};

export { SpecificList };
