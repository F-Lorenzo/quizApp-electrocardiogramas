import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import ejerciciosTest from "../db/ejerciciosTestInterpretacion.json";
import ConsignaInterpretacion from "../components/ConsignaInterpretacion";
import flecha from "../assets/images/flecha-hacia-abajo-para-navegar.png";
import realizadoImg from "../assets/images/ejercicios-realizados.png";
import destacadoImg from "../assets/images/ejercicios-destacados.png";
import correctoImg from "../assets/images/ejercicios-ok.png";
import incorrectoImg from "../assets/images/ejercicios-mal-hechos.png";
import realizadoActivo from "../assets/images/ejercicios-realizados-activo.png";
import destacadoActivo from "../assets/images/ejercicios-destacados-activo.png";
import correctoActivo from "../assets/images/ejercicios-ok-activo.png";
import incorrectoActivo from "../assets/images/ejercicios-mal-hechos-activo.png";
import electrocardiogramaTest from "../assets/images/electrocardiogramaTest.png";
import LogoApp from "../assets/images/LogoApp.png";
import actividades from "../assets/images/actividades.png";
import ejercicios from "../assets/images/ejercicios.png";
import { updateExercise } from "../api/services/exercise.service";

function PlantillaInterpretacion({ route, navigation }) {
  const [consignaLoaded, setConsignaLoaded] = useState(false);
  const [respuesta, setRespuesta] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [realizado, setRealizado] = useState(false);
  const [destacado, setDestacado] = useState(false);
  const [bienResuelto, setBienResuelto] = useState(true);
  const [malResuelto, setMalResuelto] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        MontserratRegular: Montserrat_400Regular,
      });
      await Font.loadAsync({
        MontserratMedium: Montserrat_500Medium,
      });

      setFontLoaded(true);
    };

    loadFont();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);
  if (!fontLoaded) {
    return <Text> font don't charge</Text>;
  }
  const { item } = route.params;
  // const ejercicio = ejerciciosTest.find((ejercicio) => ejercicio.key === key);

  const handlerRealizado = () => {
    item.realizado = !item.realizado;
    setRealizado(!realizado);
    updateExercise(item);
  };

  const handlerDestacado = () => {
    item.destacado = !item.destacado;
    setDestacado(!destacado);
    updateExercise(item);
  };

  const handlerBienResuelto = () => {
    item.bienResuelto = !item.bienResuelto;
    setBienResuelto(!bienResuelto);
    updateExercise(item);
  };

  const handlerMalResuelto = () => {
    item.malResuelto = !item.malResuelto;
    setMalResuelto(!malResuelto);
    updateExercise(item);
  };

  const handleConsigna = () => {
    setConsignaLoaded(!consignaLoaded);
  };
  return (
    <View style={Styles.container}>
      <View style={Styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate("InterpretacionElectro")}>
          <Image style={Styles.imageNav} source={ejercicios} />
        </TouchableOpacity>
        <View style={Styles.linea}></View>
        <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
          <Image style={Styles.imageNav} source={actividades} />
        </TouchableOpacity>
        <View style={Styles.linea}></View>
        <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
          <Image style={Styles.imageNav} source={LogoApp} />
        </TouchableOpacity>
      </View>
      <View style={Styles.body}>
        <View style={Styles.bodyHeader}>
          <TouchableOpacity style={Styles.consigna} onPress={handleConsigna}>
            {consignaLoaded === false ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "MontserratRegular",
                    fontSize: 12,
                  }}>
                  Describa en el siguiente elctrocardiograma segun consigna
                </Text>
                <Image source={flecha} />
              </View>
            ) : (
              <ConsignaInterpretacion consigna={item.consigna} style={Styles.consignaExtendida} />
            )}
          </TouchableOpacity>
          <View style={Styles.rightBlock}>
            <View style={Styles.title}>
              <Text style={Styles.titleTextMain}>N{item.nivel}-</Text>
              <Text style={Styles.titleTextEjercicio}>{item.key}</Text>
            </View>
            <View style={Styles.state}>
              <TouchableOpacity onPress={handlerRealizado}>
                {realizado === true ? (
                  <Image style={Styles.stateImage} source={realizadoActivo} />
                ) : (
                  <Image style={Styles.stateImage} source={realizadoImg} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handlerDestacado}>
                {destacado === true ? (
                  <Image style={Styles.stateImage} source={destacadoActivo} />
                ) : (
                  <Image style={Styles.stateImage} source={destacadoImg} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handlerBienResuelto}>
                {bienResuelto === true ? (
                  <Image style={Styles.stateImage} source={correctoActivo} />
                ) : (
                  <Image style={Styles.stateImage} source={correctoImg} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handlerMalResuelto}>
                {malResuelto === true ? (
                  <Image style={Styles.stateImage} source={incorrectoActivo} />
                ) : (
                  <Image style={Styles.stateImage} source={incorrectoImg} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={Styles.ejercicio}>
          <View style={Styles.imagenEjercicioContainer}>
            <Image style={Styles.imagenEjercicio} source={electrocardiogramaTest} />
          </View>
          <View style={Styles.respuestaContainer}>
            <Text style={Styles.respuestaText}>Su respuesta:</Text>
            <TextInput multiline={true} style={Styles.respuestaInput}></TextInput>
          </View>
          <TouchableOpacity
            style={Styles.respuestaButton}
            onPress={() => {
              setRespuesta(!respuesta);
            }}>
            {respuesta === false ? (
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "MontserratRegular",
                  fontSize: 14,
                  margin: "2%",
                  height: 80,
                }}>
                VER RESPUESTA CORRECTA
              </Text>
            ) : (
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "MontserratRegular",
                  fontSize: 14,
                  margin: "2%",
                }}>
                OCULTAR RESPUESTA CORRECTA
              </Text>
            )}
          </TouchableOpacity>
          {respuesta && (
            <View style={Styles.respuestaFinal}>
              <View style={Styles.parametros}>
                <Text style={Styles.parametro}>{item.ritmo}</Text>
                <Text style={Styles.parametro}>{item.frecuencia}</Text>
                <Text style={Styles.parametro}>{item.eje}</Text>
              </View>
              <View style={Styles.comentario}>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "MontserratRegular",
                    fontSize: 12,
                  }}>
                  COMENTARIO
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "MontserratRegular",
                    fontSize: 12,
                  }}>
                  {item.comentario}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  nav: {
    backgroundColor: "#3b3a3a",
    width: 80,
    height: "100%",
    alignItems: "center",
  },
  imageNav: {
    width: 50,
    height: 50,
    marginVertical: 30,
  },
  linea: {
    width: 30,
    height: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  body: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  bodyHeader: {
    backgroundColor: "#3b3a3a",
    paddingTop: "1%",
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    zIndex: 1,
  },
  rightBlock: {
    flexDirection: "row",
    marginLeft: "60%",
    alignItems: "center",
  },
  consigna: {
    width: 400,
    height: "65%",
    backgroundColor: "#77bf02",
    padding: "0.5%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 30,
    position: "absolute",
    top: 25,
  },
  title: {
    flexDirection: "row",
    marginHorizontal: "2%",
  },
  titleTextMain: {
    fontWeight: "bold",
    color: "#fff",
  },
  titleTextEjercicio: {
    color: "#fff",
  },
  state: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  stateImage: {
    width: 30,
    height: 30,
  },
  ejercicio: {
    height: "100%",
    flexDirection: "column",
  },
  plantillaContainer: {
    flexDirection: "column",
    height: "100%",
  },
  imagenEjercicioContainer: {
    width: "100%",
    height: 200,
  },
  imagenEjercicio: {
    height: "100%",
    width: "90%",
  },
  respuestaContainer: {
    width: "90%",
    backgroundColor: "#3b3a3a",
    flexDirection: "row",
  },
  respuestaText: {
    textAlignVertical: "center",
    color: "#fff",
    fontFamily: "MontserratRegular",
    paddingHorizontal: "2%",
    height: 80,
  },
  respuestaInput: {
    height: "100%",
    width: 550,
    backgroundColor: "#333",
    color: "#fff",
    fontFamily: "MontserratRegular",
    fontSize: 14,
  },
  respuestaButton: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#77bf02",
  },
  respuestaFinal: {
    width: "90%",
    height: 200,
    flexDirection: "row",
    backgroundColor: "#66a303",
    justifyContent: "space-around",
    alignItems: "center",
  },
  comentario: {
    width: "60%",
    fontFamily: "MontserratRegular",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  parametros: {
    padding: 10,
  },
  parametro: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "MontserratRegular",
  },
});

export default PlantillaInterpretacion;
