import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import IndividualList from "./views/IndividualList";
import TodoLists from "./views/TodoLists";

import { Provider } from "react-redux";
import store from "./store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="TodoLists" component={TodoLists} />
          <Stack.Screen name="IndividualList" component={IndividualList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
