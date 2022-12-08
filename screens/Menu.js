import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ejercicios from "../assets/images/ejercicios.png";
import Completar from "../assets/images/completar.png";
import MultipleChoice from "../assets/images/multiple-choice.png";
import concideracionesClinicas from "../assets/images/consideraciones_clinicas.png";
import Header from "../components/Header";

function Menu({ navigation }) {
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Header />

      <TouchableOpacity
        style={Styles.container1}
        onPress={() => navigation.navigate("InterpretacionElectro")}
      >
        <View style={Styles.buttonContainer}>
          <Image style={Styles.image} source={Ejercicios} />
          <Text style={Styles.text}>Interpretacion de electrocardiograma</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.container2}>
        <View style={Styles.buttonContainer}>
          <Image style={Styles.image} source={Completar} />
          <Text style={Styles.text}>Complete los Casilleros</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.container1}>
        <View style={Styles.buttonContainer}>
          <Image style={Styles.image} source={MultipleChoice} />
          <Text style={Styles.text}>Multiple choice</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.container2}>
        <View style={Styles.buttonContainer}>
          <Image style={Styles.image} source={concideracionesClinicas} />
          <Text style={Styles.text}>Consideraciones Clinicas</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  container1: {
    flex: 1,
    height: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3b3a3a",
  },
  container2: {
    flex: 1,
    height: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5c5a5a",
  },
  header: {
    height: 10,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  image: {
    width: 70,
    height: 70,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    flexDirection: "row",
  },
});

export default Menu;
