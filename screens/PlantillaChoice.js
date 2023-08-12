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
import ejerciciosTest from "../db/ejerciciosTestChoice.json";
import ConsignaChoice from "../components/ConsignaChoice";
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
import { useDispatch, useSelector } from "react-redux";
import { checkExerciseCompleted } from "../utils/exercisesUtils";
import { createUserExercise, updateExercise } from "../api/services/exercise.service";
import { updateUserState } from "../store/user/slice";
import Toast from "react-native-root-toast";

function PlantillaChoice({ route, navigation }) {
  const [consignaLoaded, setConsignaLoaded] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [backgroundColor1, setBackgroudColor1] = useState("rgba(71, 71, 71, 0.5)");
  const [backgroundColor2, setBackgroudColor2] = useState("rgba(135, 135, 135, 0.5)");

  const [loading, setLoading] = useState(false);
  const [exerciseCompletedIdx, setExerciseCompletedIdx] = useState(-1);
  const [selectedResponse, setSelectedResponse] = useState("");
  const [answerWasSent, setAnswerWasSent] = useState(false);

  const { exercise } = route.params;
  const ejercicio = ejerciciosTest.find((ejercicio) => ejercicio.key === exercise.key);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const respuestas = ejercicio.consigna;

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

  useEffect(() => {
    loadStatusExercise();
  }, [user]);

  const loadStatusExercise = async () => {
    try {
      const idxExercise = await checkExerciseCompleted(user, exercise.key, "Choice");
      if (idxExercise !== -1) {
        setExerciseCompletedIdx(idxExercise);
        setSelectedResponse(user.exercises[idxExercise].respuestas.opcionElegida);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerCompleteExercise = async (option, status) => {
    try {
      if (option.length !== 0) {
        setLoading(true);
        let userExercises = [];
        if (exerciseCompletedIdx === -1) {
          const newExercise = {
            type: "Choice",
            key: exercise.key,
            respuestas: {
              opcionElegida: option,
            },
          };
          userExercises = await createUserExercise(user, status, newExercise);
        } else {
          userExercises = user.exercises.map((exerc) => {
            if (exerc.key === exercise.key && exerc.type === "Choice") {
              return {
                ...exerc,
                status: status,
                respuestas: {
                  opcionElegida: option,
                },
              };
            }
            return exerc;
          });
          await updateExercise(user.id, userExercises);
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
        Toast.show("Has resuelto el ejercicio", {
          duration: 1000,
          position: 50,
          shadow: true,
          animation: true,
          hideOnPress: true,
          opacity: 1,
          backgroundColor: "#15803d",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!fontLoaded) {
    return <Text> font don't charge</Text>;
  }

  const handleConsigna = () => {
    setConsignaLoaded(!consignaLoaded);
  };

  handlerSelectOption = async (option) => {
    setSelectedResponse(option);
    handlerCompleteExercise(option, "realizado");
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
          <TouchableOpacity onPress={() => navigation.navigate("MultipleChoice")}>
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
                    Elija la respuesta correcta
                  </Text>
                  <Image source={flecha} />
                </View>
              ) : (
                <View style={Styles.consignaExtendida}>
                  <TouchableOpacity
                    onPress={() => handlerSelectOption("a")}
                    style={{
                      color: "#fff",
                      fontFamily: "MontserratRegular",
                      backgroundColor:
                        selectedResponse !== "a"
                          ? "rgba(71, 71, 71, 0.5)"
                          : respuestas.a.correcta == true
                          ? "#29ba13"
                          : "#c27c04",
                      height: 60,
                      justifyContent: "center",
                      flexDirection: "row",
                      padding: 10,
                      alignItems: "center",
                    }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "MontserratRegular",
                      }}>
                      A -
                    </Text>
                    <Text style={Styles.respuestas}>{respuestas.a.texto}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlerSelectOption("b")}
                    style={{
                      color: "#fff",
                      fontFamily: "MontserratRegular",
                      backgroundColor:
                        selectedResponse !== "b"
                          ? "rgba(71, 71, 71, 0.5)"
                          : respuestas.b.correcta == true
                          ? "#29ba13"
                          : "#c27c04",
                      height: 60,
                      justifyContent: "center",
                      flexDirection: "row",
                      padding: 10,
                      alignItems: "center",
                    }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "MontserratRegular",
                      }}>
                      B -
                    </Text>
                    <Text style={Styles.respuestas}> {respuestas.b.texto}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlerSelectOption("c")}
                    style={{
                      color: "#fff",
                      fontFamily: "MontserratRegular",
                      backgroundColor:
                        selectedResponse !== "c"
                          ? "rgba(71, 71, 71, 0.5)"
                          : respuestas.c.correcta == true
                          ? "#29ba13"
                          : "#c27c04",
                      height: 60,
                      justifyContent: "center",
                      flexDirection: "row",
                      padding: 10,
                      alignItems: "center",
                    }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "MontserratRegular",
                      }}>
                      C -
                    </Text>
                    <Text style={Styles.respuestas}> {respuestas.c.texto}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlerSelectOption("d")}
                    style={{
                      color: "#fff",
                      fontFamily: "MontserratRegular",
                      backgroundColor:
                        selectedResponse !== "d"
                          ? "rgba(71, 71, 71, 0.5)"
                          : respuestas.d.correcta == true
                          ? "#29ba13"
                          : "#c27c04",
                      height: 60,
                      justifyContent: "center",
                      flexDirection: "row",
                      padding: 10,
                      alignItems: "center",
                    }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "MontserratRegular",
                      }}>
                      D -
                    </Text>
                    <Text style={Styles.respuestas}>{respuestas.d.texto}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlerSelectOption("e")}
                    style={{
                      color: "#fff",
                      fontFamily: "MontserratRegular",
                      backgroundColor:
                        selectedResponse !== "e"
                          ? "rgba(71, 71, 71, 0.5)"
                          : respuestas.e.correcta == true
                          ? "#29ba13"
                          : "#c27c04",
                      height: 60,
                      justifyContent: "center",
                      flexDirection: "row",
                      padding: 10,
                      alignItems: "center",
                    }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "MontserratRegular",
                      }}>
                      E -
                    </Text>
                    <Text style={Styles.respuestas}> {respuestas.e.texto}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
            <View style={Styles.rightBlock}>
              <View style={Styles.title}>
                <Text style={Styles.titleTextMain}>MC-</Text>
                <Text style={Styles.titleTextEjercicio}>{ejercicio.key}</Text>
              </View>
              <View style={Styles.state}>
                <TouchableOpacity disabled>
                  {selectedResponse.length !== 0 ? (
                    <Image style={Styles.stateImage} source={realizadoActivo} />
                  ) : (
                    <Image style={Styles.stateImage} source={realizado} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity disabled>
                  {ejercicio.destacado === true ? (
                    <Image style={Styles.stateImage} source={destacadoActivo} />
                  ) : (
                    <Image style={Styles.stateImage} source={destacado} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity disabled>
                  {ejercicio.correcto === true ? (
                    <Image style={Styles.stateImage} source={correctoActivo} />
                  ) : (
                    <Image style={Styles.stateImage} source={correcto} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity disabled>
                  {ejercicio.incorrecto === true ? (
                    <Image style={Styles.stateImage} source={incorrecto} />
                  ) : (
                    <Image style={Styles.stateImage} source={incorrecto} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={Styles.ejercicio}>
            <View style={Styles.imagenEjercicioContainer}>
              <Image style={Styles.imagenEjercicio} source={electrocardiogramaTest} />
            </View>
          </View>
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
    height: "100%",
  },
  imagenEjercicio: {
    height: "100%",
    width: "90%",
  },
  consignaExtendida: {
    width: 400,
    height: 100,
    color: "#fff",
    padding: "0.5%",
    borderTopRightRadius: 30,
    marginTop: 130,
  },
  // opciones1: {
  //   color: "#fff",
  //   fontFamily: "MontserratRegular",
  //   backgroundColor,
  //   height: 60,
  //   justifyContent: "center",
  //   flexDirection: "row",
  //   padding: 10,
  //   alignItems: "center",
  // },
  // opciones2: {
  //   color: "#fff",
  //   fontFamily: "MontserratRegular",
  //   backgroundColor: backgroundColor2,
  //   height: 60,
  //   justifyContent: "center",
  //   flexDirection: "row",
  //   padding: 10,
  //   alignItems: "center",
  // },
  respuestas: {
    color: "#fff",
    fontFamily: "MontserratRegular",
    fontSize: 10,
  },
});

export default PlantillaChoice;
