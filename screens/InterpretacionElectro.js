import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import InterpretacionLogo from "../assets/interpretacionLogo.png";
import Header from "../components/Header";

function InterpretacionElectro() {
  const [isSelected, setisSelected] = useState(false);
  return (
    <View
      style={{
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#616161",
      }}
    >
      <Header />
      <View style={{ flex: 1, flexDirection: "column", height: "80%" }}>
        <View style={Styles.title}>
          <Image style={Styles.image} source={InterpretacionLogo} />
          <Text style={Styles.text}>Interpretacion de electrocardiograma</Text>
        </View>
        <View></View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  header: {
    height: "20%",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 35,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default InterpretacionElectro;
