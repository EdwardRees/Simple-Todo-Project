import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Center = styled.div`
  display: flex;
  flex: 1;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Error404 = () => {
  const location = useLocation();
  return (
    <Center>
      <h1>Error 404: Page not found - {location.pathname}</h1>
      <br />
      <button onClick={() => window.history.back()} className="btn btn-primary btn-block btn-lg">Go Back</button>
    </Center>
  );
};

export { Error404 };
