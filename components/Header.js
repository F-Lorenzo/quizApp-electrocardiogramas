import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import LogoApp from "../assets/images/LogoApp.png";
import { useNavigation } from "@react-navigation/native";

function Header() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate("Inicio")}>
      <View style={Styles.container}>
        <Image style={Styles.image} source={LogoApp} />
      </View>
    </Pressable>
  );
}

const Styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    flexDirection: "row",
    height: 80,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default Header;
