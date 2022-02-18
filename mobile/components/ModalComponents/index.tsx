import * as React from "react";
import styled from "styled-components/native";

const ModalViewContainer = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const InnerModalContainer = styled.View`
  padding: 20px;
`;

const UpdateInput = styled.TextInput`
  border-width: 1px;
  padding: 10px;
  min-width: 100%;
  font-size: 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const UpdateButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: #198754;
  border-radius: 5px;
  width: 40%;
`;

const CancelButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: #dc3545;
  border-radius: 5px;
  width: 40%;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #fff;
  
`;

export {
  ModalViewContainer,
  InnerModalContainer,
  UpdateInput,
  ButtonContainer,
  UpdateButton,
  CancelButton,
  ButtonText
};
