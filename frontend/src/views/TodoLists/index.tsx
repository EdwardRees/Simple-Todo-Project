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
          {/* {isEditing && editingTodoList.id === list.id ? (
             <div />
           ) : ( */}

          <Link className="btn btn-info" to={`/lists/${list.id}`}>
            {toTitleCase(list.title)}
          </Link>
          {/* )
             } */}
        </li>
      );
    });
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Container>
        <h1>Todo Lists</h1>
        <Row>
          <button className="btn btn-primary">Add Todo List</button>
        </Row>
        <Left>{showLists(todoLists)}</Left>
      </Container>
    </React.Fragment>
  );
};

export { TodoLists };
