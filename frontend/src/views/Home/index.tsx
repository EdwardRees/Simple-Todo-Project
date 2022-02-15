import * as React from "react";
import { Container, Navbar } from "../../components";

const Home = () => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Container>
        <h1>Welcome to a simple Todo List!</h1>
      </Container>
    </React.Fragment>
  );
};

export { Home };
