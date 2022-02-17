import * as React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const { useState, useEffect } = React;

const Container = styled.View`
  padding: 20px;
  font-size: 16px;
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

const Check = styled.TouchableOpacity`
  width: 20px;
`;

const TodoItem = (props: any) => {
  const { id, content, complete, onEdit, onDelete, onCheck } = props;
  return (
    <Container>
      <View>
        {complete ? (
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            onPress={onCheck}
          ></Ionicons>
        ) : (
          <Ionicons
            name="ellipse-outline"
            size={20}
            onPress={onCheck}
          ></Ionicons>
        )}
      </View>
      <Text>{content}</Text>
      <Buttons>
        <Ionicons name="create" size={20} onPress={onEdit}></Ionicons>
        <Ionicons name="trash" size={20} onPress={onDelete}></Ionicons>
      </Buttons>
    </Container>
  );
};

export { TodoItem };
