import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "./screens/Menu";
import InterpretacionElectro from "./screens/InterpretacionElectro";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="main">
      <Stack.Screen name="main" component={Home} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen
        name="InterpretacionElectro"
        component={InterpretacionElectro}
        options={{ title: "Interpretacion electrocardiograma" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
