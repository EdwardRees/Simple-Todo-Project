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

const Padding = styled.div`padding: 0 50pt;`;

const parseTodos = (todos: any) => {
  if (todos.length === 0) {
    return <li>No Todos</li>;
  }
  return todos.map((todo: any) => {
    const { id, content, complete } = todo;
    return (
      <li key={id}>
        <SpaceBetween>
          {content} - {complete ? "Complete" : "Incomplete"}{" "}
          <div>
            <button className="btn btn-success">Mark as Done</button>
            <button className="btn btn-danger">Delete Todo</button>
          </div>
        </SpaceBetween>
      </li>
    );
  });
};

const SpecificList = () => {
  const { id } = useParams();

  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(`${api}/todos/${id}`, {})
      .then((res) => {
        setTodos(res.data.todoItems);
        setName(res.data.title);
      })
      .catch((err) => {});
  }, []);

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Container>
        <h1>
          Specific List of <strong>{toTitleCase(name)}</strong>
        </h1>
        <Row>
          <button className="btn btn-primary">Add Todo</button>
        </Row>
        <Padding>
        <ul>{parseTodos(todos)}</ul>
        </Padding>
      </Container>
    </React.Fragment>
  );
};

export { SpecificList };
