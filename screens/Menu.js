import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ejercicios from "../assets/images/ejercicios.png";
import Completar from "../assets/images/completar.png";
import MultipleChoice from "../assets/images/multiple-choice.png";
import concideracionesClinicas from "../assets/images/consideraciones_clinicas.png";
import Header from "../components/Header";
import Toast from "react-native-root-toast";

function Menu({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        MontserratRegular: Montserrat_400Regular,
      });

      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text> font don't charge</Text>;
  }

  const handlerShowAlert = () => {
    Toast.show("Implementación de funcionalidades en desarrollo para este tipo de ejercicio", {
      duration: Toast.durations.LONG,
      position: 50,
      shadow: true,
      animation: true,
      hideOnPress: true,
      opacity: 1,
      backgroundColor: "#ef4444",
    });
  };

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Header style={{ paddignTop: 10 }} />

      <TouchableOpacity
        style={Styles.container1}
        onPress={() => navigation.navigate("InterpretacionElectro")}>
        <View style={Styles.buttonContainer}>
          <Image style={Styles.image} source={Ejercicios} />
          <Text style={Styles.text}>Interpretacion de electrocardiograma</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("CompleteCasilleros")}
        style={Styles.container2}>
        <View style={Styles.buttonContainer}>
          <Image style={Styles.image} source={Completar} />
          <Text style={Styles.text}>Complete los Casilleros</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("MultipleChoice")}
        style={Styles.container1}>
        <View style={Styles.buttonContainer}>
          <Image style={Styles.image} source={MultipleChoice} />
          <Text style={Styles.text}>Multiple choice</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlerShowAlert} style={Styles.container2}>
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
    fontSize: 14,
    fontFamily: "MontserratRegular",
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
