import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import LogoApp from "../assets/images/LogoApp.png";

function Header() {
  return (
    <View style={Styles.container}>
      <Image style={Styles.image} source={LogoApp} />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    flexDirection: "row",
    height: 60,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default Header;
