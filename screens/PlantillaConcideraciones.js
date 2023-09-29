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
  ActivityIndicator,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import ejerciciosTest from "../db/ejerciciosTest.json";
import ConsignaInterpretacion from "../components/ConsignaInterpretacion";
import flecha from "../assets/images/flecha-hacia-abajo-para-navegar.png";
import realizado from "../assets/images/ejercicios-realizados.png";
import destacado from "../assets/images/ejercicios-destacados.png";
import correcto from "../assets/images/ejercicios-ok.png";
import incorrecto from "../assets/images/ejercicios-mal-hechos.png";
import realizadoActivo from "../assets/images/ejercicios-realizados-activo.png";
import destacadoActivo from "../assets/images/ejercicios-destacados-activo.png";
import correctoActivo from "../assets/images/ejercicios-ok-activo.png";
import incorrectoActivo from "../assets/images/ejercicios-mal-hechos-activo.png";
import electrocardiogramaTest from "../assets/images/electrocardiogramaTest.png";
import LogoApp from "../assets/images/LogoApp.png";
import actividades from "../assets/images/actividades.png";
import ejercicios from "../assets/images/ejercicios.png";
import { CONSIDERACIONES } from "../config/exercisesType";
import { useDispatch, useSelector } from "react-redux";
import { createUserExercise, updateExercise } from "../api/services/exercise.service";
import Toast from "react-native-root-toast";
import { updateUserState } from "../store/user/slice";
import { checkExerciseCompleted } from "../utils/exercisesUtils";

function PlantillaConcideraciones({ route, navigation }) {
  const [consignaLoaded, setConsignaLoaded] = useState(false);
  const [respuesta, setRespuesta] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exerciseCompletedIdx, setExerciseCompletedIdx] = useState(-1);
  const [comentarios, setComentarios] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { exercise } = route.params;

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
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  useEffect(() => {
    loadStatusExercise();
  }, [user]);

  const loadStatusExercise = async () => {
    try {
      const idxExercise = await checkExerciseCompleted(user, exercise.key, CONSIDERACIONES);
      console.log(idxExercise);
      if (idxExercise !== -1) {
        setExerciseCompletedIdx(idxExercise);
        setComentarios(user.exercises[idxExercise].respuestas.comentarios);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!fontLoaded) {
    return <Text> font don't charge</Text>;
  }

  const getMsgAlertStatus = (status) => {
    return exerciseCompletedIdx !== -1 &&
      user.exercises[exerciseCompletedIdx].status.includes(status)
      ? `Has desmarcado la opción "${status}" del ejercicio`
      : `Has marcado la opción "${status}" en el ejercicio`;
  };

  const handlerCompleteExercise = async (status) => {
    try {
      setLoading(true);
      let userExercises = [];
      if (exerciseCompletedIdx === -1) {
        const newExercise = {
          type: CONSIDERACIONES,
          key: exercise.key,
          respuestas: {
            comentarios: comentarios,
          },
        };
        userExercises = await createUserExercise(user, status, newExercise);
        Toast.show(`Has marcado el ejercicio como "${status}"`, {
          duration: 2000,
          position: 50,
          shadow: true,
          animation: true,
          hideOnPress: true,
          opacity: 1,
          backgroundColor: "#15803d",
        });
      } else {
        userExercises = user.exercises.map((exerc) => {
          if (exerc.key === exercise.key && exerc.type === CONSIDERACIONES) {
            let newStatus = [...exerc.status];

            if (newStatus.includes(status)) {
              newStatus = newStatus.filter((s) => s !== status);
            } else {
              newStatus.push(status);
            }

            return {
              ...exerc,
              status: newStatus,
              respuestas: { comentarios: comentarios },
            };
          }
          return exerc;
        });
        console.log(user.id, userExercises);
        await updateExercise(user.id, userExercises);
        Toast.show(`${getMsgAlertStatus(status)}`, {
          duration: 2000,
          position: 50,
          shadow: true,
          animation: true,
          hideOnPress: true,
          opacity: 1,
          backgroundColor: "#15803d",
        });
      }
      dispatch(
        updateUserState({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user,
          exercises: userExercises,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConsigna = () => {
    setConsignaLoaded(!consignaLoaded);
  };

  return (
    <>
      {loading && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
          }}>
          <ActivityIndicator style={{ top: "50%" }} color="white" />
        </View>
      )}
      <View style={Styles.container}>
        <View style={Styles.nav}>
          <TouchableOpacity onPress={() => navigation.navigate("ConcideracionesClinicas")}>
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
                <ConsignaInterpretacion
                  consigna={exercise.consigna}
                  style={Styles.consignaExtendida}
                />
              )}
            </TouchableOpacity>
            <View style={Styles.rightBlock}>
              <View style={Styles.title}>
                <Text style={Styles.titleTextMain}>CC-</Text>
                <Text style={Styles.titleTextEjercicio}>{exercise.key}</Text>
              </View>
              <View style={Styles.state}>
                <TouchableOpacity onPress={() => handlerCompleteExercise("realizado")}>
                  {user.exercises.length > 0 &&
                  exerciseCompletedIdx !== -1 &&
                  user.exercises[exerciseCompletedIdx].status.includes("realizado") ? (
                    <Image style={Styles.stateImage} source={realizadoActivo} />
                  ) : (
                    <Image style={Styles.stateImage} source={realizado} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlerCompleteExercise("destacado")}>
                  {user.exercises.length > 0 &&
                  exerciseCompletedIdx !== -1 &&
                  user.exercises[exerciseCompletedIdx].status.includes("destacado") ? (
                    <Image style={Styles.stateImage} source={destacadoActivo} />
                  ) : (
                    <Image style={Styles.stateImage} source={destacado} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlerCompleteExercise("correcto")}>
                  {user.exercises.length > 0 &&
                  exerciseCompletedIdx !== -1 &&
                  user.exercises[exerciseCompletedIdx].status.includes("correcto") ? (
                    <Image style={Styles.stateImage} source={correctoActivo} />
                  ) : (
                    <Image style={Styles.stateImage} source={correcto} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlerCompleteExercise("incorrecto")}>
                  {user.exercises.length > 0 &&
                  exerciseCompletedIdx !== -1 &&
                  user.exercises[exerciseCompletedIdx].status.includes("incorrecto") ? (
                    <Image style={Styles.stateImage} source={incorrectoActivo} />
                  ) : (
                    <Image style={Styles.stateImage} source={incorrecto} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView style={Styles.ejercicio}>
            {exercise.imagen.map((img) => (
              <View style={Styles.imagenEjercicioContainer}>
                <Image
                  style={Styles.imagenEjercicio}
                  source={{
                    uri: img,
                  }}
                />
              </View>
            ))}
            <View style={Styles.respuestaContainer}>
              <Text style={Styles.respuestaText}>Su respuesta:</Text>
              <TextInput
                multiline={true}
                onChangeText={(text) => setComentarios(text)}
                style={Styles.respuestaInput}
                defaultValue={
                  exerciseCompletedIdx !== -1
                    ? user.exercises[exerciseCompletedIdx].respuestas.comentarios
                    : ""
                }></TextInput>
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
              <Text style={Styles.respuestaFinal}>{exercise.respuesta.comentarios}</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </>
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
    height: 600,
  },
  imagenEjercicio: {
    height: "100%",
    width: "100%",
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
    height: "100%",
    paddingBottom: 100,
    backgroundColor: "#66a303",
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
});

export default PlantillaConcideraciones;
