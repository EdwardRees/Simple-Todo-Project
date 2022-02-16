import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { api } from "../../constants";
import { toTitleCase } from "../../util";
import { TodoListItem } from "../../components";

const renderTodoList = ({ item }: any) => {
  const todoList = item;
  return (
    <TodoListItem
      onPress={() => {
        console.info(todoList.title);
      }}
      id={todoList.id}
      title={todoList.title}
      todoItems={todoList.todoItems}
      editPress={() => console.info(`Pressed Edit for ${todoList.title}!`)}
      deletePress={() => console.info(`Pressed Delete for ${todoList.title}!`)}
    />
  );
};

const TodoLists = () => {
  const [todoLists, setTodoLists] = useState([]); // [{ id: string, title: string, todoItems: [todoItems] }]

  const getLists = () => {
    return axios
      .get(`${api}/todos`, {})
      .then((res) => {
        setTodoLists(res.data); // res.data is an array of todo lists
      })
      .catch((err) => console.log(err.response.data));
  };

  const renderLists = (todoLists: any) => {
    if (todoLists.length === 0) {
      return (
        <View>
          <Text>No todo lists found</Text>
        </View>
      );
    }
    return (
      <SafeAreaView>
        <FlatList data={todoLists} renderItem={renderTodoList} />
      </SafeAreaView>
    );
  };

  useEffect(() => {
    getLists();
  }, []);

  return <View>{renderLists(todoLists)}</View>;
};

export { TodoLists };
