import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ejerciciosTest from "../db/ejerciciosTest.json";
import Ejercicios from "../assets/images/ejercicios.png";
import actividades from "../assets/images/actividades.png";
import candado from "../assets/images/candado.png";
import level1Img from "../assets/images/ejercicios-nivel1.png";
import level2Img from "../assets/images/ejercicios-nivel2.png";
import level3Img from "../assets/images/ejercicios-nivel3.png";
import level1Activo from "../assets/images/ejercicios-nivel1-activo.png";
import level2Activo from "../assets/images/ejercicios-nivel2-activo.png";
import level3Activo from "../assets/images/ejercicios-nivel3-activo.png";
import todosImg from "../assets/images/ejercicios-todos.png";
import noRealizadosImg from "../assets/images/ejercicios-sin-realizar.png";
import realizadosImg from "../assets/images/ejercicios-realizados.png";
import destacadosImg from "../assets/images/ejercicios-destacados.png";
import resueltosImg from "../assets/images/ejercicios-ok.png";
import malResueltosImg from "../assets/images/ejercicios-mal-hechos.png";
import noRealizadosActivo from "../assets/images/ejercicios-sin-realizar-activo.png";
import realizadosActivo from "../assets/images/ejercicios-realizados-activo.png";
import destacadosActivo from "../assets/images/ejercicios-destacados-activo.png";
import resueltosActivo from "../assets/images/ejercicios-ok-activo.png";
import todosActivo from "../assets/images/ejercicios-todos-activo.png";
import Header from "../components/Header";

function InterpretacionElectro({ navigation }) {
  const [level1, setLevel1] = useState(false);
  const [level2, setLevel2] = useState(false);
  const [level3, setLevel3] = useState(false);
  const [todos, setTodos] = useState(true);
  const [noRealizados, setNoRealizados] = useState(false);
  const [realizados, setRealizados] = useState(false);
  const [destacados, setDestacados] = useState(false);
  const [resueltos, setResueltos] = useState(false);
  const [malResueltos, setMalResueltos] = useState(false);
  const [ejercicios, setEjercicios] = useState(ejerciciosTest);
  const [ejerciciosAux, setEjerciciosAux ] = useState(ejerciciosTest);
  const [fontLoaded, setFontLoaded] = useState(false);

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

  console.log(ejercicios, "ejercicios");

  const resetAllFilters = () => {
    setLevel1(false);
    setLevel2(false);
    setLevel3(false);
    setTodos(false);
    setNoRealizados(false);
    setRealizados(false);
    setDestacados(false);
    setResueltos(false);
    setMalResueltos(false);
  }

  const resetFilters = () => {
    setNoRealizados(false);
    setRealizados(false);
    setDestacados(false);
    setResueltos(false);
    setMalResueltos(false);
  }

  const activeHandlerLevel1 = () => {
    resetAllFilters();
    setLevel1(!level1);
    if (!level1) {     
      let ejercicio = ejerciciosTest.filter(
        (ejercicio) => ejercicio.nivel === "1"
      );
      setEjercicios(ejercicio);
      setEjerciciosAux(ejercicio);
    } else {
      activeHandlerTodos();
    }
    console.log(ejercicios, "1");
  };
  const activeHandlerLevel2 = () => {
    resetAllFilters();
    setLevel2(!level2);
    if (!level2) {
      let ejercicio = ejerciciosTest.filter(
        (ejercicio) => ejercicio.nivel === "2"
      );
      setEjercicios(ejercicio);
      setEjerciciosAux(ejercicio);
    } else {
      activeHandlerTodos();
    }
    console.log(ejercicios, "2");
  };
  const activeHandlerLevel3 = () => {
    resetAllFilters();
    setLevel3(!level3);
    if (!level3) {
      let ejercicio = ejerciciosTest.filter(
        (ejercicio) => ejercicio.nivel === "3"
      );
      setEjercicios(ejercicio);
      setEjerciciosAux(ejercicio);
    } else {
      activeHandlerTodos();
    }
    console.log(ejercicios, "3");
  };
  const activeHandlerTodos = () => {
    resetAllFilters();
    setTodos(!todos);
    if (todos === false) {
      let ejercicio = ejerciciosTest;
      setEjercicios(ejercicio);
      setEjerciciosAux(ejercicio);
    } else {
      let ejercicio = [];
      setEjercicios(ejercicio);
      setEjerciciosAux(ejercicio);
    }
  };
  const activeHandlerNoRealizados = () => {
    resetFilters();
    setNoRealizados(!noRealizados);
    if (noRealizados === false) {
      let ejercicio = ejerciciosAux.filter(
        (ejercicio) => ejercicio.realizado === false
      );
      setEjercicios(ejercicio);
    } else {
      //let ejercicio = ejerciciosTest;
      setEjercicios(ejerciciosAux);
    }
  };
  const activeHandlerRealizados = () => {
    resetFilters();
    setRealizados(!realizados);
    if (realizados === false) {
      let ejercicio = ejerciciosAux.filter(
        (ejercicio) => ejercicio.realizado === true
      );
      setEjercicios(ejercicio);
    } else {
      //let ejercicio = ejerciciosTest;
      setEjercicios(ejerciciosAux);
    }
  };
  const activeHandlerDestacados = () => {
    resetFilters();
    setDestacados(!destacados);
    if (destacados === false) {
      let ejercicio = ejerciciosAux.filter(
        (ejercicio) => ejercicio.destacado === true
      );
      setEjercicios(ejercicio);
    } else {
      //let ejercicio = ejerciciosTest;
      setEjercicios(ejerciciosAux);
    }
  };
  const activeHandlerResueltos = () => {
    resetFilters();
    setResueltos(!resueltos);
    if (resueltos === false) {
      let ejercicio = ejerciciosAux.filter(
        (ejercicio) => ejercicio.bienResuelto === true
      );
      setEjercicios(ejercicio);
    } else {
      //let ejercicio = ejerciciosTest;
      setEjercicios(ejerciciosAux);
    }
  };
  const activeHandlerMalResueltos = () => {
    resetFilters();
    setMalResueltos(!malResueltos);
    if (malResueltos === false) {
      let ejercicio = ejerciciosAux.filter(
        (ejercicio) => ejercicio.malResuelto === true
      );
      setEjercicios(ejercicio);
    } else {
      //let ejercicio = ejerciciosTest;
      setEjercicios(ejerciciosAux);
    }
  };

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
            <TouchableOpacity
              onPress={activeHandlerLevel1}
              style={Styles.levelButton}
            >
              {level1 === true ? (
                <Image style={Styles.imageLevel} source={level1Activo} />
              ) : (
                <Image style={Styles.imageLevel} source={level1Img} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={activeHandlerLevel2}
              style={Styles.levelButton}
            >
              {level2 === true ? (
                <Image style={Styles.imageLevel} source={level2Activo} />
              ) : (
                <Image style={Styles.imageLevel} source={level2Img} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={activeHandlerLevel3}
              style={Styles.levelButton}
            >
              {level3 === true ? (
                <Image style={Styles.imageLevel} source={level3Activo} />
              ) : (
                <Image style={Styles.imageLevel} source={level3Img} />
              )}
            </TouchableOpacity>
          </View>
          <View style={Styles.typeFilters}>
            <TouchableOpacity
              onPress={activeHandlerTodos}
              style={Styles.typeButton}
            >
              {todos === true ? (
                <Image style={Styles.imagesType} source={todosActivo} />
              ) : (
                <Image style={Styles.imagesType} source={todosImg} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={activeHandlerNoRealizados}
              style={Styles.typeButton}
            >
              {noRealizados === true ? (
                <Image style={Styles.imagesType} source={noRealizadosActivo} />
              ) : (
                <Image style={Styles.imagesType} source={noRealizadosImg} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={activeHandlerRealizados}
              style={Styles.typeButton}
            >
              {realizados === true ? (
                <Image style={Styles.imagesType} source={realizadosActivo} />
              ) : (
                <Image style={Styles.imagesType} source={realizadosImg} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={activeHandlerDestacados}
              style={Styles.typeButton}
            >
              {destacados === true ? (
                <Image style={Styles.imagesType} source={destacadosActivo} />
              ) : (
                <Image style={Styles.imagesType} source={destacadosImg} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={activeHandlerResueltos}
              style={Styles.typeButton}
            >
              {resueltos === true ? (
                <Image style={Styles.imagesType} source={resueltosActivo} />
              ) : (
                <Image style={Styles.imagesType} source={resueltosImg} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={activeHandlerMalResueltos}
              style={Styles.typeButton}
            >
              {malResueltos === true ? (
                <Image style={Styles.imagesType} source={malResueltosImg} />
              ) : (
                <Image style={Styles.imagesType} source={malResueltosImg} />
              )}
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
            data={ejercicios}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PlantillaInterpretacion", {
                    key: item.key,
                  })
                }
                style={Styles.ejerciciosContainer}
              >
                <Text style={Styles.numbers}>{item.key}</Text>
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
    marginTop: 20,
    height: 200,
    border: "1px solid white",
  },
  levelFilters: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  levelButton: {
    margin: 5,
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
    fontFamily: "MontserratRegular",
    fontSize: 20,
    marginBottom: 5,
  },
  numbers: {
    color: "#FFFFFF",
    fontFamily: "MontserratRegular",
    fontSize: 14,
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
