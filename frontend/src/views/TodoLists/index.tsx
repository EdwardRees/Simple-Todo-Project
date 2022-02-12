import * as React from "react";
import { Container, Navbar } from "../../components";

const TodoLists = () => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Container>
        <h1>Todo Lists</h1>
      </Container>
    </React.Fragment>
  );
};

export { TodoLists };
