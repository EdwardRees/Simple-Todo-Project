import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { toTitleCase } from "../../util";

const Container = styled.View`
  padding: 20px;
  font-size: 20px;
  background-color: #fff;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TodoListItem = (props) => {
  const { onPress, id, title, onEdit, onDelete } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <ScrollView style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 16 }}>{toTitleCase(title)}</Text>
        </ScrollView>
        <Buttons>
          <Ionicons name="create" size={25} onPress={onEdit}></Ionicons>
          <Ionicons name="trash" size={25} onPress={onDelete}></Ionicons>
        </Buttons>
      </Container>
    </TouchableOpacity>
  );
};

export { TodoListItem };
