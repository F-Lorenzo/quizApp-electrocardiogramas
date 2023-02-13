import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

function ConsignaChoice({ consigna }) {
  const [fontLoaded, setFontLoaded] = useState(false);

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
    <View style={Styles.consignaExtendida}>
      <TouchableOpacity style={Styles.opciones1}>
        <Text>A- {consigna.a}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={Styles.opciones2}>
        <Text>B- {consigna.b}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={Styles.opciones1}>
        <Text>C- {consigna.c}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={Styles.opciones2}>
        <Text>D-{consigna.d}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={Styles.opciones1}>
        <Text>E- {consigna.e}</Text>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  consignaExtendida: {
    width: 400,
    height: 100,
    color: "#fff",
    padding: "0.5%",
    borderTopRightRadius: 30,
    marginTop: 130,
  },
  opciones1: {
    color: "#fff",
    fontFamily: "MontserratRegular",
    backgroundColor: "rgba(71, 71, 71, 0.5)",
    height: 60,
    justifyContent: "center",
  },
  opciones2: {
    color: "#fff",
    fontFamily: "MontserratRegular",
    backgroundColor: " rgba(135, 135, 135, 0.5)",
    height: 60,
    justifyContent: "center",
  },
});

export default ConsignaChoice;
