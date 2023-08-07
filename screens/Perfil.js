import React, { useEffect, useReducer, useState } from "react";
import * as Font from "expo-font";
import { Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import Header from "../components/Header";
import usuario from "../assets/images/usuario.png";
import estadisticasImg from "../assets/images/estadisticas.png";
import Ejercicios from "../assets/images/ejercicios.png";
import Completar from "../assets/images/completar.png";
import MultipleChoice from "../assets/images/multiple-choice.png";
import concideracionesClinicas from "../assets/images/consideraciones_clinicas.png";
import ejerciciosConcideraciones from "../db/ejerciciosTest.json";
import { AntDesign } from "@expo/vector-icons";
import { logout, update } from "../api/services/user.service";
import Toast from "react-native-root-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateUserState } from "../store/user/slice";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../config/firebase.config";

function Perfil({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
  }, []);

  if (!fontLoaded) {
    return <Text> font don't charge</Text>;
  }

  const signOut = async () => {
    try {
      dispatch(updateUserState(null));
      await logout();
      navigation.navigate("Inicio");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      if (email.length != 0 || password.length != 0) {
        setShowModal(true);
      } else {
        saveUserData();
      }
    } catch (error) {
      if (error === "auth/weak-password") {
        Toast.show("La contraseña debe contener más de 6 caracteres", {
          duration: Toast.durations.SHORT,
          position: 50,
          shadow: true,
          animation: true,
          hideOnPress: true,
          opacity: 1,
          backgroundColor: "#ef4444",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const saveUserData = async () => {
    try {
      const userInfoUpd = {
        id: user.id,
        firstName: firstName.length ? firstName : user.firstName,
        lastName: lastName.length ? lastName : user.lastName,
        newEmail: email,
        newPassword: password,
      };
      const usrUpd = await update(userInfoUpd);
      if (usrUpd) {
        Toast.show("Datos actualizados correctamente", {
          duration: 1000,
          position: 50,
          shadow: true,
          animation: true,
          hideOnPress: true,
          opacity: 1,
          backgroundColor: "#15803d",
        });

        dispatch(
          updateUserState({
            id: userInfoUpd.id,
            firstName: userInfoUpd.firstName,
            lastName: userInfoUpd.lastName,
            email: userInfoUpd.newEmail.length ? userInfoUpd.newEmail : user.email,
          })
        );

        setShowChangePwd(false);
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Toast.show("Ese correo ya se encuentra registrado.", {
          duration: Toast.durations.SHORT,
          position: 50,
          shadow: true,
          animation: true,
          hideOnPress: true,
          opacity: 1,
          backgroundColor: "#ef4444",
        });
      }
      if (error.code === "auth/weak-password") {
        Toast.show("La contraseña debe tener más de 6 caracteres.", {
          duration: Toast.durations.SHORT,
          position: 50,
          shadow: true,
          animation: true,
          hideOnPress: true,
          opacity: 1,
          backgroundColor: "#ef4444",
        });
      }
      console.log(error);
    } finally {
      setShowModal(false);
    }
  };

  const reauthenticateUser = async () => {
    try {
      setLoadingModal(true);
      const reauthenticated = await reauthenticateWithCredential(
        auth.currentUser,
        EmailAuthProvider.credential(user.email, currentPassword)
      );

      if (reauthenticated.user) {
        Toast.show("Verificación exitosa, actualizando información..", {
          duration: 1000,
          position: 50,
          shadow: true,
          animation: true,
          hideOnPress: true,
          opacity: 1,
          backgroundColor: "#15803d",
        });
        saveUserData();
      }
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        Toast.show("La contraseña proporcionada es incorrecta", {
          duration: Toast.durations.SHORT,
          position: 50,
          shadow: true,
          animation: true,
          hideOnPress: true,
          opacity: 1,
          backgroundColor: "#ef4444",
        });
      }
      if (error.code === "auth/too-many-requests") {
        Toast.show("Se han detectado muchos intentos, por favor intenta de nuevo más tarde.", {
          duration: Toast.durations.SHORT,
          position: 50,
          shadow: true,
          animation: true,
          hideOnPress: true,
          opacity: 1,
          zIndex: 1000000,
          backgroundColor: "#ef4444",
        });
      }
    } finally {
      setLoadingModal(false);
    }
  };

  return (
    <View style={Styles.principalContainer}>
      <Header />
      {user ? (
        <>
          {showModal && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={showModal}
              onRequestClose={() => {
                setShowModal(false);
              }}>
              <View style={Styles.centeredView}>
                <View style={Styles.modalView}>
                  <View style={Styles.iconClose}>
                    <AntDesign
                      name="close"
                      size={24}
                      color="black"
                      onPress={() => setShowModal(false)}
                    />
                  </View>
                  <Text>
                    Debes colocar nuevamente tu contraseña para confirmar cambios sensibles.
                  </Text>
                  <View style={Styles.celdas}>
                    <TextInput
                      style={Styles.inputPwd}
                      placeholderTextColor="#fff"
                      placeholder="Contraseña actual"
                      onChangeText={(text) => setCurrentPassword(text)}></TextInput>
                  </View>
                  <TouchableOpacity
                    style={Styles.botonModificar}
                    onPress={() => reauthenticateUser()}
                    disabled={loadingModal || currentPassword.length === 0}>
                    <Text style={Styles.textoBoton}>
                      {loadingModal ? <ActivityIndicator /> : "CONFIRMAR"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
          <ScrollView>
            <View style={Styles.perfil}>
              <View style={Styles.perfilHeader}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "flex-end",
                    marginTop: 20,
                    padding: 10,
                  }}>
                  <TouchableOpacity onPress={signOut}>
                    <Text style={Styles.texto}>
                      <AntDesign name="logout" size={13} color="white" /> Cerrar sesión
                    </Text>
                  </TouchableOpacity>
                </View>
                <Image style={Styles.imagePerfil} source={usuario} />
                <View style={Styles.linea}></View>
                <Text style={Styles.texto}>MI PERFIL</Text>
              </View>
              <View style={Styles.datos}>
                <View style={Styles.celdas}>
                  <Text style={Styles.label}>Nombre</Text>
                  <TextInput
                    style={Styles.input}
                    placeholderTextColor="#fff"
                    defaultValue={user.firstName}
                    onChangeText={(text) => setFirstName(text)}></TextInput>
                </View>
                <View style={Styles.celdas}>
                  <Text style={Styles.label}>Apellido</Text>
                  <TextInput
                    style={Styles.input}
                    placeholderTextColor="#fff"
                    defaultValue={user.lastName}
                    onChangeText={(text) => setLastName(text)}></TextInput>
                </View>
                <View style={Styles.celdas}>
                  <Text style={Styles.label}>E-Mail</Text>
                  <TextInput
                    style={Styles.input}
                    placeholderTextColor="#fff"
                    defaultValue={user.email}
                    onChangeText={(text) => setEmail(text)}></TextInput>
                </View>
                <View style={Styles.celdas}>
                  <Text style={Styles.label}>Contraseña</Text>
                  <TouchableOpacity
                    style={Styles.botonModificar}
                    onPress={() => setShowChangePwd(!showChangePwd)}>
                    <Text style={Styles.textoBoton}>MODIFICAR</Text>
                  </TouchableOpacity>
                </View>
                {showChangePwd && (
                  <View style={Styles.celdas}>
                    <TextInput
                      style={Styles.inputPwd}
                      placeholderTextColor="#fff"
                      placeholder="Escribe tu nueva contraseña"
                      onChangeText={(text) => setPassword(text)}></TextInput>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={Styles.botonModificar}
                onPress={handleUpdateUser}
                disabled={loading}>
                <Text style={Styles.textoBoton}>
                  {loading ? <ActivityIndicator /> : "CONFIRMAR"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={Styles.estadisticas}>
              <View style={Styles.perfilHeader}>
                <Image style={Styles.imgEstadisticas} source={estadisticasImg} />
                <View style={Styles.linea}></View>
                <Text style={Styles.texto}>MIS ESTADISTICAS</Text>
              </View>
              <TouchableOpacity
                style={Styles.container}
                onPress={() =>
                  navigation.navigate("Estadisticas", {
                    img: Ejercicios,
                    title: "Interpretacion de electrocardiograma",
                    ejercicios: ejerciciosConcideraciones,
                  })
                }>
                <View style={Styles.buttonContainer}>
                  <Image style={Styles.image} source={Ejercicios} />
                  <Text style={Styles.texto}>Interpretacion de electrocardiograma</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Estadisticas", {
                    img: Completar,
                    title: "Complete los Casilleros",
                    ejercicios: ejerciciosConcideraciones,
                  })
                }
                style={Styles.container}>
                <View style={Styles.buttonContainer}>
                  <Image style={Styles.image} source={Completar} />
                  <Text style={Styles.texto}>Complete los Casilleros</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Estadisticas", {
                    img: MultipleChoice,
                    title: "Multiple choice",
                    ejercicios: ejerciciosConcideraciones,
                  })
                }
                style={Styles.container}>
                <View style={Styles.buttonContainer}>
                  <Image style={Styles.image} source={MultipleChoice} />
                  <Text style={Styles.texto}>Multiple choice</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Estadisticas", {
                    img: concideracionesClinicas,
                    title: "Consideraciones Clinicas",
                    ejercicios: ejerciciosConcideraciones,
                  })
                }
                style={Styles.container}>
                <View style={Styles.buttonContainer}>
                  <Image style={Styles.image} source={concideracionesClinicas} />
                  <Text style={Styles.texto}>Consideraciones Clinicas</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={Styles.notLoggedView}>
          <TouchableOpacity style={Styles.buttons} onPress={() => navigation.navigate("Registrar")}>
            <Text style={Styles.textoBoton}>REGISTRARME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.buttons} onPress={() => navigation.navigate("Login")}>
            <Text style={Styles.textoBoton}>INICIAR SESIÓN</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  principalContainer: {
    flex: 1,
    backgroundColor: "#3b3a3a",
  },
  perfil: {
    backgroundColor: "#3b3a3a",
    height: 500,
    alignItems: "center",
    paddingBottom: 10,
  },
  perfilHeader: {
    justifyContent: "center",
    alignItems: "center",
  },
  imagePerfil: {
    width: 70,
    height: 70,
  },
  linea: {
    height: 2,
    width: 30,
    backgroundColor: "#fff",
    margin: 4,
  },
  texto: {
    color: "#fff",
    fontFamily: "MontserratRegular",
    fontSize: 12,
  },
  datos: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  celdas: {
    flexDirection: "row",
    margin: 20,
  },
  label: {
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    color: "#fff",
    fontFamily: "MontserratRegular",
    backgroundColor: "#b3b5b3",
    padding: 5,
    width: 100,
    height: 30,
  },
  input: {
    backgroundColor: "#6e6e6e",
    width: 200,
    height: 30,
    color: "#fff",
    fontFamily: "MontserratRegular",
  },
  inputPwd: {
    width: 300,
    backgroundColor: "#6e6e6e",
    height: 30,
    color: "#fff",
    fontFamily: "MontserratRegular",
  },
  botonModificar: {
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#77bf02",
    width: 150,
    padding: 5,
    alignItems: "center",
  },
  textoBoton: {
    fontFamily: "MontserratRegular",
    color: "#fff",
  },
  estadisticas: {
    backgroundColor: "#5c5a5a",
    height: 500,
    marginTop: 80,
  },
  imgEstadisticas: {
    width: 70,
    height: 70,
  },
  image: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
  },
  container: {
    justifyContent: "center",
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notLoggedView: {
    flexGrow: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#77bf02",
    width: 150,
    padding: 5,
    alignItems: "center",
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconClose: {
    position: "absolute",
    right: 20,
    top: 10,
  },
});

export default Perfil;
