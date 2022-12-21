import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import realizado from "../assets/images/ejercicios-realizados.png";
import destacado from "../assets/images/ejercicios-destacados.png";
import correcto from "../assets/images/ejercicios-ok.png";
import incorrecto from "../assets/images/ejercicios-mal-hechos.png";
import electrocardiogramaTest from "../assets/images/electrocardiogramaTest.png";
import LogoApp from "../assets/images/LogoApp.png";
import actividades from "../assets/images/actividades.png";
import ejercicios from "../assets/images/ejercicios.png";

function PlantillaInterpretacion({ navigation }) {
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
            <Text style={Styles.titleTextMain}>N1-</Text>
            <Text style={Styles.titleTextEjercicio}>N°001</Text>
          </View>
          <View style={Styles.state}>
            <TouchableOpacity>
              <Image style={Styles.stateImage} source={realizado} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={Styles.stateImage} source={destacado} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={Styles.stateImage} source={correcto} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={Styles.stateImage} source={incorrecto} />
            </TouchableOpacity>
          </View>
          {/* <Text style={Styles.consigna}>
            Describa en el siguiente elctrocardiograma ritmo,frecuencia cardiaca
            y eje electrico del complejo QRS
          </Text> */}
        </View>
        <ScrollView horizontal={true} style={Styles.ejercicio}>
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

export default PlantillaInterpretacion;
