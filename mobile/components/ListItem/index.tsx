import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import { toTitleCase } from "../../util";

const Title = styled.Text`
  font-size: 16px;
  padding: 20px 20px 20px 20px;
  border-bottom-width: 1px;
  background-color: white;
`;

const ListItem = (props: any) => {
  const { onPress, id, title, todoItems } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Title>{toTitleCase(title)}</Title>
    </TouchableOpacity>
  );
};

export { ListItem };
