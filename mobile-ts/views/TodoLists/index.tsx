import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import {
  addTodoList,
  deleteTodoList,
  getTodoLists,
  updateTodoList,
} from "../../actions/todolist";
import { Empty, EmptyText, InputModal, TodoListItem } from "../../components";

const TodoLists = ({
  getTodoLists,
  addTodoList,
  updateTodoList,
  deleteTodoList,
  todoLists,
}: any) => {
  useEffect(() => {
    getTodoLists();
  }, [getTodoLists]);

  useEffect(() => {
    navigation.setOptions(navigationOptions);
  }, []);
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
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingList, setEditingList] = useState({ id: "", title: "" });
  const [editingListText, setEditingListText] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const renderTodoList = ({ item }: any) => {
    const todoList = item;
    const navigateLocation: any = {
      name: "IndividualList",
      params: { id: todoList.id, title: todoList.title },
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
        onDelete={() => {
          deleteTodoList(todoList.id);
        }}
      />
    );
  };

  const renderLists = () => {
    if (todoLists.length === 0) {
      return (
        <SafeAreaView>
          <InputModal
            modalVisible={addModalVisible}
            setModalVisible={setAddModalVisible}
            inputOnChange={(text) => setNewListTitle(text)}
            inputValue={newListTitle}
            updateButtonPress={() => {
              addTodoList(newListTitle);
              setAddModalVisible(false);
              setNewListTitle("");
            }}
            cancelButtonPress={() => {
              setAddModalVisible(false);
              setNewListTitle("");
            }}
            updateText={"Add"}
            cancelText={"Cancel"}
          ></InputModal>
          <InputModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            inputOnChange={(text) => setEditingListText(text)}
            inputValue={editingListText}
            updateButtonPress={() => {
              updateTodoList(editingList.id, editingListText);
              setModalVisible(false);
              setEditingListText("");
              setEditingList({ id: "", title: "" });
            }}
            cancelButtonPress={() => {
              setModalVisible(false);
              setEditingListText("");
              setEditingList({ id: "", title: "" });
            }}
            updateText={"Update"}
            cancelText={"Cancel"}
          ></InputModal>
          <Empty>
            <EmptyText>No Todo Lists Found!</EmptyText>
          </Empty>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView>
        <InputModal
          modalVisible={addModalVisible}
          setModalVisible={setAddModalVisible}
          inputOnChange={(text) => setNewListTitle(text)}
          inputValue={newListTitle}
          updateButtonPress={() => {
            addTodoList(newListTitle);
            setAddModalVisible(false);
            setNewListTitle("");
          }}
          cancelButtonPress={() => {
            setAddModalVisible(false);
            setNewListTitle("");
          }}
          updateText={"Add"}
          cancelText={"Cancel"}
        ></InputModal>
        <InputModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          inputOnChange={(text) => setEditingListText(text)}
          inputValue={editingListText}
          updateButtonPress={() => {
            updateTodoList(editingList.id, editingListText);
            setModalVisible(false);
            setEditingListText("");
            setEditingList({ id: "", title: "" });
          }}
          cancelButtonPress={() => {
            setModalVisible(!modalVisible);
            setEditingListText("");
            setEditingList({ id: "", title: "" });
          }}
          updateText={"Update"}
          cancelText={"Cancel"}
        ></InputModal>
        <FlatList data={todoLists} renderItem={renderTodoList} />
      </SafeAreaView>
    );
  };

  return <View>{renderLists()}</View>;
};

const mapStateToProps = (state: any) => {
  return {
    todoLists: state.todolist.todoLists,
  };
};

export default connect(mapStateToProps, {
  getTodoLists,
  deleteTodoList,
  updateTodoList,
  addTodoList,
})(TodoLists);
