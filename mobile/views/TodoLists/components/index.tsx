import * as React from "react";
import styled from "styled-components/native";

const ModalViewContainer = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const InnerModalContainer = styled.View`

`;

const UpdateInput = styled.TextInput`
  border-width: 1px;
  padding: 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const UpdateButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: cyan;
  border-radius: 5px;
`;

const CancelButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: red;
  border-radius: 5px;
`;

export {
  ModalViewContainer,
  InnerModalContainer,
  UpdateInput,
  ButtonContainer,
  UpdateButton,
  CancelButton,
};
