import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import { api } from "../../constants";
import { toTitleCase } from "../../util";
import { TodoListItem } from "../../components";
import { useNavigation } from "@react-navigation/native";
import {
  ButtonContainer,
  CancelButton,
  InnerModalContainer,
  ModalViewContainer,
  UpdateButton,
  UpdateInput,
} from "./components";
import { Ionicons } from "@expo/vector-icons";

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
          size={25}
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
    return axios.post(`${api}/todos`, { title }).then(() => {
      getLists();
    });
  };

  const updateList = (id: string, title: string) => {
    return axios
      .put(`${api}/todos/${id}`, { title: `${title}` })
      .then(() => getLists())
      .catch((err) => console.error(err.response.data));
  };

  const deleteList = (id: string) => {
    return axios.delete(`${api}/todos/${id}`).then(() => getLists());
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
              ></UpdateInput>
              <ButtonContainer>
                <UpdateButton
                  onPress={() => {
                    addList(newListTitle);
                    setAddModalVisible(false);
                    setNewListTitle("");
                  }}
                >
                  <Text>Update</Text>
                </UpdateButton>
                <CancelButton
                  onPress={() => {
                    setAddModalVisible(false);
                    setNewListTitle("");
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
            setModalVisible(false);
          }}
        >
          <ModalViewContainer>
            <InnerModalContainer>
              <UpdateInput
                onChangeText={setEditingListText}
                value={editingListText}
              ></UpdateInput>
              <ButtonContainer>
                <UpdateButton
                  onPress={() => {
                    updateList(editingList.id, editingListText);
                    setModalVisible(false);
                    setEditingListText("");
                    setEditingList({ id: "", title: "" });
                  }}
                >
                  <Text>Update</Text>
                </UpdateButton>
                <CancelButton
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setEditingListText("");
                    setEditingList({ id: "", title: "" });
                  }}
                >
                  <Text>Close</Text>
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
