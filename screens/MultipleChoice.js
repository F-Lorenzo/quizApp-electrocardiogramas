import React, { useState, useEffect } from "react";
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
import multipleChoice from "../assets/images/multiple-choice.png";
import candado from "../assets/images/candado.png";
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
import { getExercises } from "../api/services/exercise.service";
import Toast from "react-native-root-toast";
import { MULTIPLE_CHOICE } from "../config/exercisesType";
import { useSelector } from "react-redux";

function MultipleChoice({ navigation }) {
  const [todos, setTodos] = useState(true);
  const [noRealizados, setNoRealizados] = useState(false);
  const [realizados, setRealizados] = useState(false);
  const [destacados, setDestacados] = useState(false);
  const [resueltos, setResueltos] = useState(false);
  const [malResueltos, setMalResueltos] = useState(false);
  const [ejercicios, setEjercicios] = useState([]);
  const [filteredExercices, setFilteredExercices] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    loadExercices();
  }, []);

  const loadExercices = async () => {
    try {
      const exercises = await getExercises(MULTIPLE_CHOICE);
      console.log(exercises);
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

  const resetFilters = () => {
    setTodos(false);
    setNoRealizados(false);
    setRealizados(false);
    setDestacados(false);
    setResueltos(false);
    setMalResueltos(false);
  };

  const activeHandlerTodos = () => {
    resetFilters();
    setTodos(!todos);
    if (todos === false) {
      setFilteredExercices(ejercicios);
    } else {
      setFilteredExercices([]);
    }
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
        (ejercicio) => ejercicio.status.includes("realizado") && ejercicio.type === MULTIPLE_CHOICE
      );
      setFilteredExercices(ejercicio);
    } else {
      activeHandlerTodos();
    }
  };
  const activeHandlerDestacados = () => {
    resetFilters();
    setDestacados(!destacados);
    if (destacados === false) {
      let ejercicio = user.exercises.filter(
        (ejercicio) => ejercicio.status.includes("destacados") && ejercicio.type === MULTIPLE_CHOICE
      );
      setFilteredExercices(ejercicio);
    } else {
      activeHandlerTodos();
    }
  };
  const activeHandlerResueltos = () => {
    resetFilters();
    setResueltos(!resueltos);
    if (resueltos === false) {
      let ejercicio = user.exercises.filter(
        (ejercicio) => ejercicio.status.includes("correcto") && ejercicio.type === MULTIPLE_CHOICE
      );
      setFilteredExercices(ejercicio);
    } else {
      activeHandlerTodos();
    }
  };
  const activeHandlerMalResueltos = () => {
    resetFilters();
    setMalResueltos(!malResueltos);
    if (malResueltos === false) {
      let ejercicio = user.exercises.filter(
        (ejercicio) => ejercicio.status.includes("incorrecto") && ejercicio.type === MULTIPLE_CHOICE
      );
      setFilteredExercices(ejercicio);
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
          <Image style={Styles.image} source={multipleChoice} />
          <Text style={Styles.text}>Multiple choice</Text>
        </View>
        <View style={Styles.filtersContainer}>
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
            height: "60%",
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
                    navigation.navigate("PlantillaChoice", {
                      exercise: item,
                    })
                  }
                  style={Styles.ejerciciosContainer}>
                  <Text style={Styles.text}>{item.key}</Text>
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
    alignItems: "center",
  },
  filtersContainer: {
    height: 80,
    border: "1px solid white",
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

export default MultipleChoice;
