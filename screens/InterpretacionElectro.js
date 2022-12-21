import React, { useState } from "react";
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
  const [level1, setLevel1] = useState(true);
  const [level2, setLevel2] = useState(false);
  const [level3, setLevel3] = useState(false);
  const [todos, setTodos] = useState(true);
  const [noRealizados, setNoRealizados] = useState(false);
  const [realizados, setRealizados] = useState(false);
  const [destacados, setDestacados] = useState(false);
  const [resueltos, setResueltos] = useState(false);
  const [malResueltos, setMalResueltos] = useState(false);

  const activeHandlerLevel1 = () => {
    setLevel1(true);
    setLevel2(false);
    setLevel3(false);
  };
  const activeHandlerLevel2 = () => {
    setLevel1(false);
    setLevel2(true);
    setLevel3(false);
  };
  const activeHandlerLevel3 = () => {
    setLevel1(false);
    setLevel2(false);
    setLevel3(true);
  };
  const activeHandlerTodos = () => {
    setTodos(!todos);
  };
  const activeHandlerNoRealizados = () => {
    setNoRealizados(!noRealizados);
  };
  const activeHandlerRealizados = () => {
    setRealizados(!realizados);
  };
  const activeHandlerDestacados = () => {
    setDestacados(!destacados);
  };
  const activeHandlerResueltos = () => {
    setResueltos(!resueltos);
  };
  const activeHandlerMalResueltos = () => {
    setMalResueltos(!malResueltos);
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
            data={ejerciciosTest}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("PlantillaInterpretacion")}
                style={Styles.ejerciciosContainer}
              >
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
