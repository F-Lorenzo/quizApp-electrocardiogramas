import React, { useEffect, useReducer, useState } from "react";
import * as Font from "expo-font";
import { Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import Header from "../components/Header";
import usuario from "../assets/images/usuario.png";
import estadisticasImg from "../assets/images/estadisticas.png";
import Ejercicios from "../assets/images/ejercicios.png";
import Completar from "../assets/images/completar.png";
import MultipleChoice from "../assets/images/multiple-choice.png";
import concideracionesClinicas from "../assets/images/consideraciones_clinicas.png";
import ejerciciosConcideraciones from "../db/ejerciciosTest.json";
import { useSelector } from "react-redux";

function Perfil({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const user = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        MontserratRegular: Montserrat_400Regular,
      });
      await Font.loadAsync({
        MontserratMedium: Montserrat_500Medium,
      });

      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text> font don't charge</Text>;
  }

  return (
    <View style={Styles.principalContainer}>
      <Header />
      {user ? (
        <ScrollView>
          <View style={Styles.perfil}>
            <View style={Styles.perfilHeader}>
              <Image style={Styles.imagePerfil} source={usuario} />
              <View style={Styles.linea}></View>
              <Text style={Styles.texto}>MI PERFIL</Text>
            </View>
            <View style={Styles.datos}>
              <View style={Styles.celdas}>
                <Text style={Styles.label}>Nombre</Text>
                <TextInput style={Styles.input}></TextInput>
              </View>
              <View style={Styles.celdas}>
                <Text style={Styles.label}>Apellido</Text>
                <TextInput style={Styles.input}></TextInput>
              </View>
              <View style={Styles.celdas}>
                <Text style={Styles.label}>E-Mail</Text>
                <TextInput style={Styles.input}></TextInput>
              </View>
              <View style={Styles.celdas}>
                <Text style={Styles.label}>Contraseña</Text>
                <TextInput style={Styles.input}></TextInput>
              </View>
            </View>
            <TouchableOpacity style={Styles.botonModificar}>
              <Text style={Styles.textoBoton}>MODIFICAR DATOS</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.estadisticas}>
            <View style={Styles.perfilHeader}>
              <Image style={Styles.imgEstadisticas} source={estadisticasImg} />
              <View style={Styles.linea}></View>
              <Text style={Styles.texto}>MIS ESTADISTICAS</Text>
            </View>
            <TouchableOpacity
              style={Styles.container}
              onPress={() =>
                navigation.navigate("Estadisticas", {
                  img: Ejercicios,
                  title: "Interpretacion de electrocardiograma",
                  ejercicios: ejerciciosConcideraciones,
                })
              }>
              <View style={Styles.buttonContainer}>
                <Image style={Styles.image} source={Ejercicios} />
                <Text style={Styles.texto}>Interpretacion de electrocardiograma</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Estadisticas", {
                  img: Completar,
                  title: "Complete los Casilleros",
                  ejercicios: ejerciciosConcideraciones,
                })
              }
              style={Styles.container}>
              <View style={Styles.buttonContainer}>
                <Image style={Styles.image} source={Completar} />
                <Text style={Styles.texto}>Complete los Casilleros</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Estadisticas", {
                  img: MultipleChoice,
                  title: "Multiple choice",
                  ejercicios: ejerciciosConcideraciones,
                })
              }
              style={Styles.container}>
              <View style={Styles.buttonContainer}>
                <Image style={Styles.image} source={MultipleChoice} />
                <Text style={Styles.texto}>Multiple choice</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Estadisticas", {
                  img: concideracionesClinicas,
                  title: "Consideraciones Clinicas",
                  ejercicios: ejerciciosConcideraciones,
                })
              }
              style={Styles.container}>
              <View style={Styles.buttonContainer}>
                <Image style={Styles.image} source={concideracionesClinicas} />
                <Text style={Styles.texto}>Consideraciones Clinicas</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={Styles.notLoggedView}>
          <TouchableOpacity style={Styles.buttons} onPress={() => navigation.navigate("Registrar")}>
            <Text style={Styles.textoBoton}>REGISTRARME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.buttons} onPress={() => navigation.navigate("Login")}>
            <Text style={Styles.textoBoton}>INICIAR SESIÓN</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  principalContainer: {
    flex: 1,
    backgroundColor: "#3b3a3a",
  },
  perfil: {
    backgroundColor: "#3b3a3a",
    height: 500,
    alignItems: "center",
  },
  perfilHeader: {
    justifyContent: "center",
    alignItems: "center",
  },
  imagePerfil: {
    width: 70,
    height: 70,
  },
  linea: {
    height: 2,
    width: 30,
    backgroundColor: "#fff",
    margin: 4,
  },
  texto: {
    color: "#fff",
    fontFamily: "MontserratRegular",
    fontSize: 12,
  },
  datos: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  celdas: {
    flexDirection: "row",
    margin: 20,
  },
  label: {
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    color: "#fff",
    fontFamily: "MontserratRegular",
    backgroundColor: "#b3b5b3",
    padding: 5,
    width: 100,
    height: 30,
  },
  input: {
    backgroundColor: "#6e6e6e",
    width: 200,
    height: 30,
    color: "#fff",
    fontFamily: "MontserratRegular",
  },
  botonModificar: {
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#77bf02",
    width: 150,
    padding: 5,
    alignItems: "center",
  },
  textoBoton: {
    fontFamily: "MontserratRegular",
    color: "#fff",
  },
  estadisticas: {
    backgroundColor: "#5c5a5a",
    height: 600,
  },
  imgEstadisticas: {
    width: 70,
    height: 70,
  },
  image: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
  },
  container: {
    justifyContent: "center",
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notLoggedView: {
    flexGrow: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#77bf02",
    width: 150,
    padding: 5,
    alignItems: "center",
    margin: 10,
  },
});

export default Perfil;
