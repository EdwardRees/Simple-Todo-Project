import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components/native";

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

const TodoItem = (props) => {
  const { id, content, complete, onEdit, onDelete, onCheck } = props;
  return (
    <Container>
      <View>
        {complete ? (
          <Ionicons
            name="checkmark-circle-outline"
            size={24}
            onPress={onCheck}
          ></Ionicons>
        ) : (
          <Ionicons
            name="ellipse-outline"
            size={24}
            onPress={onCheck}
          ></Ionicons>
        )}
      </View>
      <ScrollView style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 16 }}>{content}</Text>
      </ScrollView>
      <Buttons>
        <Ionicons name="create" size={25} onPress={onEdit}></Ionicons>
        <Ionicons name="trash" size={25} onPress={onDelete}></Ionicons>
      </Buttons>
    </Container>
  );
};

export { TodoItem };
