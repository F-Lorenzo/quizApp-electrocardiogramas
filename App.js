import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "./screens/Inicio";
import InterpretacionElectro from "./screens/InterpretacionElectro";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="inicio">
      <Stack.Screen
        name="Inicio"
        component={Inicio}
        options={{ title: "Home" }}
      />
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
