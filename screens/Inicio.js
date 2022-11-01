import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import InterpretacionLogo from "../assets/interpretacionLogo.png";
import ChoiceLogo from "../assets/choiceLogo.png";
import SerchLogo from "../assets/serchLogo.png";
import Header from "../components/Header";

function Inicio({ navigation }) {
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Header />

      <TouchableOpacity
        style={Styles.container1}
        onPress={() => navigation.navigate("InterpretacionElectro")}
      >
        <Image style={Styles.image} source={InterpretacionLogo} />
        <Text style={Styles.text}>Interpretacion de electrocardiograma</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.container2}>
        <Image style={Styles.image} source={InterpretacionLogo} />
        <Text style={Styles.text}>Complete los Casilleros</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.container1}>
        <Image style={Styles.image} source={ChoiceLogo} />
        <Text style={Styles.text}>Multiple choice</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.container2}>
        <Image style={Styles.image} source={SerchLogo} />
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
    backgroundColor: "#B0B0B0",
  },
  container2: {
    flex: 1,
    height: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#616161",
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
