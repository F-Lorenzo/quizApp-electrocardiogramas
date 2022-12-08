import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "./screens/Menu";
import InterpretacionElectro from "./screens/InterpretacionElectro";
import Inicio from "./screens/Inicio";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={Inicio} />
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
