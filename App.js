import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "./screens/Menu";
import InterpretacionElectro from "./screens/InterpretacionElectro";
import CompleteCasilleros from "./screens/CompleteCasilleros";
import MultipleChoice from "./screens/MultipleChoice";
import ConcideracionesClinicas from "./screens/ConcideracionesClinicas";
import PlantillaInterpretacion from "./screens/PlantillaInterpretacion";
import plantillaCompletar from "./screens/plantillaCompletar";
import PlantillaChoice from "./screens/PlantillaChoice";
import PlantillaConcideraciones from "./screens/PlantillaConcideraciones";
import Inicio from "./screens/Inicio";
import Manual from "./screens/Manual";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen
        name="Inicio"
        component={Inicio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Manual"
        component={Manual}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InterpretacionElectro"
        component={InterpretacionElectro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CompleteCasilleros"
        component={CompleteCasilleros}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MultipleChoice"
        component={MultipleChoice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConcideracionesClinicas"
        component={ConcideracionesClinicas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlantillaInterpretacion"
        component={PlantillaInterpretacion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="plantillaCompletar"
        component={plantillaCompletar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlantillaChoice"
        component={PlantillaChoice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlantillaConcideraciones"
        component={PlantillaConcideraciones}
        options={{ headerShown: false }}
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
