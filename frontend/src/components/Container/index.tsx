import React from "react";
import styled from "styled-components";

const View = styled.div`
  text-align: center;
`;

const Container = ({ children }: any) => {
  return <View>{children}</View>;
};

export { Container };
