import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import {
  addTodo,
  completeTodo,
  getTodos,
  removeTodo,
  updateTodo,
} from "../../actions";
import { Empty, EmptyText, InputModal, TodoItem } from "../../components";
import { toTitleCase } from "../../util";

const IndividualList = ({
  getTodos,
  addTodo,
  removeTodo,
  completeTodo,
  updateTodo,
  todoItems,
}: any) => {
  const navigation = useNavigation();
  const route = useRoute();
  const params: any = route.params;
  const { id, title } = params;
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState({
    todoId: "",
    id: "",
    content: "",
  });
  const [editingContentText, setEditingContentText] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newTodoContent, setNewTodoContent] = useState("");

  useEffect(() => {
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
  useEffect(() => {
    getTodos(id);
  }, [getTodos]);

  const renderTodoItems = ({ item }: any) => {
    const todoItems = item;
    return (
      <TodoItem
        id={todoItems.id}
        content={todoItems.content}
        complete={todoItems.complete}
        onEdit={() => {
          setEditingTodo({
            todoId: todoItems.todoId,
            id: todoItems.id,
            content: todoItems.content,
          });
          setEditingContentText(todoItems.content);
          setModalVisible(true);
        }}
        onCheck={() => {
          completeTodo(todoItems.todoId, todoItems.id, !todoItems.complete);
        }}
        onDelete={() => removeTodo(todoItems.todoId, todoItems.id)}
      />
    );
  };

  const renderItems = (todoItems: any) => {
    if (todoItems?.length === 0) {
      return (
        <SafeAreaView>
          <InputModal
            modalVisible={addModalVisible}
            setModalVisible={setAddModalVisible}
            inputOnChange={setNewTodoContent}
            inputValue={newTodoContent}
            updateButtonPress={() => {
              addTodo(id, newTodoContent);
              setAddModalVisible(false);
              setNewTodoContent("");
            }}
            cancelButtonPress={() => {
              setAddModalVisible(false);
              setNewTodoContent("");
            }}
            updateText={"Add"}
            cancelText={"Cancel"}
          ></InputModal>
          <InputModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            inputOnChange={setEditingContentText}
            inputValue={editingContentText}
            updateButtonPress={() => {
              updateTodo(
                editingTodo.todoId,
                editingTodo.id,
                editingContentText
              );
              setModalVisible(false);
              setEditingContentText("");
              setEditingTodo({ todoId: "", id: "", content: "" });
            }}
            cancelButtonPress={() => {
              setModalVisible(!modalVisible);
              setEditingContentText("");
              setEditingTodo({ todoId: "", id: "", content: "" });
            }}
            updateText={"Update"}
            cancelText={"Cancel"}
            multiline={true}
          ></InputModal>

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
        <InputModal
          modalVisible={addModalVisible}
          setModalVisible={setAddModalVisible}
          inputOnChange={setNewTodoContent}
          inputValue={newTodoContent}
          updateButtonPress={() => {
            addTodo(id, newTodoContent);
            setAddModalVisible(false);
            setNewTodoContent("");
          }}
          cancelButtonPress={() => {
            setAddModalVisible(false);
            setNewTodoContent("");
          }}
          updateText={"Add"}
          cancelText={"Cancel"}
        ></InputModal>
        <InputModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          inputOnChange={setEditingContentText}
          inputValue={editingContentText}
          updateButtonPress={() => {
            updateTodo(editingTodo.todoId, editingTodo.id, editingContentText);
            setModalVisible(false);
            setEditingContentText("");
            setEditingTodo({ todoId: "", id: "", content: "" });
          }}
          cancelButtonPress={() => {
            setModalVisible(!modalVisible);
            setEditingContentText("");
            setEditingTodo({ todoId: "", id: "", content: "" });
          }}
          updateText={"Update"}
          cancelText={"Cancel"}
          multiline={true}
        ></InputModal>

        <FlatList data={todoItems} renderItem={renderTodoItems} />
      </SafeAreaView>
    );
  };

  return <View>{renderItems(todoItems)}</View>;
};
const mapStateToProps = (state: any) => {
  return {
    todoItems: state.todos.todoList.todoItems,
  };
};

export default connect(mapStateToProps, {
  getTodos,
  removeTodo,
  updateTodo,
  completeTodo,
  addTodo,
})(IndividualList);
