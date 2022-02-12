import * as React from "react";
import { Navbar, Container } from "../../components";
import { useParams } from "react-router-dom";

const SpecificList = () => {
  const { id } = useParams();
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Container>
        <h1>Specific List of {id}</h1>
      </Container>
    </React.Fragment>
  );
};

export { SpecificList };
