import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import LogoApp from "../assets/images/LogoApp.png";
import usuario from "../assets/images/usuario.png";
import manual from "../assets/images/manual.png";
import actividades from "../assets/images/actividades.png";

function Inicio({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        MontserratRegular: Montserrat_400Regular,
      });
      await Font.loadAsync({
        MonserratMedium: Montserrat_500Medium,
      });

      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text> font don't charge</Text>;
  }

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View style={Styles.header}>
        <Image style={Styles.imageHeader} source={LogoApp} />
        <View>
          <Text style={{ fontFamily: "MontserratMedium", fontSize: 24 }}>
            ECG STUDIO
          </Text>
          <Text style={{ fontFamily: "MontserratRegular" }}>
            MANUAL INTERACTIVO{" "}
          </Text>
          <Text style={{ fontFamily: "MontserratRegular" }}>
            DE ELECTROCARDIOGRAFIA
          </Text>
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
          <View style={Styles.linea}></View>
          <Text style={Styles.manualText}>Manual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.actividades}
          onPress={() => navigation.navigate("Menu")}
        >
          <Image style={Styles.imageActividades} source={actividades} />
          <View style={Styles.linea}></View>
          <Text style={Styles.actividadesText}>Actividades</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.footer}>
        <Image style={Styles.imageFooter} source={LogoApp} />
        <View>
          <Text style={{ fontFamily: "MontserratRegular" }}>@copyRight</Text>
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    height: 120,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    fontFamily: "MontserratRegular",
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
  manualText: { color: "white", fontFamily: "MontserratRegular" },
  actividades: {
    flex: 1,
    backgroundColor: "#3b3a3a",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "MontserratRegular",
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
  linea: {
    width: 30,
    height: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
});

export default Inicio;
