import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Left, Navbar, Row } from "../../components";
import { api } from "../../constants";
import { toTitleCase } from "../../util";

const TodoLists = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [, setRefreshList] = useState([]);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const [newTodoList, setNewTodoList] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodoList, setEditingTodoList] = useState({ id: "", title: "" });

  const getLists = () => {
    return axios
      .get(`${api}/todos`, {})
      .then((res) => {
        setTodoLists(res.data);
      })
      .catch((err) => setErrors(err.response.data));
  };

  const addList = (title: string) => {
    return axios
      .post(`${api}/todos`, { title }, {})
      .then((res) => {
        setRefreshList(res.data);
        setNewTodoList("");
        getLists();
      })
      .catch((err) => setErrors(err.response.data));
  };

  const updateList = (id: string, title: string) => {
    return axios
      .put(`${api}/todos/${id}`, { title }, {})
      .then((res) => {
        setRefreshList(res.data);
        setEditingTodoList({ id: "", title: "" });
        setIsEditing(false);
        getLists();
      })
      .catch((err) => setErrors(err.response.data));
  };

  const deleteList = (id: string) => {
    return axios
      .delete(`${api}/todos/${id}`, {})
      .then((res) => {
        setRefreshList(res.data);
        getLists();
      })
      .catch((err) => setErrors(err.response.data));
  };

  const showLists = (todoLists: any) => {
    if (todoLists.length === 0) {
      return <li>No Todo Lists</li>;
    }
    return todoLists.map((list: any) => {
      return (
        <li key={list.id}>
          {isEditing && editingTodoList.id === list.id ? (
            <Row>{renderEditTodoList()}</Row>
          ) : (
            <Row>
              <div>
                <span>{toTitleCase(list.title)}</span>
              </div>
              <div>
                <Link className="btn btn-primary" to={`/lists/${list.id}`}>
                  View {toTitleCase(list.title)}
                </Link>
                <button
                  className="btn btn-info"
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setEditingTodoList({ id: list.id, title: list.title });
                  }}
                >
                  Edit List
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteList(list.id)}
                >
                  Delete List
                </button>
              </div>
            </Row>
          )}
        </li>
      );
    });
  };

  const renderAddTodo = () => {
    return (
      <div>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Add New Todo List"
            onChange={(e) => setNewTodoList(e.target.value)}
            value={newTodoList}
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              addList(newTodoList);
            }}
          >
            Add Todo List
          </button>
        </div>
      </div>
    );
  };

  const renderEditTodoList = () => {
    return (
      <div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              setEditingTodoList({ ...editingTodoList, title: e.target.value })
            }
            value={editingTodoList.title}
          />
          <button
            className="btn btn-info"
            onClick={() =>
              updateList(editingTodoList.id, editingTodoList.title)
            }
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Container>
        <h1>Todo Lists</h1>
        <br />
        <Row>{renderAddTodo()}</Row>
        <br />
        <Left>{showLists(todoLists)}</Left>
      </Container>
    </React.Fragment>
  );
};

export { TodoLists };
