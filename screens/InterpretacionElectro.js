import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import Ejercicios from "../assets/images/ejercicios.png";
import Header from "../components/Header";

function InterpretacionElectro() {
  return (
    <View
      style={{
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#616161",
      }}
    >
      <Header />
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          height: "80%",
          justifyContent: "center",
        }}
      >
        <View style={Styles.title}>
          <Image style={Styles.image} source={Ejercicios} />
          <Text style={Styles.text}>Interpretacion de electrocardiograma</Text>
        </View>
        <View
          style={{
            height: "50%",
            marginLeft: 15,
            marginRight: 15,
            backgroundColor: "blue",
          }}
        >
          <FlatList
            data={[
              { key: "Devin" },
              { key: "Dan" },
              { key: "Dominic" },
              { key: "Jackson" },
              { key: "James" },
              { key: "Joel" },
              { key: "John" },
              { key: "Jillian" },
              { key: "Jimmy" },
              { key: "Julie" },
            ]}
            renderItem={({ item }) => (
              <Text style={Styles.text}>{item.key}</Text>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
  },
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
