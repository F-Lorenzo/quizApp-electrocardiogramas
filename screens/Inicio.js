import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import LogoApp from "../assets/images/LogoApp.png";
import usuario from "../assets/images/usuario.png";
import manual from "../assets/images/manual.png";
import actividades from "../assets/images/actividades.png";

function Inicio({ navigation }) {
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View style={Styles.header}>
        <Image style={Styles.imageHeader} source={LogoApp} />
        <View>
          <Text>ECG STUDIO</Text>
          <Text>MANUAL INTERACTIVO </Text>
          <Text>DE ELECTROCARDIOGRAFIA</Text>
        </View>
      </View>
      <TouchableOpacity
        style={Styles.perfil}
        onPress={() => navigation.navigate()}
      >
        <Image style={Styles.imagePerfil} source={usuario} />
      </TouchableOpacity>
      <View style={Styles.container2}>
        <TouchableOpacity
          style={Styles.manual}
          onPress={() => navigation.navigate("Manual")}
        >
          <Image style={Styles.imageManual} source={manual} />
          <Text style={Styles.manualText}>Manual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.actividades}
          onPress={() => navigation.navigate("Menu")}
        >
          <Image style={Styles.imageActividades} source={actividades} />
          <Text style={Styles.actividadesText}>Actividades</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.footer}>
        <Image style={Styles.imageFooter} source={LogoApp} />
        <View>
          <Text>Dr. Vanderluis Claudio</Text>
          <Text>Dr. Hugo Emilio Delgado</Text>
          <Text>Dr. Ramon Alberto Carrizo</Text>
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  header: {
    height: 120,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  perfil: {
    height: 80,
    backgroundColor: "#77bf02",
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  manual: {
    flex: 1,
    backgroundColor: "#5c5a5a",
    justifyContent: "center",
    alignItems: "center",
  },
  manualText: { color: "white" },
  actividades: {
    flex: 1,
    backgroundColor: "#3b3a3a",
    justifyContent: "center",
    alignItems: "center",
  },
  actividadesText: { color: "white" },
  footer: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  imageHeader: {
    width: 100,
    height: 100,
  },
  imagePerfil: {
    width: 70,
    height: 70,
  },
  imageManual: {
    width: 100,
    height: 100,
  },
  imageActividades: {
    width: 100,
    height: 100,
  },
  imageFooter: {
    width: 70,
    height: 70,
  },
});

export default Inicio;
