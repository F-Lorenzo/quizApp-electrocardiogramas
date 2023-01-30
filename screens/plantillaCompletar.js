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

function PlantillaCompletar({ route, navigation }) {
  const { key } = route.params;
  const ejercicio = ejerciciosTest.find((ejercicio) => ejercicio.key === key);

  const handlerRealizado = () => {};

  return (
    <View style={Styles.container}>
      <View style={Styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
          <Image style={Styles.imageNav} source={ejercicios} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
          <Image style={Styles.imageNav} source={actividades} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("InterpretacionElectro")}
        >
          <Image style={Styles.imageNav} source={LogoApp} />
        </TouchableOpacity>
      </View>
      <View style={Styles.body}>
        <View style={Styles.bodyHeader}>
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
          {/* <Text style={Styles.consigna}>
            Describa en el siguiente elctrocardiograma ritmo,frecuencia cardiaca
            y eje electrico del complejo QRS
          </Text> */}
        </View>
        <ScrollView horizontal={true} style={Styles.ejercicio}>
          <View>
            <View style={Styles.respuestaContainer}>
              <Text style={Styles.respuestaText}>Su respuesta:</Text>
              <TextInput style={Styles.respuestaUsuario}> </TextInput>
            </View>
            <View style={Styles.imagenEjercicioContainer}>
              <Image
                style={Styles.imagenEjercicio}
                source={electrocardiogramaTest}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  nav: {
    height: 60,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    rotation: 90,
    marginBottom: 30,
    flexDirection: "row",
  },
  titleTextMain: {
    color: "#fff",
    fontWeight: "bold",
  },
  titleTextEjercicio: {
    color: "#fff",
  },
  // consigna: {
  //   rotation: 90,
  //   width: 200,
  //   height: 100,
  // },
  body: {
    flexDirection: "row",
  },
  bodyHeader: {
    height: 607,
    width: 50,
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 30,
    right: 0,
    backgroundColor: "#3b3a3a",
  },
  ejercicio: {
    height: 700,
    width: 500,
    position: "relative",
    right: 50,
    flexDirection: "row",
  },
  imagenEjercicio: {
    height: 500,
    width: 550,
    rotation: 90,
  },
  respuestaContainer: {
    rotation: 90,
    backgroundColor: "red",
    flexDirection: "row",
    height: 100,
    width: 200,
  },
  respuestaText: {
    backgroundColor: "#fff",
    marginleft: 100,
  },
  stateImage: {
    height: 30,
    width: 30,
    rotation: 90,
  },
  imageNav: {
    height: 50,
    width: 50,
    rotation: 90,
  },
});

export default PlantillaCompletar;
