import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ejercicios from "../assets/ejercicios.png";
import Completar from "../assets/completar.png";
import MultipleChoice from "../assets/multiple-choice.png";
import Header from "../components/Header";

function Inicio({ navigation }) {
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Header />

      <TouchableOpacity
        style={Styles.container1}
        onPress={() => navigation.navigate("InterpretacionElectro")}
      >
        <Image style={Styles.image} source={Ejercicios} />
        <Text style={Styles.text}>Interpretacion de electrocardiograma</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.container2}>
        <Image style={Styles.image} source={Completar} />
        <Text style={Styles.text}>Complete los Casilleros</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.container1}>
        <Image style={Styles.image} source={MultipleChoice} />
        <Text style={Styles.text}>Multiple choice</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.container2}>
        <Image style={Styles.image} source={MultipleChoice} />
        <Text style={Styles.text}>Consideraciones Clinicas</Text>
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
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    height: "20%",
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    flexDirection: "row",
  },
});

export default Inicio;
