import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Home, Counter, IndividualList, TodoLists } from './views';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Counter" component={Counter} /> */}
        <Stack.Screen name="TodoLists" component={TodoLists} />
        <Stack.Screen name="IndividualList" component={IndividualList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
