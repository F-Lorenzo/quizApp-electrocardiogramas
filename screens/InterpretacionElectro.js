import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ejercicios from "../assets/images/ejercicios.png";
import actividades from "../assets/images/actividades.png";
import candado from "../assets/images/candado.png";
import level1 from "../assets/images/ejercicios-nivel1.png";
import level2 from "../assets/images/ejercicios-nivel2.png";
import level3 from "../assets/images/ejercicios-nivel3.png";
// import level1Activo from "../assets/images/ejercicios-nivel1-activo.png";
// import level2Activo from "../assets/images/ejercicios-nivel2-activo.png";
// import level3Activo from "../assets/images/ejercicios-nivel3-activo.png";
import todos from "../assets/images/ejercicios-todos.png";
import noRealizados from "../assets/images/ejercicios-sin-realizar.png";
import realizados from "../assets/images/ejercicios-realizados.png";
import destacados from "../assets/images/ejercicios-destacados.png";
import resueltos from "../assets/images/ejercicios-ok.png";
import malResueltos from "../assets/images/ejercicios-mal-hechos.png";
import noRealizadosActivo from "../assets/images/ejercicios-sin-realizar-activo.png";
import realizadosActivo from "../assets/images/ejercicios-realizados-activo.png";
import destacadosActivo from "../assets/images/ejercicios-destacados-activo.png";
import resueltosActivo from "../assets/images/ejercicios-ok-activo.png";
import todosActivo from "../assets/images/ejercicios-todos-activo.png";
import Header from "../components/Header";

function InterpretacionElectro({ navigation }) {
  return (
    <View
      style={{
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#616161",
      }}
    >
      <Header />
      <TouchableOpacity
        onPress={() => navigation.navigate("Menu")}
        style={Styles.backToMenu}
      >
        <Image style={Styles.imageActividades} source={actividades} />
      </TouchableOpacity>
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
        <View style={Styles.filtersContainer}>
          <View style={Styles.levelFilters}>
            <TouchableOpacity style={Styles.levelButton}>
              <Image style={Styles.imageLevel} source={level1} />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.levelButton}>
              <Image style={Styles.imageLevel} source={level2} />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.levelButton}>
              <Image style={Styles.imageLevel} source={level3} />
            </TouchableOpacity>
          </View>
          <View style={Styles.typeFilters}>
            <TouchableOpacity style={Styles.typeButton}>
              <Image style={Styles.imagesType} source={todos} />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.typeButton}>
              <Image style={Styles.imagesType} source={noRealizados} />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.typeButton}>
              <Image style={Styles.imagesType} source={realizados} />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.typeButton}>
              <Image style={Styles.imagesType} source={destacados} />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.typeButton}>
              <Image style={Styles.imagesType} source={resueltos} />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.typeButton}>
              <Image style={Styles.imagesType} source={malResueltos} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: "35%",
            marginLeft: 15,
            marginRight: 15,
            backgroundColor: "#3b3a3a",
          }}
        >
          <FlatList
            data={[
              { key: "001" },
              { key: "002" },
              { key: "003" },
              { key: "004" },
              { key: "005" },
              { key: "006" },
              { key: "007" },
              { key: "008" },
              { key: "009" },
              { key: "010" },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity style={Styles.ejerciciosContainer}>
                <Text style={Styles.text}>{item.key}</Text>
                <TouchableOpacity style={Styles.candado}>
                  <Image style={Styles.imageCandado} source={candado} />
                </TouchableOpacity>
              </TouchableOpacity>
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
  backToMenu: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#77bf02",
  },
  title: {
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  filtersContainer: {
    height: 200,
    border: "1px solid white",
  },
  levelFilters: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  levelButton: {
    margin: 3,
  },
  typeFilters: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  typeButton: {
    margin: 6,
  },
  ejerciciosContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 40,
  },
  candado: {
    position: "absolute",
    right: 10,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "thin",
    fontSize: 16,
    margin: 5,
  },
  image: {
    width: 60,
    height: 60,
  },
  imageActividades: {
    width: 100,
    height: 100,
  },
  imageLevel: {
    width: 100,
    height: 100,
  },
  imageCandado: {
    width: 30,
    height: 30,
  },
  imagesType: {
    width: 43,
    height: 43,
  },
});

export default InterpretacionElectro;
