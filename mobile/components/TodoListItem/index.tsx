import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import { toTitleCase } from "../../util";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  min-width: 100%;

`;

const Title = styled.Text`
  flex: 1;
  font-size: 16px;
  padding: 20px 20px 20px 20px;
  border-bottom-width: 1px;
  background-color: white;
`;

const TodoListItem = (props: any) => {
  const { onPress, id, title, todoItems, editPress, deletePress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <Title>{toTitleCase(title)}</Title>
        <TouchableOpacity onPress={editPress}>
          <Title>Edit</Title>
        </TouchableOpacity>
        <TouchableOpacity onPress={deletePress}>
          <Title>Delete</Title>
        </TouchableOpacity>
      </Container>
    </TouchableOpacity>
  );
};

export { TodoListItem };
