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
  ActivityIndicator,
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
import {
  getExercises,
  getExercisesInterpretacion,
  getInterpretaciones,
} from "../api/services/exercise.service";
import Toast from "react-native-root-toast";
import { useSelector } from "react-redux";
import { INTERPRETACION } from "../config/exercisesType";

function InterpretacionElectro({ navigation }) {
  const [level, setLevel] = useState(1);
  const [todos, setTodos] = useState(true);
  const [noRealizados, setNoRealizados] = useState(false);
  const [realizados, setRealizados] = useState(false);
  const [destacados, setDestacados] = useState(false);
  const [resueltos, setResueltos] = useState(false);
  const [malResueltos, setMalResueltos] = useState(false);
  const [ejercicios, setEjercicios] = useState([]);
  const [filteredExercices, setFilteredExercices] = useState([]);
  const [fontLoaded, setFontLoaded] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        MontserratRegular: Montserrat_400Regular,
      });

      setFontLoaded(true);
    };

    loadFont();

    loadExercices();
  }, []);

  const loadExercices = async () => {
    try {
      const exercises = await getExercisesInterpretacion(1);
      setEjercicios(exercises);
      setFilteredExercices(exercises);
    } catch (error) {
      console.log(error);
      Toast.show("Algo salió mal, estamos intentando solucionarlo", {
        duration: Toast.durations.SHORT,
        position: 50,
        shadow: true,
        animation: true,
        hideOnPress: true,
        opacity: 1,
        backgroundColor: "#ef4444",
      });
    }
  };

  if (!fontLoaded) {
    return <Text> font don't charge</Text>;
  }

  const resetAllFilters = () => {
    setLevel(0);
    setTodos(false);
    setNoRealizados(false);
    setRealizados(false);
    setDestacados(false);
    setResueltos(false);
    setMalResueltos(false);
  };

  const resetFilters = () => {
    setTodos(false);
    setNoRealizados(false);
    setRealizados(false);
    setDestacados(false);
    setResueltos(false);
    setMalResueltos(false);
  };

  const activeHandlerLevel1 = async () => {
    resetAllFilters();
    setLevel(1);
    if (level !== 0) {
      const exercises = await getExercisesInterpretacion(1);
      setEjercicios(exercises);
      setFilteredExercices(exercises);
    } else {
      activeHandlerTodos();
    }
  };
  const activeHandlerLevel2 = async () => {
    resetAllFilters();
    setLevel(2);
    if (level !== 0) {
      const exercises = await getExercisesInterpretacion(2);
      setEjercicios(exercises);
      setFilteredExercices(exercises);
    } else {
      activeHandlerTodos();
    }
  };
  const activeHandlerLevel3 = async () => {
    resetAllFilters();
    setLevel(3);
    if (level !== 0) {
      const exercises = await getExercisesInterpretacion(3);
      setEjercicios(exercises);
      setFilteredExercices(exercises);
    } else {
      activeHandlerTodos();
    }
  };
  const activeHandlerTodos = () => {
    resetAllFilters();
    setTodos(!todos);
    setFilteredExercices(ejercicios);
  };
  const activeHandlerNoRealizados = () => {
    resetFilters();
    setNoRealizados(!noRealizados);
    if (noRealizados === false) {
      let ejercicio = ejercicios.filter((ejercicio) => ejercicio.realizado === false);
      setFilteredExercices(ejercicio);
    } else {
      activeHandlerTodos();
    }
  };
  const activeHandlerRealizados = () => {
    resetFilters();
    setRealizados(!realizados);
    if (realizados === false) {
      let ejercicio = user.exercises.filter(
        (ejercicio) => ejercicio.status.includes("realizado") && ejercicio.type === INTERPRETACION
      );
      setFilteredExercices(ejercicio ? ejercicio : []);
    } else {
      activeHandlerTodos();
    }
  };
  const activeHandlerDestacados = () => {
    resetFilters();
    setDestacados(!destacados);
    if (destacados === false) {
      let ejercicio = user.exercises.filter(
        (ejercicio) => ejercicio.status.includes("destacado") && ejercicio.type === INTERPRETACION
      );
      setFilteredExercices(ejercicio ? ejercicio : []);
    } else {
      activeHandlerTodos();
    }
  };
  const activeHandlerResueltos = () => {
    resetFilters();
    setResueltos(!resueltos);
    if (resueltos === false) {
      let ejercicio = user.exercises.filter(
        (ejercicio) => ejercicio.status.includes("correcto") && ejercicio.type === INTERPRETACION
      );
      setFilteredExercices(ejercicio ? ejercicio : []);
    } else {
      activeHandlerTodos();
    }
  };
  const activeHandlerMalResueltos = () => {
    resetFilters();
    setMalResueltos(!malResueltos);
    if (malResueltos === false) {
      let ejercicio = user.exercises.filter(
        (ejercicio) => ejercicio.status.includes("incorrecto") && ejercicio.type === INTERPRETACION
      );
      setFilteredExercices(ejercicio ? ejercicio : []);
    } else {
      activeHandlerTodos();
    }
  };

  return (
    <View
      style={{
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#616161",
      }}>
      <Header />
      <TouchableOpacity onPress={() => navigation.navigate("Menu")} style={Styles.backToMenu}>
        <Image style={Styles.imageActividades} source={actividades} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          height: "80%",
          justifyContent: "center",
        }}>
        <View style={Styles.title}>
          <Image style={Styles.image} source={Ejercicios} />
          <Text style={Styles.text}>Interpretacion de electrocardiograma</Text>
        </View>
        <View style={Styles.filtersContainer}>
          <View style={Styles.levelFilters}>
            <TouchableOpacity onPress={activeHandlerLevel1} style={Styles.levelButton}>
              {level === 1 ? (
                <Image style={Styles.imageLevel} source={level1Activo} />
              ) : (
                <Image style={Styles.imageLevel} source={level1Img} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={activeHandlerLevel2} style={Styles.levelButton}>
              {level === 2 ? (
                <Image style={Styles.imageLevel} source={level2Activo} />
              ) : (
                <Image style={Styles.imageLevel} source={level2Img} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={activeHandlerLevel3} style={Styles.levelButton}>
              {level === 3 ? (
                <Image style={Styles.imageLevel} source={level3Activo} />
              ) : (
                <Image style={Styles.imageLevel} source={level3Img} />
              )}
            </TouchableOpacity>
          </View>
          <View style={Styles.typeFilters}>
            <TouchableOpacity onPress={activeHandlerTodos} style={Styles.typeButton}>
              {todos === true ? (
                <Image style={Styles.imagesType} source={todosActivo} />
              ) : (
                <Image style={Styles.imagesType} source={todosImg} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={activeHandlerNoRealizados} style={Styles.typeButton}>
              {noRealizados === true ? (
                <Image style={Styles.imagesType} source={noRealizadosActivo} />
              ) : (
                <Image style={Styles.imagesType} source={noRealizadosImg} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={activeHandlerRealizados} style={Styles.typeButton}>
              {realizados === true ? (
                <Image style={Styles.imagesType} source={realizadosActivo} />
              ) : (
                <Image style={Styles.imagesType} source={realizadosImg} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={activeHandlerDestacados} style={Styles.typeButton}>
              {destacados === true ? (
                <Image style={Styles.imagesType} source={destacadosActivo} />
              ) : (
                <Image style={Styles.imagesType} source={destacadosImg} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={activeHandlerResueltos} style={Styles.typeButton}>
              {resueltos === true ? (
                <Image style={Styles.imagesType} source={resueltosActivo} />
              ) : (
                <Image style={Styles.imagesType} source={resueltosImg} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={activeHandlerMalResueltos} style={Styles.typeButton}>
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
          }}>
          {filteredExercices.length ? (
            <FlatList
              data={filteredExercices}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PlantillaInterpretacion", {
                      exercise: item,
                    })
                  }
                  style={Styles.ejerciciosContainer}>
                  <Text style={Styles.numbers}>{item.key}</Text>
                  <TouchableOpacity style={Styles.candado}>
                    <Image style={Styles.imageCandado} source={candado} />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>No hay información para mostrar</Text>
            </View>
          )}
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
    width: "90%",
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
