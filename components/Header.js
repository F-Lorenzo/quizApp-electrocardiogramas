import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import touchLogo from "../assets/touchLogo.png";

function Header() {
  return (
    <View style={Styles.container}>
      <Image style={Styles.image} source={touchLogo} />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87B140",
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Header;
