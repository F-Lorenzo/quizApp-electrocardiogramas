import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import noRealizadosActivo from "../assets/images/ejercicios-sin-realizar-activo.png";
import realizadosActivo from "../assets/images/ejercicios-realizados-activo.png";
import destacadosActivo from "../assets/images/ejercicios-destacados-activo.png";
import resueltosActivo from "../assets/images/ejercicios-ok-activo.png";
import todosActivo from "../assets/images/ejercicios-todos-activo.png";
import { useSelector } from "react-redux";

function Estadisticas({ navigation, route }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const { title, img, type } = route.params;
  const user = useSelector((state) => state.user);

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
  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.headerContainer}>
        <Image style={Styles.image} source={img} />
        <Text style={Styles.texto}>{title}</Text>
      </View>
      <View style={Styles.stats}>
        <Image style={Styles.imgs} source={noRealizadosActivo} />
        <Image style={Styles.imgs} source={realizadosActivo} />
        <Image style={Styles.imgs} source={destacadosActivo} />
        <View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 10,
              color: "white",
            }}>
            {user.exercises.filter((exercise) => exercise.type === type).length}
          </Text>
          <Image style={Styles.imgs} source={resueltosActivo} />
        </View>
        <Image style={Styles.imgs} source={todosActivo} />
      </View>
      <View style={Styles.decoracion}></View>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#3b3a3a",
    height: "100%",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 50,
    marginHorizontal: 20,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
  },
  texto: {
    fontFamily: "MontserratRegular",
    color: "#fff",
  },
  imgs: {
    width: 50,
    height: 50,
    margin: 3,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    height: 400,
  },
  decoracion: {
    width: 274,
    height: 10,
    backgroundColor: "#fff",
    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,
  },
});

export default Estadisticas;
