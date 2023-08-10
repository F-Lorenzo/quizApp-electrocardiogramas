import React, { useEffect } from "react";
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
import Perfil from "./screens/Perfil";
import Estadisticas from "./screens/Estadisticas";
import RegistrarUsuario from "./screens/RegistrarUsuario";
import Login from "./screens/Login";
import { useDispatch } from "react-redux";
import { auth } from "./config/firebase.config";
import { findUserById } from "./api/services/user.service";
import { RootSiblingParent } from "react-native-root-siblings";
import { updateUserState } from "./store/user/slice";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
      <Stack.Screen name="Estadisticas" component={Estadisticas} options={{ headerShown: false }} />
      <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
      <Stack.Screen
        name="Registrar"
        component={RegistrarUsuario}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
      <Stack.Screen name="Manual" component={Manual} options={{ headerShown: false }} />
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
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(
      async (userSigned) => {
        if (userSigned) {
          const tokenResult = await userSigned.getIdTokenResult();
          if (tokenResult.token) {
            const user = await findUserById(userSigned.uid);
            dispatch(
              updateUserState({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                exercises: user.exercises ? user.exercises : [],
              })
            );
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </RootSiblingParent>
  );
}
