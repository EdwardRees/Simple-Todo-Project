import * as React from "react";
import { Text, Modal } from "react-native";
import {
  ModalViewContainer,
  InnerModalContainer,
  UpdateInput,
  ButtonContainer,
  UpdateButton,
  CancelButton,
  ButtonText,
} from "../ModalComponents";

const InputModal = ({
  modalVisible,
  setModalVisible,
  inputOnChange,
  inputValue,
  updateButtonPress,
  updateText,
  cancelButtonPress,
  cancelText,
  multiline = false
}: any) => {
  return (
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
            onChangeText={inputOnChange}
            value={inputValue}
            multiline={multiline}
          ></UpdateInput>
          <Text></Text>
          <ButtonContainer>
            <UpdateButton onPress={updateButtonPress}>
              <ButtonText>{updateText}</ButtonText>
            </UpdateButton>
            <CancelButton onPress={cancelButtonPress}>
              <ButtonText>{cancelText}</ButtonText>
            </CancelButton>
          </ButtonContainer>
        </InnerModalContainer>
      </ModalViewContainer>
    </Modal>
  );
};

export { InputModal };
