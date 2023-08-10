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
import ejerciciosTest from "../db/ejerciciosTestCompletar.json";
import ConsignaInterpretacion from "../components/ConsignaInterpretacion";
import flecha from "../assets/images/flecha-hacia-abajo-para-navegar.png";
import realizado from "../assets/images/ejercicios-realizados.png";
import destacado from "../assets/images/ejercicios-destacados.png";
import correcto from "../assets/images/ejercicios-ok.png";
import incorrecto from "../assets/images/ejercicios-mal-hechos.png";
import realizadoActivo from "../assets/images/ejercicios-realizados-activo.png";
import destacadoActivo from "../assets/images/ejercicios-destacados-activo.png";
import correctoActivo from "../assets/images/ejercicios-ok-activo.png";
// import incorrectoActivo from "../assets/images/ejercicios-mal-hechos.png";
import electrocardiogramaTest from "../assets/images/electrocardiogramaTest.png";
import LogoApp from "../assets/images/LogoApp.png";
import actividades from "../assets/images/actividades.png";
import ejercicios from "../assets/images/ejercicios.png";
import { checkExerciseCompleted } from "../utils/exercisesUtils";
import { useDispatch, useSelector } from "react-redux";
import { createUserExercise } from "../api/services/exercise.service";
import { updateUserState } from "../store/user/slice";

function PlantillaCompletar({ route, navigation }) {
  const [consignaLoaded, setConsignaLoaded] = useState(false);
  const [respuesta, setRespuesta] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [exerciseCompletedIdx, setExerciseCompletedIdx] = useState(-1);
  const [ritmo, setRitmo] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [eje, setEje] = useState("");
  const [monofocal1, setMonofocal1] = useState("");
  const [monofocal2, setMonofocal2] = useState("");
  const [necrosis, setNecrosis] = useState("");
  const [versusRotacion, setVersusRotacion] = useState("");

  const { exercise } = route.params;
  const ejercicio = ejerciciosTest.find((ejercicio) => ejercicio.key === exercise.key);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
      const idxExercise = await checkExerciseCompleted(user, exercise.key);
      if (idxExercise !== -1) {
        setExerciseCompletedIdx(idxExercise);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!fontLoaded) {
    return <Text> font don't charge</Text>;
  }

  const handlerCompleteExercise = async (status) => {
    try {
      let userExercises = [];
      if (exerciseCompletedIdx === -1) {
        const newExercise = {
          type: "Completar",
          key: exercise.key,
          respuestas: {
            ejeElectrico: eje,
            frecuencia: frecuencia,
            ritmo: ritmo,
            monofocal: {
              texto1: monofocal1,
              texto2: monofocal2,
            },
            necrosis: necrosis,
            versusRotacion: versusRotacion,
          },
        };
        userExercises = await createUserExercise(user, status, newExercise);
      } else {
        userExercises = user.exercises;

        userExercises[exerciseCompletedIdx].status = status;
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
    }
  };

  const handleConsigna = () => {
    setConsignaLoaded(!consignaLoaded);
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate("CompleteCasilleros")}>
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
            <Text
              style={{
                color: "#fff",
                fontFamily: "MontserratRegular",
                fontSize: 12,
              }}>
              Complete los casilleros
            </Text>
          </TouchableOpacity>
          <View style={Styles.rightBlock}>
            <View style={Styles.title}>
              <Text style={Styles.titleTextMain}>C-</Text>
              <Text style={Styles.titleTextEjercicio}>{exercise.key}</Text>
            </View>
            <View style={Styles.state}>
              <TouchableOpacity onPress={() => handlerCompleteExercise("realizado")}>
                {user.exercises.length > 0 &&
                exerciseCompletedIdx !== -1 &&
                user.exercises[exerciseCompletedIdx].status === "realizado" ? (
                  <Image style={Styles.stateImage} source={realizadoActivo} />
                ) : (
                  <Image style={Styles.stateImage} source={realizado} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlerCompleteExercise("destacado")}>
                {user.exercises.length > 0 &&
                exerciseCompletedIdx !== -1 &&
                user.exercises[exerciseCompletedIdx].status === "destacado" ? (
                  <Image style={Styles.stateImage} source={destacadoActivo} />
                ) : (
                  <Image style={Styles.stateImage} source={destacado} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlerCompleteExercise("correcto")}>
                {user.exercises.length > 0 &&
                exerciseCompletedIdx !== -1 &&
                user.exercises[exerciseCompletedIdx].status === "correcto" ? (
                  <Image style={Styles.stateImage} source={correctoActivo} />
                ) : (
                  <Image style={Styles.stateImage} source={correcto} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlerCompleteExercise("incorrecto")}>
                {user.exercises.length > 0 &&
                exerciseCompletedIdx !== -1 &&
                user.exercises[exerciseCompletedIdx].status === "incorrecto" ? (
                  <Image style={Styles.stateImage} source={incorrecto} />
                ) : (
                  <Image style={Styles.stateImage} source={incorrecto} />
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
            <View style={Styles.respuestaSubContainers}>
              <Text style={Styles.respuestaText}>Ritmo</Text>
              <TextInput
                style={Styles.respuestaInput}
                onChangeText={(text) => setRitmo(text)}></TextInput>
            </View>
            <View style={Styles.respuestaSubContainers}>
              <Text style={Styles.respuestaText}>FC</Text>
              <TextInput
                style={Styles.respuestaInput}
                onChangeText={(text) => setFrecuencia(text)}></TextInput>
            </View>
            <View style={Styles.respuestaSubContainers}>
              <Text style={Styles.respuestaText}>Eje QRS cercano a</Text>
              <TextInput
                style={Styles.respuestaInput}
                onChangeText={(text) => setEje(text)}></TextInput>
            </View>
            <View style={Styles.respuestaSubContainers}>
              <TextInput
                style={Styles.respuestaInput}
                onChangeText={(text) => setMonofocal1(text)}></TextInput>
              <TextInput
                style={Styles.respuestaInput}
                onChangeText={(text) => setMonofocal2(text)}></TextInput>
              <Text style={Styles.respuestaText}>monofocal</Text>
            </View>
            <View style={Styles.respuestaSubContainers}>
              <Text style={Styles.respuestaText}>Necrosis</Text>
              <TextInput
                style={Styles.respuestaInput}
                onChangeText={(text) => setNecrosis(text)}></TextInput>
              <Text style={Styles.respuestaText}>versus rotación</Text>
              <TextInput
                style={Styles.respuestaInput}
                onChangeText={(text) => setVersusRotacion(text)}></TextInput>
            </View>
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
            <View style={Styles.respuestaFinalContainer}>
              <Text style={Styles.respuestaFinal}>Ritmo {ejercicio.ritmo}</Text>
              <Text style={Styles.respuestaFinal}>FC {ejercicio.frecuencia}</Text>
              <Text style={Styles.respuestaFinal}>Eje QRS cercano a {ejercicio.eje}</Text>
              <Text style={Styles.respuestaFinal}>Extrasistolia ventricular monofocal</Text>
              <Text style={Styles.respuestaFinal}>Necrocis septal versus rotación horaria</Text>
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
    height: 300,
    backgroundColor: "#3b3a3a",
    padding: 10,
  },
  respuestaSubContainers: {
    flexDirection: "row",
    height: 40,
  },
  respuestaText: {
    color: "#fff",
    fontFamily: "MontserratRegular",
    margin: 10,
  },
  respuestaInput: {
    height: 30,
    width: 180,
    backgroundColor: "#333",
    color: "#fff",
    fontFamily: "MontserratRegular",
    fontSize: 14,
    margin: 10,
  },
  respuestaButton: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#77bf02",
  },
  respuestaFinalContainer: {
    width: "90%",
    backgroundColor: "#66a303",
    height: 250,
  },
  respuestaFinal: {
    height: 20,
    margin: 10,
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "#fff",
  },
});

export default PlantillaCompletar;
