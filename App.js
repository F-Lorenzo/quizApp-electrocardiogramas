import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "./screens/Menu";
import InterpretacionElectro from "./screens/InterpretacionElectro";
import CompleteCasilleros from "./screens/CompleteCasilleros";
import MultipleChoice from "./screens/MultipleChoice";
import ConcideracionesClinicas from "./screens/ConcideracionesClinicas";
import PlantillaInterpretacion from "./screens/PlantillaInterpretacion";
import Inicio from "./screens/Inicio";
import Manual from "./screens/Manual";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Manual" component={Manual} />
      <Stack.Screen
        name="InterpretacionElectro"
        component={InterpretacionElectro}
        options={{ title: "Interpretacion electrocardiograma" }}
      />
      <Stack.Screen
        name="CompleteCasilleros"
        component={CompleteCasilleros}
        options={{ title: "Complete Casilleros" }}
      />
      <Stack.Screen
        name="MultipleChoice"
        component={MultipleChoice}
        options={{ title: "Multiple Choice" }}
      />
      <Stack.Screen
        name="ConcideracionesClinicas"
        component={ConcideracionesClinicas}
        options={{ title: "Concideraciones clinicas" }}
      />
      <Stack.Screen
        name="PlantillaInterpretacion"
        component={PlantillaInterpretacion}
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
