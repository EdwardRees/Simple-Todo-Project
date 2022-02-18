import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { FlatList, Modal, SafeAreaView, Text, View } from "react-native";
import {
  ButtonContainer,
  CancelButton,
  InnerModalContainer,
  ModalViewContainer,
  TodoListItem,
  UpdateButton,
  UpdateInput,
  Empty,
  EmptyText,
  ButtonText
} from "../../components";
import { api } from "../../constants";

const TodoLists = () => {
  const navigation = useNavigation();
  const [todoLists, setTodoLists] = useState([]); // [{ id: string, title: string, todoItems: [todoItems] }]
  const [modalVisible, setModalVisible] = useState(false);
  const [editingList, setEditingList] = useState({ id: "", title: "" });
  const [editingListText, setEditingListText] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const navigationOptions = {
    title: "Todo Lists",
    headerRight: () => {
      return (
        <Ionicons
          name="add-outline"
          size={30}
          onPress={() => {
            setAddModalVisible(true);
          }}
        />
      );
    },
  };

  const renderTodoList = ({ item }: any) => {
    const todoList = item;
    const navigateLocation: any = {
      name: "IndividualList",
      params: { todoList },
    };
    return (
      <TodoListItem
        onPress={() => {
          navigation.navigate(navigateLocation);
        }}
        id={todoList.id}
        title={todoList.title}
        onEdit={() => {
          setEditingList({ id: todoList.id, title: todoList.title });
          setEditingListText(todoList.title);
          setModalVisible(true);
        }}
        onDelete={() => deleteList(todoList.id)}
      />
    );
  };

  const getLists = () => {
    return axios
      .get(`${api}/todos`, {})
      .then((res) => {
        setTodoLists(res.data); // res.data is an array of todo lists
      })
      .catch((err) => console.log(err.response.data));
  };

  const addList = (title: string) => {
    return axios
      .post(`${api}/todos`, { title })
      .then(() => {
        getLists();
      })
      .catch((err) => console.error(err.response.data));
  };

  const updateList = (id: string, title: string) => {
    return axios
      .put(`${api}/todos/${id}`, { title: `${title}` })
      .then(() => getLists())
      .catch((err) => console.error(err.response.data));
  };

  const deleteList = (id: string) => {
    return axios
      .delete(`${api}/todos/${id}`)
      .then(() => getLists())
      .catch((err) => console.error(err.response.data));
  };

  const renderLists = (todoLists: any) => {
    if (todoLists.length === 0) {
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
                  onChangeText={setNewListTitle}
                  value={newListTitle}
                  multiline={false}
                ></UpdateInput>
                <Text></Text>
                <ButtonContainer>
                  <UpdateButton
                    onPress={() => {
                      addList(newListTitle);
                      setAddModalVisible(false);
                      setNewListTitle("");
                    }}
                  >
                    <ButtonText>Update</ButtonText>
                  </UpdateButton>
                  <CancelButton
                    onPress={() => {
                      setAddModalVisible(false);
                      setNewListTitle("");
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
              setModalVisible(false);
            }}
          >
            <ModalViewContainer>
              <InnerModalContainer>
                <UpdateInput
                  onChangeText={setEditingListText}
                  value={editingListText}
                  multline={true}
                ></UpdateInput>
                <Text></Text>
                <ButtonContainer>
                  <UpdateButton
                    onPress={() => {
                      updateList(editingList.id, editingListText);
                      setModalVisible(false);
                      setEditingListText("");
                      setEditingList({ id: "", title: "" });
                    }}
                  >
                    <ButtonText>Update</ButtonText>
                  </UpdateButton>
                  <CancelButton
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setEditingListText("");
                      setEditingList({ id: "", title: "" });
                    }}
                  >
                    <ButtonText>Close</ButtonText>
                  </CancelButton>
                </ButtonContainer>
              </InnerModalContainer>
            </ModalViewContainer>
          </Modal>
          <Empty>
            <EmptyText>No Todo Lists Found!</EmptyText>
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
                onChangeText={setNewListTitle}
                value={newListTitle}
                multiline={true}
              ></UpdateInput>
              <Text></Text>
              <ButtonContainer>
                <UpdateButton
                  onPress={() => {
                    addList(newListTitle);
                    setAddModalVisible(false);
                    setNewListTitle("");
                  }}
                >
                  <ButtonText>Add</ButtonText>
                </UpdateButton>
                <CancelButton
                  onPress={() => {
                    setAddModalVisible(false);
                    setNewListTitle("");
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
            setModalVisible(false);
          }}
        >
          <ModalViewContainer>
            <InnerModalContainer>
              <UpdateInput
                onChangeText={setEditingListText}
                value={editingListText}
                multiline={true}
              ></UpdateInput>
              <Text></Text>
              <ButtonContainer>
                <UpdateButton
                  onPress={() => {
                    updateList(editingList.id, editingListText);
                    setModalVisible(false);
                    setEditingListText("");
                    setEditingList({ id: "", title: "" });
                  }}
                >
                  <ButtonText>Update</ButtonText>
                </UpdateButton>
                <CancelButton
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setEditingListText("");
                    setEditingList({ id: "", title: "" });
                  }}
                >
                  <ButtonText>Close</ButtonText>
                </CancelButton>
              </ButtonContainer>
            </InnerModalContainer>
          </ModalViewContainer>
        </Modal>
        <FlatList data={todoLists} renderItem={renderTodoList} />
      </SafeAreaView>
    );
  };

  useEffect(() => {
    getLists();
    navigation.setOptions(navigationOptions);
  }, []);
  // useEffect(() => {
  //   getLists();
  // }, [todoLists]);

  return <View>{renderLists(todoLists)}</View>;
};

export { TodoLists };
