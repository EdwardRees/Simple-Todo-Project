import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as React from "react";
import { FlatList, Modal, SafeAreaView, Text, View } from "react-native";
import {
  ButtonContainer,
  CancelButton, Empty,
  EmptyText, InnerModalContainer,
  ModalViewContainer, TodoItem, UpdateButton,
  UpdateInput, ButtonText
} from "../../components";
import { api } from "../../constants";
import { toTitleCase } from "../../util";
const { useState, useEffect } = React;

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
      .post(`${api}/todos/${todoListId}/items`, {
        content,
        complete: `${false}`,
      })
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
      .then(() => getTodoItems())
      .catch((err) => console.error(err.response.data));
  };

  const deleteTodo = (todoId: string, todoItemId: string) => {
    return axios
      .delete(`${api}/todos/${todoId}/items/${todoItemId}`)
      .then(() => getTodoItems())
      .catch((err) => console.error(err.response.data));
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
                  multiline={true}
                ></UpdateInput>
                <Text></Text>
                <ButtonContainer>
                  <UpdateButton
                    onPress={() => {
                      addTodo(id, newTodoContent);
                      setAddModalVisible(false);
                      setNewTodoContent("");
                    }}
                  >
                    <ButtonText>Update</ButtonText>
                  </UpdateButton>
                  <CancelButton
                    onPress={() => {
                      setAddModalVisible(false);
                      setNewTodoContent("");
                    }}
                  >
                    <ButtonText>Close</ButtonText>
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
                  multiline={true}
                ></UpdateInput>
                <Text></Text>
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
                    <ButtonText>Update</ButtonText>
                  </UpdateButton>
                  <CancelButton
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setEditingContentText("");
                      setEditingTodo({ todoId: "", id: "", content: "" });
                    }}
                  >
                    <ButtonText>Close</ButtonText>
                  </CancelButton>
                </ButtonContainer>
              </InnerModalContainer>
            </ModalViewContainer>
          </Modal>
          <Empty>
            <EmptyText>
              No Items Found in List: "{toTitleCase(title)}"
            </EmptyText>
          </Empty>
        </SafeAreaView>
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
                multiline={true}
              ></UpdateInput>
              <Text></Text>
              <ButtonContainer>
                <UpdateButton
                  onPress={() => {
                    addTodo(id, newTodoContent);
                    setAddModalVisible(false);
                    setNewTodoContent("");
                  }}
                >
                  <ButtonText>Add</ButtonText>
                </UpdateButton>
                <Text>{" "}</Text>
                <CancelButton
                  onPress={() => {
                    setAddModalVisible(false);
                    setNewTodoContent("");
                  }}
                >
                  <ButtonText>Close</ButtonText>
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
                multiline={true}
              ></UpdateInput>
              <Text></Text>
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
                  <ButtonText>Update</ButtonText>
                </UpdateButton>
                <CancelButton
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setEditingContentText("");
                    setEditingTodo({ todoId: "", id: "", content: "" });
                  }}
                >
                  <ButtonText>Close</ButtonText>
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
            size={30}
            onPress={() => setAddModalVisible(true)}
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
