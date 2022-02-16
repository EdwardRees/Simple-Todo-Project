import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity onPress={() => setCounter(counter - 1)}>
        <Text style={{fontSize: 20, padding: 20}}>-</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 20}}>{counter}</Text>
      <TouchableOpacity onPress={() => setCounter(counter + 1)}>
        <Text style={{fontSize: 20, padding: 20}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export { Counter };
