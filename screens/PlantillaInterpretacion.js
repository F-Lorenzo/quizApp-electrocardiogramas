import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import ejerciciosTest from "../db/ejerciciosTest.json";
import realizado from "../assets/images/ejercicios-realizados.png";
import destacado from "../assets/images/ejercicios-destacados.png";
import correcto from "../assets/images/ejercicios-ok.png";
import incorrecto from "../assets/images/ejercicios-mal-hechos.png";
import realizadoActivo from "../assets/images/ejercicios-realizados-activo.png";
import destacadoActivo from "../assets/images/ejercicios-destacados-activo.png";
import correctoActivo from "../assets/images/ejercicios-ok-activo.png";
// import incorrectoActivo from "../assets/images/ejercicios-mal-hechos.png";
import electrocardiogramaTest from "../assets/images/electrocardiogramaTest.png";
import LogoApp from "../assets/images/LogoApp.png";
import actividades from "../assets/images/actividades.png";
import ejercicios from "../assets/images/ejercicios.png";

function PlantillaInterpretacion({ route, navigation }) {
  useEffect(() => {
    // Bloquea la orientación de la pantalla en "landscape"
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    // Desbloquea la orientación de la pantalla cuando el componente se desmonte
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);
  const { key } = route.params;
  const ejercicio = ejerciciosTest.find((ejercicio) => ejercicio.key === key);

  const handlerRealizado = () => {};

  return (
    <View style={Styles.container}>
      <View style={Styles.nav}>
        <TouchableOpacity
          onPress={() => navigation.navigate("InterpretacionElectro")}
        >
          <Image style={Styles.imageNav} source={ejercicios} />
        </TouchableOpacity>
        <View style={Styles.linea}></View>
        <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
          <Image style={Styles.imageNav} source={actividades} />
        </TouchableOpacity>
        <View style={Styles.linea}></View>
        <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
          <Image style={Styles.imageNav} source={LogoApp} />
        </TouchableOpacity>
      </View>
      <View style={Styles.body}>
        <View style={Styles.bodyHeader}>
          <Text style={Styles.consigna}>
            Describa en el siguiente elctrocardiograma ritmo,frecuencia cardiaca
            y eje electrico del complejo QRS
          </Text>
          <View style={Styles.title}>
            <Text style={Styles.titleTextMain}>N{ejercicio.nivel}-</Text>
            <Text style={Styles.titleTextEjercicio}>{ejercicio.key}</Text>
          </View>
          <View style={Styles.state}>
            <TouchableOpacity onPress={handlerRealizado}>
              {ejercicio.realizado === true ? (
                <Image style={Styles.stateImage} source={realizadoActivo} />
              ) : (
                <Image style={Styles.stateImage} source={realizado} />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              {ejercicio.destacado === true ? (
                <Image style={Styles.stateImage} source={destacadoActivo} />
              ) : (
                <Image style={Styles.stateImage} source={destacado} />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              {ejercicio.correcto === true ? (
                <Image style={Styles.stateImage} source={correctoActivo} />
              ) : (
                <Image style={Styles.stateImage} source={correcto} />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              {ejercicio.incorrecto === true ? (
                <Image style={Styles.stateImage} source={incorrecto} />
              ) : (
                <Image style={Styles.stateImage} source={incorrecto} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView vertical={true} style={Styles.ejercicio}>
          <View style={Styles.plantillaContainer}>
            <View style={Styles.imagenEjercicioContainer}>
              <Image
                style={Styles.imagenEjercicio}
                source={electrocardiogramaTest}
              />
            </View>
            <View style={Styles.respuestaContainer}>
              <Text style={Styles.respuestaText}>Su respuesta:</Text>
              <TextInput style={Styles.respuestaInput}></TextInput>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  nav: {
    backgroundColor: "#3b3a3a",
    width: 80,
    height: "100%",
    alignItems: "center",
  },
  imageNav: {
    width: 50,
    height: 50,
    marginVertical: 30,
  },
  linea: {
    width: 30,
    height: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  body: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  bodyHeader: {
    backgroundColor: "#3b3a3a",
    paddingTop: 10,
    flexDirection: "row",
    height: 60,
    alignItems: "center",
  },
  consigna: {
    width: 400,
  },
  state: {
    flexDirection: "row",
  },
  stateImage: {
    width: 30,
    height: 30,
  },
  ejercicio: {
    width: "100%",
  },
  imagenEjercicioContainer: {
    width: "100%",
    height: 200,
  },
  imagenEjercicio: {
    height: 300,
    width: "90%",
  },
  respuestaContainer: {
    width: "90%",
    backgroundColor: "#3b3a3a",
    flexDirection: "row",
  },
  respuestaInput: {
    height: 100,
    width: "90%",
    backgroundColor: "#333",
  },
});

export default PlantillaInterpretacion;
