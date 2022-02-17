import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as React from "react";
import { FlatList, Modal, SafeAreaView, Text, View } from "react-native";
import { TodoItem,   ButtonContainer,
  CancelButton,
  InnerModalContainer,
  ModalViewContainer,
  UpdateButton,
  UpdateInput,} from "../../components";
import { api } from "../../constants";
import { toTitleCase } from "../../util";
const { useState, useEffect } = React;
import { Ionicons } from "@expo/vector-icons";

const IndividualList = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState({
    todoId: "",
    id: "",
    content: "",
  });
  const [editingContentText, setEditingContentText] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newTodoContent, setNewTodoContent] = useState("");

  const addTodo = (todoListId: string, content: string) => {
    return axios
      .post(`${api}/todos/${todoListId}/items`, { content, complete: `${false}` })
      .then(() => getTodoItems())
      .catch((err) => console.error(err.response.data));
  };

  const updateContent = (
    todoId: string,
    todoItemId: string,
    content: string
  ) => {
    return axios
      .put(`${api}/todos/${todoId}/items/${todoItemId}`, {
        content: `${content}`,
      })
      .then(() => {
        getTodoItems();
      })
      .catch((err) => console.error(err.response.data));
  };

  const updateComplete = (
    todoId: string,
    todoItemId: string,
    complete: boolean
  ) => {
    return axios
      .put(`${api}/todos/${todoId}/items/${todoItemId}`, {
        complete: `${complete}`,
      })
      .then(() => getTodoItems());
  };

  const deleteTodo = (todoId: string, todoItemId: string) => {
    return axios
      .delete(`${api}/todos/${todoId}/items/${todoItemId}`)
      .then(() => getTodoItems());
  };

  const renderTodoItems = ({ item }: any) => {
    const todoItems = item;
    return (
      <TodoItem
        id={todoItems.id}
        content={todoItems.content}
        complete={todoItems.complete}
        onEdit={() => {
          console.info(`Pressed Edit for ${todoItems.content}!`);
          setEditingTodo({
            todoId: todoItems.todoId,
            id: todoItems.id,
            content: todoItems.content,
          });
          setEditingContentText(todoItems.content);
          setModalVisible(true);
        }}
        onCheck={() => {
          updateComplete(todoItems.todoId, todoItems.id, !todoItems.complete);
        }}
        onDelete={() => deleteTodo(todoItems.todoId, todoItems.id)}
      />
    );
  };

  const getTodoItems = () => {
    return axios
      .get(`${api}/todos/${id}`, {})
      .then((res) => {
        setTodoItems(res.data.todoItems);
      })
      .catch((err) => console.log(err.response.data));
  };

  const renderItems = (todoItems: any) => {
    if (todoItems.length === 0) {
      return (
        <View>
          <Text>No items found</Text>
        </View>
      );
    }
    return (
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={addModalVisible}
          onRequestClose={() => {
            setAddModalVisible(false);
          }}
        >
          <ModalViewContainer>
            <InnerModalContainer>
              <UpdateInput
                onChangeText={setNewTodoContent}
                value={newTodoContent}
              ></UpdateInput>
              <ButtonContainer>
                <UpdateButton
                  onPress={() => {
                    addTodo(id, newTodoContent);
                    setAddModalVisible(false);
                    setNewTodoContent("");
                  }}
                >
                  <Text>Update</Text>
                </UpdateButton>
                <CancelButton
                  onPress={() => {
                    setAddModalVisible(false);
                    setNewTodoContent("");
                  }}
                >
                  <Text>Close</Text>
                </CancelButton>
              </ButtonContainer>
            </InnerModalContainer>
          </ModalViewContainer>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalViewContainer>
            <InnerModalContainer>
              <UpdateInput
                onChangeText={setEditingContentText}
                value={editingContentText}
              ></UpdateInput>
              <ButtonContainer>
                <UpdateButton
                  onPress={() => {
                    console.info(`Pressed Update for ${editingContentText}!`);
                    updateContent(
                      editingTodo.todoId,
                      editingTodo.id,
                      editingContentText
                    );
                    setModalVisible(false);
                    setEditingContentText("");
                    setEditingTodo({ todoId: "", id: "", content: "" });
                  }}
                >
                  <Text>Update</Text>
                </UpdateButton>
                <CancelButton
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setEditingContentText("");
                    setEditingTodo({ todoId: "", id: "", content: "" });
                  }}
                >
                  <Text>Close</Text>
                </CancelButton>
              </ButtonContainer>
            </InnerModalContainer>
          </ModalViewContainer>
        </Modal>
        <FlatList data={todoItems} renderItem={renderTodoItems} />
      </SafeAreaView>
    );
  };

  const navigation = useNavigation();
  const route = useRoute();
  const params: any = route.params;
  const todoList = params.todoList;
  const { id, title } = todoList;

  useEffect(() => {
    getTodoItems();
    navigation.setOptions({
      title: toTitleCase(title),
      headerRight: () => {
        return (
          <Ionicons
            name="add-outline"
            size={25}
            onPress={() => {
              setAddModalVisible(true);
            }}
          />
        );
      },
    });
  }, []);

  // useEffect(() => {
  //   getTodoItems();
  // }, [todoItems]); // TODO FIX OVER PULL

  return <View>{renderItems(todoItems)}</View>;
};

export { IndividualList };
