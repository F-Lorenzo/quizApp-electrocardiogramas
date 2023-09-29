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
import incorrectoActivo from "../assets/images/ejercicios-mal-hechos-activo.png";
import electrocardiogramaTest from "../assets/images/electrocardiogramaTest.png";
import LogoApp from "../assets/images/LogoApp.png";
import actividades from "../assets/images/actividades.png";
import ejercicios from "../assets/images/ejercicios.png";
import { checkExerciseCompleted } from "../utils/exercisesUtils";
import { useDispatch, useSelector } from "react-redux";
import { createUserExercise, updateExercise } from "../api/services/exercise.service";
import { updateUserState } from "../store/user/slice";
import Toast from "react-native-root-toast";
import { COMPLETAR } from "../config/exercisesType";

function PlantillaCompletar({ route, navigation }) {
  const [consignaLoaded, setConsignaLoaded] = useState(false);
  const [respuesta, setRespuesta] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exerciseCompletedIdx, setExerciseCompletedIdx] = useState(-1);
  const [ritmo, setRitmo] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [ejeQrsCercano, setEjeQrsCercano] = useState("");
  const [eje, setEje] = useState("");
  const [monofocal1, setMonofocal1] = useState("");
  const [monofocal2, setMonofocal2] = useState("");
  const [necrosis, setNecrosis] = useState("");
  const [versusRotacion, setVersusRotacion] = useState("");
  const [bloqueo, setBloqueo] = useState("");
  const [deRama, setDeRama] = useState("");
  const [extrasistolia, setExtrasistolia] = useState("");
  const [bloqueoAVDe, setBloqueoAVDe] = useState("");
  const [faltaProgresionR, setFaltaProgresionR] = useState("");
  const [trastornoInespecificos, setTrastornoInespecificos] = useState("");
  const [anteriorIzquierdo, setAnteriorIzquierdo] = useState("");
  const [agrandamientoAuricula, setAgrandamientoAuricula] = useState("");
  const [hemibloqueo, setHemibloqueo] = useState("");

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
    console.log(exercise);
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
      const idxExercise = await checkExerciseCompleted(user, exercise.key, COMPLETAR);
      if (idxExercise !== -1) {
        setExerciseCompletedIdx(idxExercise);
        setRitmo(user.exercises[idxExercise].respuestas.ritmo);
        setFrecuencia(user.exercises[idxExercise].respuestas.frecuencia);
        setEje(user.exercises[idxExercise].respuestas.ejeElectrico);
        if (user.exercises[idxExercise].respuestas.hasOwnProperty("monofocal")) {
          setMonofocal1(user.exercises[idxExercise].respuestas.monofocal.texto1);
          setMonofocal2(user.exercises[idxExercise].respuestas.monofocal.texto2);
        }
        setNecrosis(user.exercises[idxExercise].respuestas.necrosis);
        setVersusRotacion(user.exercises[idxExercise].respuestas.versusRotacion);
        setBloqueo(user.exercises[idxExercise].respuestas.bloqueo);
        setDeRama(user.exercises[idxExercise].respuesta.de_rama);
        setExtrasistolia(user.exercises[idxExercise].respuestas.extrasistolia);
        setBloqueoAVDe(user.exercises[idxExercise].respuestas.bloque_av_de);
        setFaltaProgresionR(
          user.exercises[idxExercise].respuestas.falta_de_progresion_de_R_en_derivaciones
        );
        setTrastornoInespecificos(
          user.exercises[idxExercise].respuestas.trastornos_inespecificos_de_la_repolarizacion
        );
        setAnteriorIzquierdo(user.exercises[idxExercise].respuestas.anterior_izquierdo);
        setAgrandamientoAuricula(user.exercises[idxExercise].respuestas.agrandamiento_de_auricula);
        setEjeQrsCercano(user.exercises[idxExercise].respuestas.eje_qrs_cercano_a);
        setHemibloqueo(user.exercises[idxExercise].respuestas.hemibloqueo);
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

  const fillRespuestas = () => {
    let respuesta = {};
    if (exercise.respuesta.hasOwnProperty("ritmo")) {
      respuesta.ritmo = ritmo;
    }
    if (exercise.respuesta.hasOwnProperty("frecuencia")) {
      respuesta.frecuencia = frecuencia;
    }
    if (exercise.respuesta.hasOwnProperty("bloqueo")) {
      respuesta.bloqueo = bloqueo;
    }
    if (exercise.respuesta.hasOwnProperty("de_rama")) {
      respuesta.de_rama = deRama;
    }
    if (exercise.respuesta.hasOwnProperty("eje")) {
      respuesta.eje = eje;
    }
    if (exercise.respuesta.hasOwnProperty("hemibloqueo")) {
      respuesta.hemibloqueo = hemibloqueo;
    }
    if (exercise.respuesta.hasOwnProperty("falta_de_progresion_de_R_en_derivaciones")) {
      respuesta.falta_de_progresion_de_R_en_derivaciones = faltaProgresionR;
    }
    if (exercise.respuesta.hasOwnProperty("trastornos_inespecificos_de_la_repolarizacion")) {
      respuesta.trastornos_inespecificos_de_la_repolarizacion = trastornoInespecificos;
    }
    if (exercise.respuesta.hasOwnProperty("eje_qrs_cercano_a")) {
      respuesta.eje_qrs_cercano_a = ejeQrsCercano;
    }
    if (exercise.respuesta.hasOwnProperty("agrandamiento_de_auricula")) {
      respuesta.agrandamiento_de_auricula = agrandamientoAuricula;
    }
    if (exercise.respuesta.hasOwnProperty("bloqueo_av_de")) {
      respuesta.bloque_av_de = bloqueoAVDe;
    }
    if (exercise.respuesta.hasOwnProperty("monofocal")) {
      respuesta.monofocal = { texto1: monofocal1, texto2: monofocal2 };
    }
    if (exercise.respuesta.hasOwnProperty("necrosis")) {
      respuesta.necrosis = necrosis;
    }
    if (exercise.respuesta.hasOwnProperty("versus_rotacion")) {
      respuesta.versus_rotacion = versusRotacion;
    }
    if (exercise.respuesta.hasOwnProperty("extrasistolia")) {
      respuesta.extrasistolia = extrasistolia;
    }
    if (exercise.respuesta.hasOwnProperty("anterior_izquierdo")) {
      respuesta.anterior_izquierdo = anteriorIzquierdo;
    }
    return respuesta;
  };

  const handlerCompleteExercise = async (status) => {
    try {
      setLoading(true);
      let userExercises = [];
      if (exerciseCompletedIdx === -1) {
        const newExercise = {
          type: COMPLETAR,
          key: exercise.key,
          respuestas: fillRespuestas(),
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
          if (exerc.key === exercise.key && exerc.type === COMPLETAR) {
            let newStatus = [...exerc.status];

            if (newStatus.includes(status)) {
              newStatus = newStatus.filter((s) => s !== status);
            } else {
              newStatus.push(status);
            }

            return {
              ...exerc,
              status: newStatus,
              respuestas: fillRespuestas(),
            };
          }
          return exerc;
        });
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
            <View style={Styles.imagenEjercicioContainer}>
              {exercise.imagen && (
                <Image
                  style={Styles.imagenEjercicio}
                  source={{ uri: exercise.imagen }}
                  resizeMode="stretch"
                />
              )}
            </View>
            <View style={Styles.respuestaContainer}>
              <View style={Styles.respuestaSubContainers}>
                <Text style={Styles.respuestaText}>Ritmo</Text>
                <TextInput
                  style={Styles.respuestaInput}
                  onChangeText={(text) => setRitmo(text)}
                  defaultValue={
                    exerciseCompletedIdx !== -1
                      ? user.exercises[exerciseCompletedIdx].respuestas.ritmo
                      : ""
                  }></TextInput>
              </View>
              {exercise.respuesta.frecuencia ? (
                <View style={Styles.respuestaSubContainers}>
                  <Text style={Styles.respuestaText}>FC</Text>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setFrecuencia(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.frecuencia
                        : ""
                    }></TextInput>
                </View>
              ) : null}
              {exercise.respuesta.bloqueo ? (
                <View style={Styles.respuestaSubContainers}>
                  <Text style={Styles.respuestaText}>Bloqueo</Text>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setBloqueo(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.bloqueo
                        : ""
                    }></TextInput>
                </View>
              ) : null}
              {exercise.respuesta.de_rama ? (
                <View style={Styles.respuestaSubContainers}>
                  <Text style={Styles.respuestaText}>de rama</Text>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setDeRama(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.de_rama
                        : ""
                    }></TextInput>
                </View>
              ) : null}
              {exercise.respuesta.eje ? (
                <View style={Styles.respuestaSubContainers}>
                  <Text style={Styles.respuestaText}>Eje</Text>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setEje(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.eje
                        : ""
                    }></TextInput>
                </View>
              ) : null}
              {exercise.respuesta.hemibloqueo ? (
                <View style={Styles.respuestaSubContainers}>
                  <Text style={Styles.respuestaText}>Hemibloqueo</Text>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setHemibloqueo(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.hemibloqueo
                        : ""
                    }></TextInput>
                </View>
              ) : null}
              {exercise.respuesta.falta_de_progresion_de_R_en_derivaciones ? (
                <View style={Styles.respuestaSubContainers}>
                  <Text style={Styles.respuestaText}>Falta de progresión de R en derivaciones</Text>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setFaltaProgresionR(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas
                            .falta_de_progresion_de_R_en_derivaciones
                        : ""
                    }></TextInput>
                </View>
              ) : null}
              {exercise.respuesta.trastornos_inespecificos_de_la_repolarizacion ? (
                <View style={Styles.respuestaSubContainers}>
                  <Text style={Styles.respuestaText}>
                    Trastornos inespecíficos de la repolarización
                  </Text>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setTrastornoInespecificos(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas
                            .trastornos_inespecificos_de_la_repolarizacion
                        : ""
                    }></TextInput>
                </View>
              ) : null}
              {exercise.respuesta.eje_qrs_cercano_a ? (
                <View style={Styles.respuestaSubContainers}>
                  <Text style={Styles.respuestaText}>Eje QRS cercano a</Text>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setEje(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.eje_qrs_cercano_a
                        : ""
                    }></TextInput>
                </View>
              ) : null}
              {exercise.respuesta.agrandamiento_de_auricula ? (
                <View style={Styles.respuestaSubContainers}>
                  <Text style={Styles.respuestaText}>Agrandamiento de aurícula</Text>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setAgrandamientoAuricula(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.agrandamiento_de_auricula
                        : ""
                    }></TextInput>
                </View>
              ) : null}
              {exercise.respuesta.bloqueo_av_de ? (
                <View style={Styles.respuestaSubContainers}>
                  <Text style={Styles.respuestaText}>Bloqueo AV de </Text>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setBloqueoAVDe(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.bloqueo_av_de
                        : ""
                    }></TextInput>
                </View>
              ) : null}
              {exercise.respuesta.monofocal ? (
                <View style={Styles.respuestaSubContainers}>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setMonofocal1(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.monofocal?.texto1
                        : ""
                    }></TextInput>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setMonofocal2(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.monofocal?.texto2
                        : ""
                    }></TextInput>
                  <Text style={Styles.respuestaText}>monofocal</Text>
                </View>
              ) : null}
              {exercise.respuesta.necrosis ? (
                <View style={Styles.respuestaSubContainers}>
                  <Text style={Styles.respuestaText}>Necrosis</Text>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setNecrosis(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.necrosis
                        : ""
                    }></TextInput>
                </View>
              ) : null}
              {exercise.respuesta.versus_rotacion ? (
                <View style={Styles.respuestaSubContainers}>
                  <Text style={Styles.respuestaText}>versus rotación</Text>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setVersusRotacion(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.versusRotacion
                        : ""
                    }></TextInput>
                </View>
              ) : null}
              {exercise.respuesta.extrasistolia ? (
                <View style={Styles.respuestaSubContainers}>
                  <Text style={Styles.respuestaText}>Extrasistolia</Text>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setExtrasistolia(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.extrasistolia
                        : ""
                    }></TextInput>
                </View>
              ) : null}
              {exercise.respuesta.anterior_izquierdo ? (
                <View style={Styles.respuestaSubContainers}>
                  <TextInput
                    style={Styles.respuestaInput}
                    onChangeText={(text) => setAnteriorIzquierdo(text)}
                    defaultValue={
                      exerciseCompletedIdx !== -1
                        ? user.exercises[exerciseCompletedIdx].respuestas.monofocal
                            .anterior_izquierdo
                        : ""
                    }></TextInput>
                  <Text style={Styles.respuestaText}>anterior izquierdo</Text>
                </View>
              ) : null}
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
                <Text style={Styles.respuestaFinal}>Ritmo {exercise.respuesta.ritmo}</Text>
                {exercise.respuesta.frecuencia && (
                  <Text style={Styles.respuestaFinal}>FC {exercise.respuesta.frecuencia}</Text>
                )}
                {exercise.respuesta.bloqueo && (
                  <Text style={Styles.respuestaFinal}>Bloqueo {exercise.respuesta.bloqueo}</Text>
                )}
                {exercise.respuesta.de_rama && (
                  <Text style={Styles.respuestaFinal}>De rama {exercise.respuesta.de_rama}</Text>
                )}
                {exercise.respuesta.eje && (
                  <Text style={Styles.respuestaFinal}>Eje {exercise.respuesta.eje}</Text>
                )}
                {exercise.respuesta.hemibloqueo && (
                  <Text style={Styles.respuestaFinal}>
                    Hemibloqueo {exercise.respuesta.hemibloqueo}
                  </Text>
                )}
                {exercise.respuesta.falta_de_progresion_de_R_en_derivaciones && (
                  <Text style={Styles.respuestaFinal}>
                    Falta de progresión de R en derivaciones{" "}
                    {exercise.respuesta.falta_de_progresion_de_R_en_derivaciones}
                  </Text>
                )}
                {exercise.respuesta.trastornos_inespecificos_de_la_repolarizacion && (
                  <Text style={Styles.respuestaFinal}>
                    Trastornos inespecíficos de la repolarización{" "}
                    {exercise.respuesta.trastornos_inespecificos_de_la_repolarizacion}
                  </Text>
                )}
                {exercise.respuesta.eje_qrs_cercano_a && (
                  <Text style={Styles.respuestaFinal}>
                    Eje QRS cercano a {exercise.respuesta.eje_qrs_cercano_a}
                  </Text>
                )}
                {exercise.respuesta.agrandamiento_de_auricula && (
                  <Text style={Styles.respuestaFinal}>
                    Agrandamiento de aurícula {exercise.respuesta.agrandamiento_de_auricula}
                  </Text>
                )}
                {exercise.respuesta.bloque_av_de && (
                  <Text style={Styles.respuestaFinal}>
                    Bloqueo AV de {exercise.respuesta.bloqueo_av_de}
                  </Text>
                )}
                {exercise.respuesta.monofocal && (
                  <Text style={Styles.respuestaFinal}>
                    {exercise.respuesta.monofocal.texto1} {exercise.respuesta.monofocal.texto2}{" "}
                    Monofocal
                  </Text>
                )}
                {exercise.respuesta.necrosis && (
                  <Text style={Styles.respuestaFinal}>Necrosis {exercise.respuesta.necrosis}</Text>
                )}
                {exercise.respuesta.versus_rotacion && (
                  <Text style={Styles.respuestaFinal}>
                    Versus rotación {exercise.respuesta.versus_rotacion}
                  </Text>
                )}
                {exercise.respuesta.extrasistolia && (
                  <Text style={Styles.respuestaFinal}>
                    Extrasistolia {exercise.respuesta.extrasistolia}
                  </Text>
                )}
                {exercise.respuesta.anterior_izquierdo && (
                  <Text style={Styles.respuestaFinal}>
                    Anterior izquierdo {exercise.respuesta.anterior_izquierdo}
                  </Text>
                )}
              </View>
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
