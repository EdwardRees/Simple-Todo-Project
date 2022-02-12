import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Left, Navbar, Row } from "../../components";
import { api } from "../../constants";
import { toTitleCase } from '../../util';


const mapLists = (todoLists: any) => {
  if (todoLists.length === 0) {
    return <li>No Todo Lists</li>;
  }
  return todoLists.map((list: any) => {
    return (
      <li key={list.id}>
        <Link className="btn btn-info" to={`/lists/${list.id}`}>{toTitleCase(list.title)}</Link>
      </li>
    );
  });
};

const TodoLists = () => {
  const [todoLists, setTodoLists] = useState([]);
  useEffect(() => {
    axios
      .get(`${api}/todos`, {})
      .then((res) => {
        setTodoLists(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Container>
        <h1>Todo Lists</h1>
        <Row>
          <button className="btn btn-primary">Add Todo List</button>
        </Row>
        <Left>{mapLists(todoLists)}</Left>
      </Container>
    </React.Fragment>
  );
};

export { TodoLists };
